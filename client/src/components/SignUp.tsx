import React, { useState } from "react";
import { signup } from "../services/auth";

export default function SignUp(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(username, password).then((response) => {
      if (response.message) {
        setMessage(response.message);
      } else {
        props.setUser(response);
        props.history.push("/");
      }
    });
  };
  return (
    <div className="m-5 mt-20 mb-20">
      <h1 className="font-bold">Create a new Account</h1>
      <form className="flex flex-col w-52" onSubmit={handleSubmit}>
        <label htmlFor="username">Enter a Username: </label>
        <input
          className="border border-black mr-2"
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Enter a password: </label>
        <input
          className="border border-black mr-2"
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
          Sign up
        </button>
      </form>
      <p>{message}</p>
    </div>
  );
}