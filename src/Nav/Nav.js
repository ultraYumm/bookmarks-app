import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(props) {
  return (
    <nav className='Nav'>
      <Link to={'/'}>
      Bookmark List<br></br>
      </Link>
      {' '}
      <Link to={'/add-bookmark'}>
      Add<br></br>
      </Link>
    </nav>
  );
}
