import React, { useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';

export default function About() {
  const { Logout } = useAuth();
  useEffect(() => {
   
  }, []);


  return (
    <div className="auth-layout--content">
      User about page
    </div>
  );
}
