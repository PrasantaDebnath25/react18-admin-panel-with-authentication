import React, { useState, useReducer } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const initState = {
  email: '',
  loading: false,
  validate: false
};

const forgetState = {
  emailErrBlank: false,
  IsValidEmail: false,
  IsExistEmail: false,
  IsGoogleRegistered: false,
};



export default function ForgetPass() {
  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <>
        <section className="beforeLoginSection">
        Forget Password
        </section>
      </>
    </>
  );
}
