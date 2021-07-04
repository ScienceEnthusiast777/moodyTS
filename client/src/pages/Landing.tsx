import React, {FC} from "react";
import MoodSubmit from "../components/MoodSubmit";
import Stats from "../components/Stats";

type User  = {
  username : string, 
  password ? : string
}

interface ILandingProps{
  user : User,
  setUser : (user: User | null) => void;
}

const Landing : FC<ILandingProps> = (props) =>{
  return (
    <div className="flex flex-col place-items-center font-bold">
      {!props.user ? (
        <>
          <div>
            <p>
              welcome to MOODY, where you can keep track of your mood throughout
              the day
            </p>
          </div>
        </>
      ) : (
        <>
          <MoodSubmit />
          <Stats />
        </>
      )}
    </div>
  );
}

export default Landing; 