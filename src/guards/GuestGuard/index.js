/* eslint-disable radix */
import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import useAuth from '../../hooks/useAuth';

const GuestGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  // if (!isAuthenticated && user === null) {
  //   return <Redirect to="/login" />;
  // }
  // if (isAuthenticated && user !== null && user.user_step === 2) {
  //   if(user.invite_user_type && user.invite_user_type === 1){
  //     return <Redirect to="/verify-pass" />;
  //   }else if(user.invite_user_type && user.invite_user_type === 2){
  //     return <Redirect to="/user/about" />;
  //   }
    
  // }
  if (isAuthenticated && user !== null) {
    return <Redirect to="/user/dashboard" />;
  }
  
  return (
    <>
      {children}
    </>
  );
};

GuestGuard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GuestGuard;
