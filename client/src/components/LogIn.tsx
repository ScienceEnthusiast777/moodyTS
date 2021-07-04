import React, { useState, FC } from "react";
import { login } from "../services/auth";
import { RouteComponentProps } from "react-router-dom";

type User = {
  username: string;
  password?: string;
};

interface ILogInProps extends RouteComponentProps<any> {
  user: User;
  setUser: (user: User | null) => void;
}

const LogIn: FC<ILogInProps> = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    login(username, password).then((response) => {
      if (response.message) {
        setMessage(response.message);
      } else {
        props.setUser(response);
        props.history.push("/");
      }
    });
  };
  return (
    <div className="m-5">
      <h1 className="font-bold">Login to your Account</h1>
      <form className="flex flex-col w-52" onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          className="border border-black mr-5"
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Password: </label>
        <input
          className="border border-black mr-5"
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="cursor-pointer border hover:border-black mt-2 mb-2 p-2 w-44"
          type="submit"
        >
          Login
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default LogIn;
