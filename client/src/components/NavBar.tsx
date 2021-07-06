import React, { FC } from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/auth";

type User = {
  username: string;
  password?: string;
};

interface INavProps {
  user: User;
  setUser: (user: User | null) => void;
}

const NavBar: FC<INavProps> = (props) => {
  const logoutHandler = () => {
    logout().then(() => {
      props.setUser(null);
    });
  };

  return (
    <div className="flex flex-row justify-around pt-20">
      <div>{props.user && <p>hi {props.user.username}</p>}</div>
      <div>
        <img src="/moody-faces/moodylogo.jpg" alt="none" />
      </div>
      <div>
        <ul>
          {props.user ? (
            <li className="cursor-pointer border border-4 hover:border-black">
              <Link to="/" onClick={() => logoutHandler()}>
                Log Out
              </Link>
            </li>
          ) : (
            <>
              <li className="cursor-pointer border border-4 hover:border-black m-2">
                <Link to="/login">Log In</Link>
              </li>
              <li className="cursor-pointer border border-4 hover:border-black m-2">
                <Link to="/signup">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
