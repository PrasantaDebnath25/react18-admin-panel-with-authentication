import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Bootstrap, { Row, Col } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import SiteHeader from '../../components/SiteHeader'
import { homePageData } from '../../actions/commonAction';

export default function Home() {
  const history = useHistory();

  const [scrolling, setScrolling] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  useEffect(() => {
    window.scrollTo({
      top: 0,
      // behavior: "smooth"
    });
  }, []);
  useEffect(() => {
    function onScroll() {
      let currentPosition = window.pageYOffset; // or use document.documentElement.scrollTop;
      if (currentPosition > scrollTop) {
        // downscroll code
        setScrolling(false);
      } else {
        // upscroll code
        setScrolling(true);
      }
      setScrollTop(currentPosition <= 0 ? 0 : currentPosition);
    }

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  const goToLogin = () => {
    history.push('/login');
  };
  const goToRegister = () => {
    history.push('/register');
  };
  const goToHome = () => {
    history.push('/');
  };
  return (

    <div>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <SiteHeader />
      Home

      {/* <SiteFooter /> */}




    </div>


  );
}
