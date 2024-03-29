import React from 'react';
import { Helmet } from 'react-helmet';

const initState = {
  resend: false,
  box1: '',
  box2: '',
  box3: '',
  box4: '',
  box5: '',
  id: '',
  userInfo: '',
  pass: '',
  loading: false,
  validate: false
};


export default function VerifyAccountPassword() {
  
  return (
    <>
      <Helmet>
        <title>Verify OTP</title>
      </Helmet>
      <>

        <section className="beforeLoginSection">
          <div className="beforeLoginRow">
            Verify
          </div>
        </section>
      </>
    </>
  );
}
