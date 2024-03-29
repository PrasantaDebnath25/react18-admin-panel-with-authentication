import React from 'react';
import { Link, useHistory } from 'react-router-dom'

function SiteHeader() {
  const history = useHistory()

  return (
    <header className="beforeLoginHead">
      <Link to ='/'><img src="../../../images/logo.png" /></Link>
    </header>
  );
}

SiteHeader.propTypes = {};

export default SiteHeader;
