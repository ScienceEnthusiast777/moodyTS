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
      <div>{props.user && <p>hi {props.user.username}</p>}</div>
      <div>
      <img src="/moody-faces/moodylogo.jpg" alt="none" />
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
