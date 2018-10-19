import React from 'react';
import Emoji from 'react-emoji-render';
import img from '../../../../public/resources/images/404-Logo.png';


const ErrorPage = () => (
  <div className="container">
    <div className="row">
      <div className="col s12 center-align m-15-auto" >
        <img src={img} alt="404 error" className="responsive-img animate" width="400" height="150" />
        <p className="flow-text center-align" style={{ fontSize: "2.2rem" }}>
          {"Oops!! you are lost and that\'s not "}<strong>TIA</strong>
          <Emoji text=":/" />
        </p>
        <p className="flow-text center-align" >
          <small style={{ fontSize: "1.1rem" }}>
            Just kidding, seems like something broke,
            or we could not find what you were looking for.
          </small>
        </p>
        <a href="/teams" className="top-margin bottom-margin waves-effect waves-light btn blue-btn">Lets take you back</a>
      </div>
    </div>
  </div>
);

export default ErrorPage;
