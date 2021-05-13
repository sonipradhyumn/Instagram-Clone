import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import M from 'materialize-css';
const Signup = () => {
  //hook
  //**********              integration of api                                  *********** */
  const history = useHistory ();
  const [name, setName] = useState ('');
  const [phoneNo, setphoneNo] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [cpassword, setCpassword] = useState ('');

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test (
        email
      )
    ) {
      return M.toast ({html: 'invalid email', classes: '#c62828 red darken-3'});
    }
    if (cpassword !== password) {
      return M.toast ({
        html: 'invalid confirm password',
        classes: '#c62828 red darken-3',
      });
    }
    fetch ('/signup', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify ({
        name,
        phoneNo,
        password,
        email,
      }),
    })
      .then (res => res.json ())
      .then (data => {
        if (data.error) {
          M.toast ({html: data.error, classes: '#c62828 red darken-3'});
        } else {
          M.toast ({html: data.message, classes: '#43a047 green darken-1'});
          history.push ('/signin');
        }
      });
  };
  /******************************************************/
  return (
    <div className="mycard">
      <div className="card auth-card input-field">
        <h2>Instagram</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={e => setName (e.target.value)}
        />
        <input
          type="text"
          placeholder="Phone No"
          value={phoneNo}
          onChange={e => setphoneNo (e.target.value)}
        />
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={e => setEmail (e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword (e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={cpassword}
          onChange={e => setCpassword (e.target.value)}
        />
        <button
          className="btn waves-effect waves.light #64b5f6 blue darken-2"
          onClick={() => PostData ()}
        >
          SignUp
        </button>
        <h5><Link to="/Signin">Already have an Account? </Link></h5>
      </div>
    </div>
  );
};
export default Signup;
