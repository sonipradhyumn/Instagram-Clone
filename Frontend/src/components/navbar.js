import React, {useContext} from 'react';
import {Link, useHistory} from 'react-router-dom';
//accessing the context
import {UserContext} from '../App';
const NavBar = () => {
  const {state, dispatch} = useContext (UserContext);
  const history = useHistory ();
  const renderList = () => {
    //2.18-7/2/21
    //here state contain id_name and email
    if (state) {
      return [
        <li><Link to="Profile">Profile</Link></li>,
        <li><Link to="CreatePost">Create Post</Link></li>,
        <li>
          <button
            className="btn waves-effect waves.light #64b5f6 blue darken-2"
            onClick={() => {
              localStorage.clear ();
              dispatch ({type: 'CLEAR'});
              history.push ('/Signin');
            }}
          >
            Log out
          </button>
        </li>,
      ];
    } else {
      return [
        <li><Link to="Signin">SignIn</Link></li>,
        <li><Link to="Signup">SignUp</Link></li>,
      ];
    }
  };
  return (
    <nav>
      <div className="nav-wrapper white ">
        <Link to={state ? '/' : '/Signin'} className="brand-logo">
          Instagram
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList ()}

        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
