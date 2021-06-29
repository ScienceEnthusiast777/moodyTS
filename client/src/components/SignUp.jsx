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
    <div>
      <h1>Create a new Account</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Enter a Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">Enter a password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign me up!!!</button>
      </form>
      <p>{message}</p>
    </div>
  );
}
