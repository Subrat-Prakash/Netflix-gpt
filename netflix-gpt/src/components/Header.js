import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate();
  const user= useSelector((store) => store.user);
  
  const handleSignout = ()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
    
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44" src ="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
            alt= "logo"
        />
        {user && (
        <div className="flex p-3">
           <img className="w-12 h-12 " alt="userIcon" src="https://media.licdn.com/dms/image/D4D35AQGOpMDRyqRW7w/profile-framedphoto-shrink_400_400/0/1696530557738?e=1699300800&v=beta&t=VWTiWfvuWHInPp_I5GvENU4EjE6N-2S-A8OPFcNNDQ8"/>
          <button onClick={handleSignout} className=" text-white font-bold">(Sign Out)</button>
        </div>
        )}
    </div>
    
  )
}

export default Header