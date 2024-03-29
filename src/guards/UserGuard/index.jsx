/* eslint-disable radix */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';

const UserGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  console.log(user)
  if (!isAuthenticated && user === null) {
    return <Redirect to="/login" />;
  }
  // if (user != null && localStorage.getItem('accessRole') && parseInt(localStorage.getItem('accessRole')) !== 4) {
  //   return <Redirect to="/" />;
  // }
  return (
    <>
      {children}
    </>
  );
};

UserGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserGuard;
