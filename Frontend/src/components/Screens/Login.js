import React, {useState, useContext} from 'react';
import {UserContext} from '../../App';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';
const Login = () => {
  //hooks
  const {state, dispatch} = useContext (UserContext);
  const history = useHistory ();
  const [password, setPassword] = useState ('');
  const [email, setEmail] = useState ('');

  const PostData = () => {
    // THIS POSTDATA FUNCTION WILL RUN WHEN USER WILL CLICK ON  BUTTON
    // APPLYING VALIDATION TO EMAIL
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test (
        email
      )
    ) {
      return M.toast ({html: 'invalid email', classes: '#c62828 red darken-3'});
    }

    fetch ('/signin', {
      //WE ARE USING POST METHOD IN SIGNIN
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        password,
        email,
      }),
    })
      .then (res => res.json ())
      .then (data => {
        console.log (data);
        if (data.error) {
          M.toast ({html: data.error, classes: '#c62828 red darken-3'});
        } else {
          //storing user detail  and token in local storage
          localStorage.setItem ('jwt', data.token);
          localStorage.setItem ('user', JSON.stringify (data.user));
          // here dispatch ther user and data to user Reducer.js
          dispatch ({type: 'USER', payload: data.user});
          M.toast ({
            // IF THE DATA ENTER MATCHED TO THE SAVED DATA THEN WE WILL WELCOM THE USER
            html: 'welcome to instagram ',
            classes: '#43a047 green darken-1',
          });
          //DIRECTING THE USER TO HOME PAGE
          history.push ('/');
        }
      })
      .catch (err => {
        console.log (err);
      });
  };
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Email"
          value={email}
          //ON CHANGE EVENT WIL UPDATE THE VALUE WE ARE TYPING TO VALUE
          onChange={e => setEmail (e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword (e.target.value)}
        />
        <h6 className="fp"> forget password? </h6>

        <button
          className="btn waves-effect waves.light #64b5f6 blue darken-2"
          onClick={() => PostData ()}
        >
          Login
        </button>
        <h5>
          <Link to="/Signup">Create an Account? </Link>
        </h5>
      </div>
    </div>
  );
};
export default Login;
