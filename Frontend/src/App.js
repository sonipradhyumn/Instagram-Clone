//import logo from './logo.svg';
import './App.css';
import React, {useEffect, createContext, useReducer, useContext} from 'react';
import NavBar from './components/navbar';
import {BrowserRouter, Route, Switch, useHistory} from 'react-router-dom';
import Home from './components/Screens/Home';
import CreatePost from './components/Screens/CreatePost';
import Signin from './components/Screens/Login';
//
import FirstPage from './components/Screens/FirstPage';
//
import Signup from './components/Screens/Signup';
import Profile from './components/Screens/Profile';
import {reducer, initialState} from './reducers/userReducer';
//import  from './components/Screens/'
export const UserContext = createContext ();

const Routing = () => {
  //2:17-6/2/21
  // we are making this for having history of user   which got token or not then we can redirect it to diffrent page
  // we can not do if the routes are inside thte browserRouter so we are making this
  //now we can access the history here
 const history = useHistory ();
  const {state, dispatch} = useContext (UserContext);
  useEffect (() => {
    const user = JSON.parse (localStorage.getItem ('user'));
    //console.log (typeof user, user);  for checking the type of user is it a string?
    if (user) {
      //this dispatch is because if the user close the browser but not logout
      // then this will not let the state get distroid and if he visit again then he should be able to view his protected resources
      dispatch ({type: 'USER', payload: user});
      
    } else {
      history.push ('/Signin');
    }
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/Signin">
        <Signin />
      </Route>
      <Route exact path="/Signup">
        <Signup />
      </Route>
      <Route exact path="/Profile">
        <Profile />
      </Route>
      <Route exact path="/createpost">
        <CreatePost />
      </Route>
    </Switch>
  );
};
function App () {
  const [state, dispatch] = useReducer (reducer, initialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
              
    </UserContext.Provider>
  );
}

export default App;
