import React from 'react';
import SignUp from '../components/SignUp';
import LogIn from '../components/LogIn';

export default function SignUpLogIn(props) {
  return (
    <div>
      <SignUp {...props}/>
      <LogIn {...props}/>
    </div>
  )
}
