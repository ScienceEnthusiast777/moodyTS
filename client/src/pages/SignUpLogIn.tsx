import React, { FC } from "react";
import { Route, RouteComponentProps } from "react-router";
import SignUp from "../components/SignUp";
import LogIn from "../components/LogIn";

export type User = {
  username : string, 
  password ? : string
}

interface ISignUpLogInProps extends RouteComponentProps<any> {
  user: User;
  setUser : (user: User | null) => void;
}

const SignUpLogIn: FC<ISignUpLogInProps> = (props) => {
  return (
    <div className="flex flex-col place-items-center font-bold">
      <div>
        <SignUp {...props} />
        <LogIn {...props} />
      </div>
    </div>
  );
};

export default SignUpLogIn;
