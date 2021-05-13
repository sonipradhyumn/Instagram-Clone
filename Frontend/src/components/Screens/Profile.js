import React, {useState, useEffect, useContext} from 'react';
import {UserContext} from '../../App';
const Profile = () => {
  // her use state will fetch the pic from the data 
  const [mypics, setPics] = useState ([]);
  const {state, dispatch} = useContext (UserContext);
  useEffect (() => {
    //3:14-7/2/21
    //
    fetch ('/mypost', {
      headers: {
        //here when we have used requirelogin
        //so the  token should match exact as we hve initilized
        // here in 'Bearer ' there is 1 space which is also important
        Authorization: 'Bearer ' + localStorage.getItem ('jwt'),
      },
    })
      .then (res => res.json ())
      .then (result => {
        setPics (result.mypost);
      });
  }, []);

  return (
    <div style={{maxWidth: '650px', margin: '0px auto'}}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          margin: '18px 0px',
          borderBottom: '1px solid grey',
        }}
      >
        <div>
          <img
            style={{width: '160px', height: '160px', borderRadius: '80px'}}
            src="https://pbs.twimg.com/profile_images/1283826823982247937/WS26GTQ5.jpg"
          />
        </div>
        <div>
          <h4>{state?state.name:"loading"}</h4>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '108%',
            }}
          >
            <h6>40 post</h6>
            <h6>40 followers</h6>
            <h6>40 following</h6>
          </div>
        </div>
      </div>

      <div className="gallery">
        {mypics.map (item => {
          return (
            <img
              key={item._id}
              className="item"
              src={item.photo}
              alt={item.title}
            />
          );
        })}

      </div>
    </div>
  );
};
export default Profile;
