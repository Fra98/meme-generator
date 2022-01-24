/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

/* React libraries */
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";

/* Custom components */
import { XModalWelcome, XModalView, XModalCreate, XModalCopy, XModalDelete } from './XModals/XModals'
import XNavbar from './XNavbar/XNavbar';
import XPageNotFound from './XPageNotFound/XPageNotFound';
import XLogin from './XLogin/XLogin';
import XCardGrid from './XCardGrid/XCardGrid';

/* Meme object */
import { Meme } from './Meme';

/* API */
import API from './API';


function App() {

  /* Authentication info */
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userLogged, setUserLogged] = useState(false);

  /* Modal to welcome user after login */
  const [modalWelcome, setModalWelcome] = useState(false);

  // Used to not show temporary login page when user reload the page
  const [checkingAuth, setCheckingAuth] = useState(false);

  /* Meme selected for view, copy or delete */
  const [selectedMeme, setSelectedMeme] = useState("");

  /* Modal visibility*/
  const [modalVisible, setModalVisible] = useState("");

  /* Calls to API and reload */
  const [reload, setReload] = useState(0);

  /* Memes array */
  const [memes, setMemes] = useState([]);

  const [filter, setFilter] = useState("");

  /* Checking authentication at mount or reload */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setCheckingAuth(true);

        // UN-COMMENT BELOW LINES TO TEST DATABASE WITH HIGHER LATENCY
        // const sleep = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));
        // await sleep(1000);

        const fetchedUser = await API.getUserInfo();  // here you have the user info, if already logged in
        setCheckingAuth(false);
        setUserName(fetchedUser.name)
        setUserId(fetchedUser.id)
        setUserLogged(true);
      } catch (err) {
        console.error(err.error);
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);


  /* Handle reload of memes list */
  useEffect(() => {
    API.getMemes(userLogged)
      .then(memes => {
        setMemes(memes.map(m => new Meme(m.id, m.templateId, m.userId, m.title, m.protected, m.name,
          m.font, m.color, [m.text1, m.text2, m.text3])));
      })
      .catch((err) => console.log(err.message));
  }, [reload, userLogged]);
  

  /* AUTHENTICATION management */
  async function doLogIn(credentials) {
    try {
      const user = await API.logIn(credentials);
      setUserName(user.name)
      setUserId(user.id)
      setModalWelcome(true);
      setUserLogged(true);
    } catch (err) {
      throw err;
    }
  }

  async function doLogOut() {
    await API.logOut();

    // Set state variables to default value
    setModalWelcome(false);
    setUserName("");
    setUserId("");
    setUserLogged(false);
  }

  /* MODALS management */
  const openModal = (modalName, meme = undefined) => {
    setModalVisible(modalName);
    setSelectedMeme(meme);
  }

  const closeModal = () => { 
    setModalVisible(""); 
    setSelectedMeme("") 
  };

  /* FILTER memes matching string from SEARCH BAR */ 
  function filterMemes(memes) {
    return memes.filter(m => m.title.toLowerCase().includes(filter.toLowerCase()));
  }

  /* CALLS TO API */
  async function createMeme(newMeme) {
    API.createMeme(newMeme)
      .then(setReload((r) => r + 1))
      .catch((err) => console.log(err.message));
  }

  async function copyMeme(copiedMeme) {
    API.copyMeme(copiedMeme)
      .then(setReload((r) => r + 1))
      .catch((err) => console.log(err.message));
  }

  async function deleteMeme(toBeDeleted) {
    API.deleteMeme(toBeDeleted)
      .then(setReload((r) => r + 1))
      .catch((err) => console.log(err.message))
  }
  
  /* MAIN */
  return (
    <Router>
      { checkingAuth ? 
        "" 
          :
        <Switch>
          <Route exact path="/login">
            {userLogged ? <Redirect to="/" /> : <XLogin doLogin={doLogIn} />}
          </Route>

          <Route exact path="/PageNotFound">
            <XPageNotFound />
          </Route>

          <Route exact path="/">
            <XNavbar user={userName} doLogOut={doLogOut} userLogged={userLogged} setFilter={setFilter} />          
            { userLogged ? <XModalWelcome user={userName} show={modalWelcome} closeModal={() => setModalWelcome(false)} /> : "" }
            
            <Container fluid className="below-nav vheight-100">     
              <XCardGrid memes={filterMemes(memes)} openModal={openModal} userId={userId} userLogged={userLogged}/>
              { modalVisible === 'open' && <XModalView meme={selectedMeme} closeModal={closeModal}/> }
              { userLogged && modalVisible === 'create' && <XModalCreate closeModal={closeModal} createMeme={createMeme} /> }  
              { userLogged && modalVisible === 'copy' && <XModalCopy meme={selectedMeme} closeModal={closeModal} copyMeme={copyMeme} userId={userId}/> }
              { userLogged && modalVisible === 'delete' && <XModalDelete meme={selectedMeme} closeModal={closeModal} deleteMeme={deleteMeme} /> }
            </Container>
          </Route>

          <Route path="/*">
            <Redirect to="/PageNotFound" />
          </Route>

        </Switch>
      }
    </Router>
  );
}

export default App;
