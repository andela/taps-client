import React from 'react';
import img from '../../../../public/resources/images/404-Logo.png';


const ErrorPage = () => (
  <div className="container">
    <div className="row">
      <div className="col s12 center-align m-15-auto" >
        <img src={img} alt="404 error" className="responsive-img animate" width="400" height="150" />
        <p className="flow-text valign-wrapper" >
        Unfortunately the page you are looking for could not be found. It may have been removed,
        had its name changed or is temporarily unavailable.
        </p>
        <p className="flow-text" >
        Check the URL you entered for mistakes and try again.
        </p>
        <a href="/teams" className="top-margin bottom-margin waves-effect waves-light btn blue-btn">Go back to Home page</a>
      </div>
    </div>
  </div>
);

export default ErrorPage;
