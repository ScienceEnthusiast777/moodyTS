import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

export default function NavBar(props) {
  const logoutHandler = () => {
    logout().then(() => {
      props.setUser(null);
    });
  };

  return (
    <div>
      <div>
        <h1>MOOD</h1>
      </div>
      <div>
        <ul>
          {props.user ? (
            <li>
              <Link to="/" onClick={() => logoutHandler()}>
                Log Out
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link to="/login">Log In</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}
