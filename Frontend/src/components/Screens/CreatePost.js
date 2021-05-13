import React, {useState, useEffect} from 'react';
import {useHistory,Link} from 'react-router-dom';
import M from 'materialize-css';
const CreatePost = () => {
  //hooks
  const history = useHistory ();
  const [title, setTitle] = useState ('');
  const [body, setBody] = useState ('');
  const [image, setImage] = useState ('');
  const [url, setUrl] = useState ('');
  //useeffect will let us  wait when url will change then we will able to post the photo into or mongodb
  useEffect (
    () => {
      if (url) {
        // second  post detail for storing pic on mongodb

        /*  issue  (to correct  this we use < useEfect > hook )
      if we write below after the cloudnary than 
       IF WE UPLOAD ANY PHOTO THEN IT FIRST SAVED IN CLOUDNARY AND THEN 
       WE GET KINK OF PHOTO AND IT GET  POSTED INTO MONGODB
*/

        fetch ('/createpost', {
          //WE ARE USING POST METHOD IN SIGNIN
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            //here tho get that token we use authorization and get item here
            Authorization: 'Bearer ' + localStorage.getItem ('jwt'),
          },
          body: JSON.stringify ({
            title,
            body,
            pic: url,
          }),
        })
          .then (res => res.json ())
          .then (data => {
            console.log (data);
            if (data.error) {
              M.toast ({html: data.error, classes: '#c62828 red darken-3'});
            } else {
              M.toast ({
                // IF THE DATA ENTER MATCHED TO THE SAVED DATA THEN WE WILL WELCOM THE USER
                html: 'Created post sucessfully',
                classes: '#43a047 green darken-1',
              });
              //DIRECTING THE USER TO HOME PAGE
              history.push ('/');
            }
          })
          .catch (err => {
            console.log (err);
          });
      }
    },
    [url]
  );

  const postDetails = () => {
    ///  posting photo on cloudnary platform
    const data = new FormData ();
    data.append ('file', image);
    data.append ('upload_preset', 'insta-clone');
    //data.append ('<type of preset>','<NAME OF THE UPLOAD PRESET>')
    data.append ('cloud_name', 'instagramimage');
    //data.append ('<CLOUD NAME>','<NAME OF THE could>')
    fetch ('https://api.cloudinary.com/v1_1/instagramimage/image/upload', {
      method: 'post',
      body: data,
    })
      .then (res => res.json ())
      .then (data => {
        setUrl (data.url);
        console.log (data);
      })
      .catch (err => console.log (err));
    //------------------------------------------------------
  };

  return (
    
    
    <div className="card input-field cp">
      <input
        type="text"
        placeholder="title"
        value={title}
        onChange={e => setTitle (e.target.value)}
      />
      <input
        type="text"
        placeholder="body"
        value={body}
        onChange={e => setBody (e.target.value)}
      />
      <div className="file-field input-field cp">
        <div className="btn waves-effect waves-light #64b5f6 blue darken-2">
          <span>Upload Image</span>
          <input type="file" onChange={e => setImage (e.target.files[0])} />
        </div>
        <div className="file-path-wrapper">
          <input className="file-path validate" type="text" />
        </div>

      </div>
      <button
        className="btn waves-effect waves-light #64b5f6 blue darken-2"
        onClick={() => {
          postDetails ();
        }}
      >
        Post
      </button>
    </div>

  );
};

export default CreatePost;
