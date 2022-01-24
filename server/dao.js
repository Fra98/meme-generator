'use strict';

/* Data Access Object (DAO) module for accessing memes */

const sqlite = require('sqlite3');
const bcrypt = require('bcrypt');

// open the database
const db = new sqlite.Database('memes.db', (err) => { if (err) throw err; });


// User validation
exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE email = ?';

    db.get(sql, [email], (err, row) => {
      if (err)
        reject(err);                    // DB error
      else if (row === undefined)
        resolve(false);                 // user not found
      else {
        bcrypt.compare(password, row.hash).then(result => {
          if (result)                   // password matches
            resolve({ id: row.id, username: row.email, name: row.name });
          else
            resolve(false);             // password not matching
        }).catch(err => console.error(err));
      };
    });
  });
}


exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM users WHERE id = ?';

    db.get(sql, [id], (err, row) => {
      if (err)
        reject(err);                  // DB error
      else if (row === undefined)
        resolve(false);               // user not found
      else
        resolve({ id: row.id, email: row.email, name: row.name });
    });
  });
}


// GET ALL MEMES
exports.getAllMemes = () => {
  const SQL_GETALLMEMES = 
      ` SELECT memes.*, users.name 
        FROM memes 
        INNER JOIN users on (users.Id=memes.userId) `;

  return new Promise((resolve, reject) => {
    db.all(SQL_GETALLMEMES, (err, rows) => {
      if (err)
        reject(err);
      else if (rows === undefined)
        reject({ error: 'Empty DB!' });
      else
        resolve(rows);
    });
  });
}


// GET ALL PUBLIC MEMES
exports.getAllPublicMemes = () => {
  const SQL_GETALLPUBLICMEMES = 
    ` SELECT memes.*, users.name 
      FROM memes 
      INNER JOIN users on (users.Id=memes.userId) 
      WHERE memes.protected=0 `;

  return new Promise((resolve, reject) => {
    db.all(SQL_GETALLPUBLICMEMES, (err, rows) => {
      if (err)
        reject(err);
      else if (rows === undefined)
        reject({ error: 'Empty DB!' });
      else
        resolve(rows);
    });
  });
}


// GET MEME BY ID
exports.getMemeById = (id, userId) => {
  const SQL_GETBYID = 'SELECT * FROM memes WHERE id=? and userId=?';

  return new Promise((resolve, reject) => {
    db.get(SQL_GETBYID, [id, userId], (err, row) => {
      if (err)
        reject(err);
      else if (row === undefined)
        reject({ error: 'Invalid meme ID!' });
      else
        resolve(row);
    });
  });
}


// INSERT NEW MEME
exports.createMeme = (templateId, userId, title, prot, font, color, text1, text2, text3) => {
  const SQL_INSERT =
    ` INSERT INTO memes (id, templateId, userId, title, protected, font, color, text1, text2, text3)
      VALUES ((SELECT MAX(id)+1 FROM memes), ?, ?, ?, ?, ?, ?, ?, ?, ?) `;

  return new Promise((resolve, reject) => {
    db.run(SQL_INSERT, [templateId, userId, title, prot, font, color, text1, text2, text3], 
      (err) => err ? reject(err) : resolve(true));
  });
}


// DELETE MEME
exports.deleteMeme = (id, userId) => {
  const SQL_DELETE = 'DELETE FROM memes WHERE id=? AND userId=?';

  return new Promise((resolve, reject) => {
    db.run(SQL_DELETE, [id, userId], (err) => err ? reject(err) : resolve(true));
  });
}


