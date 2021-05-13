import React from 'react';
import {Link} from 'react-router-dom';

const FirstPage = () => {
  return (
    <div id="packages">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="section-title" />
            <span class="sub-title">
              Out top Packages
              <h3 class="title">
                Explore
                {' '}
                <span>unique place</span>
                {' '}
                & get
                <span>amazing</span>
                experiences
                {' '}
              </h3>
            </span>
          </div>
        </div>
        <br /><br /><br />
        <div className="row">
          <div className="col-log-3">
            <div
              className="item water-effect bg-image"
              style={{
                backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7kXbDAxF5qMFXK2R5q-t8R8OkgPH451m9Fg&usqp=CAU")`,
              }}
            >
              <div className="content">
                <div className="btn-wrapper" />
                <Link to="">Web Designer</Link>
              </div>
              <h4 className="title"> <Link to="">Amanda Nuke </Link> </h4>

            </div>

          </div>
        </div>
        {/* 
           another image      
         */}
        <div className="row">
          <div className="col-log-3">
            <div
              className="item water-effect bg-image"
              style={{
                backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGmU0KbekFZFJ3SHPL7Pi4djuVBKK_cR2NmA&usqp=CAU")`,
              }}
            >
              <div className="content">
                <div className="btn-wrapper" />
                <Link to="">Developer</Link>
              </div>
              <h4 className="title"> <Link to="">Milky Blue</Link> </h4>

            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
export default FirstPage;
