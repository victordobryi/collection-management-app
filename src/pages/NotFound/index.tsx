import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

const NotFound = () => (
  <section className="page_404">
    <div className="four_zero_four_bg">
      <h1>404</h1>
    </div>
    <div className="contant_box_404">
      <h3>Look like you&apos;re lost</h3>
      <p>the page you are looking for not avaible!</p>
      <Link to="/home" className="link_404">
        Go to Home
      </Link>
    </div>
  </section>
);
export default NotFound;
