'use strict';

const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const passportLocal = require('passport-local').Strategy;
const session = require('express-session');
const { body, param, validationResult } = require('express-validator');


const dao = require('./dao');
const checkUtility = require('./checkUtility');

const PORT = 3001;
let app = new express();

app.use(morgan('dev'));
app.use(express.json());


/* -------- */
/* PASSPORT */
/* -------- */

passport.use(new passportLocal.Strategy((username, password, done) => {
    // verification callback for authentication
    dao.getUser(username, password).then(user => {
        user ? done(null, user) : done(null, false, { message: 'Username or password wrong' });
    }).catch(err => done(err));
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    dao.getUserById(id)
        .then(user => done(null, user)) // this will be available in req.user
        .catch(err => done(err, null))
})

const isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated())
        return next();
    return res.status(401).json({ error: 'Unauthenticated user!' });
}

/* ------- */
/* SESSION */
/* ------- */

// initialize and configure HTTP sessions
app.use(session({
    secret: 'this and that and other',
    resave: false,
    saveUninitialized: false
}));

// tell passport to use session cookies
app.use(passport.initialize());
app.use(passport.session());

/* -------------- */
/* AUTHENTICATION */
/* -------------- */

// Login
app.post('/api/sessions', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user) 
            return res.status(401).json(info)
        
        // success, perform the login
        req.login(user, (err) => {
            if (err)
                return next(err);

            // req.user contains the authenticated user, we send all the user info back
            // this is coming from userDao.getUser()
            return res.json(req.user);
        })
    })(req, res, next)
})

// Logout
app.delete('/api/sessions/current', isLoggedIn, (req, res) => {
    req.logout();
    res.end();
});

// Current User
app.get('/api/sessions/current', isLoggedIn, (req, res) => res.status(200).json(req.user));



/* ------- */
/*  MEMES  */
/* ------- */

// GET ALL MEMES
app.get('/api/memes/all', isLoggedIn, async (req, res) => {
    dao.getAllMemes()
        .then((meme) => res.json(meme))
        .catch((error) => res.status(500).json(error));
});


// GET ALL PUBLIC MEMES
app.get('/api/memes/public', async (req, res) => {
    dao.getAllPublicMemes()
        .then((meme) => res.json(meme))
        .catch((error) => res.status(500).json(error));
});


// CREATE NEW MEME
app.post('/api/meme/create',
    isLoggedIn,
    body('templateId').notEmpty().isInt({ min: checkUtility.MIN_TEMPLATE_ID, max: checkUtility.MAX_TEMPLATE_ID }),
    body('title').notEmpty(),
    body('color').notEmpty().isIn(checkUtility.COLORS),
    body('font').notEmpty().isIn(checkUtility.FONTS),
    body('protected').isBoolean(),
    body('vetText').isArray({min:3, max:3}).custom(checkUtility.checkVetText),
    async (req, res) => {
        const errors = validationResult(req);      
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        };

        try {
            let m = req.body;
            await dao.createMeme(m.templateId, req.user.id, m.title, m.protected, m.font, m.color, 
                m.vetText[0], m.vetText[1], m.vetText[2]);
            res.end();
        } catch (error) {
            res.status(500).json(error);
        }
    });


// COPY MEME
app.post('/api/meme/copy/:id',
    isLoggedIn,
    body('templateId').notEmpty().isInt({ min: checkUtility.MIN_TEMPLATE_ID, max: checkUtility.MAX_TEMPLATE_ID }),
    body('title').notEmpty(),
    body('color').notEmpty().isIn(checkUtility.COLORS),
    body('font').notEmpty().isIn(checkUtility.FONTS),
    body('protected').isBoolean(),
    body('vetText').isArray({min:3, max:3}).custom(checkUtility.checkVetText),
    param('id').isInt(),
    async (req, res) => {
        const errors = validationResult(req);      
        if (!errors.isEmpty()) {
            console.log(errors.array());
            return res.status(400).json({ errors: errors.array() });
        };
        
        // Checking if users have copied a protected meme (FROM OTHER USERS) and changed visibility to public
        try {
            let originalMeme = await dao.getMemeById(req.params.id, req.body.userId);
            if (originalMeme.protected && !req.body.protected && req.body.userId !== req.user.id)
                return res.status(403).json({ error: 'Forbidden: copying protected meme to a public one!' });
        } catch (error) {
            res.status(500).json(error);
        }
        
        try {
            let m = req.body;
            await dao.createMeme(m.templateId, req.user.id, m.title, m.protected, m.font, m.color, 
                m.vetText[0], m.vetText[1], m.vetText[2]);
            res.end();
        } catch (error) {
            res.status(500).json(error);
        }
    });


// DELETE MEME BY ID
app.delete('/api/meme/:id',
    isLoggedIn,
    param('id').isNumeric(),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) 
            return res.status(400).json({ errors: errors.array() });
        
        const id = req.params.id;
        try {
            await dao.getMemeById(id, req.user.id);     // check if there is a meme with that id associated to user id
            await dao.deleteMeme(id, req.user.id);
            res.end();
        } catch (error) {
            res.status(500).json(error);
        }
    });

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}/`));


