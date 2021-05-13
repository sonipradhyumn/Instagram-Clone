import React, {useState, useEffect, useContext} from 'react';
// for knowing who is currently loged in we are using context 2.35 19/2/21
import {UserContext} from '../../App';
const Home = () => {
  const [data, setData] = useState ([]);
  // const [comment, setComment] = useState ('');
  // 18/2/21  here state will have the detail who are loged in
  const {state, dispatch} = useContext (UserContext);

  useEffect (() => {
    //3:14-7/2/21
    //
    fetch ('/allpost', {
      headers: {
        //here when we have used requirelogin
        //so the  token should match exact as we hve initilized
        // here in 'Bearer ' there is 1 space which is also important
        Authorization: 'Bearer ' + localStorage.getItem ('jwt'),
      },
    })
      .then (res => res.json ())
      .then (result => {
        setData (result.posts);
      });
  }, []);
  const likepost = id => {
    console.log ('you liked this post');
    fetch ('/like', {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem ('jwt'),
      },
      body: JSON.stringify ({
        postId: id,
      }),
    })
      .then (res => res.json ())
      .then (result => {
        const newData = data.map (item => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData (newData);
      })
      .catch (err => {
        console.log (err);
      });
  };

  const unlikepost = id => {
    console.log ('you unliked this post');
    fetch ('/unlike', {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem ('jwt'),
      },
      body: JSON.stringify ({
        postId: id,
      }),
    })
      .then (res => res.json ())
      .then (result => {
        const newData = data.map (item => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData (newData);
      })
      .catch (err => {
        console.log (err);
      });
  };
  // implement comment 26/2/2021
  //// we want to send  TEXT & POSTID TO BACKEND
  const makeComment = (text, postId) => {
    //makeing request
    fetch ('/comment', {
      method: 'put',
      headers: {
        'Content-type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem ('jwt'),
      },
      body: JSON.stringify ({
        postId,
        text,
      }),
    })
      .then (res => res.json ())
      .then (result => {
        console.log (result);
        const newData = data.map (item => {
          if (item._id === result._id) {
            return result;
          } else {
            return item;
          }
        });
        setData (newData);
      })
      .catch (err => {
        console.log (err);
      });
  };

  const deletePost = postid => {
    fetch (`/deletepost/${postid}`, {
      method: 'delete',
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem ('jwt'),
      },
    })
      .then (res => res.json ())
      .then (result => {
        console.log (result);
        const newData = data.filter (item => {
          return item._id !== result._id;
        });
        setData (newData);
      });
  };

  return (
    <div className="home">
      {data.map (item => {
        /*
          //                                    IT IS STATIC POST 
           return (
          <div className="card home-card">
            <h5>PRADHYUMN SONI</h5>
            <div className=" card-image">
              <img src="https://i.pinimg.com/280x280_RS/5e/e6/50/5ee65021ea0c893cdec6d8e5e5246524.jpg" />

            </div>
            <div className="card-content">
              <i className="material-icons" style={{color: 'red'}}>
                favorite_border
              </i>
              <h6>title</h6>
              <p>this is amazing post</p>
              <input type="text" placeholder="Add a comment" />
            </div>
          </div>
          */

        //                                  NOW ITS DYNAMIC POST

        return (
          <div className="card home-card" key={item._id}>
            <h5>
              {item.postedBy.name}
              {//checking if user post and loged in user are same then he can delete the post
              item.postedBy._id === state._id &&
                <i
                  class="material-icons"
                  style={{float: 'right'}}
                  onClick={() => deletePost (item._id)}
                >
                  delete{' '}
                </i>}
            </h5>
            <div className=" card-image">
              <img src={item.photo} />

            </div>
            <div className="card-content">

              {//here we are checking that if user have liked then we will hide the like button and vice varsa
              // using ternairy operator
              item.likes.includes (state._id)
                ? <i
                    className="material-icons"
                    style={{color: 'red'}}
                    onClick={() => {
                      unlikepost (item._id);
                    }}
                  >
                    favorite
                  </i>
                : <i
                    className="material-icons"
                    style={{color: 'red'}}
                    onClick={() => {
                      likepost (item._id);
                    }}
                  >
                    favorite_border
                  </i>}

              <h6>{item.likes.length} likes</h6>
              <h6>{item.title}</h6>
              <p>{item.body}</p>
              {item.comments.map (record => {
                return (
                  <h6 key={record._id}>
                    <span style={{fontWeight: '500'}}>
                      {record.postedBy.name}
                    </span>
                    {record.text}
                  </h6>
                );
              })}
              <form
                onSubmit={e => {
                  e.preventDefault ();
                  makeComment (e.target[0].value, item._id);
                }}
              >
                <input
                  type="text"
                  placeholder="Add a comment"
                  /* here hook was not used in video  */
                />
              </form>

            </div>
          </div>
        );
        //
      })}
    </div>
  );
};
export default Home;
