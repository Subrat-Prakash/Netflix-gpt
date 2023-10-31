import { useRef, useState } from "react";
import {useNavigate } from "react-router-dom";
import {checkValidData} from "../utils/validate";
import {createUserWithEmailAndPassword,  signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/Firebase";
import Header from "./Header";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";


 
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage]= useState(null);
  const navigate = useNavigate();
  
   const name = useRef(null);
  const email = useRef(null);
  const password= useRef(null);
  const dispatch= useDispatch();

  const handleButtonClick= ()=>{
    //Validate the form data
    const message= checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    
    if(message) return;
    //Sign in Sign Up

    if(!isSignInForm){
        createUserWithEmailAndPassword(auth, email.current.value, password.current.value )
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: "https://media.licdn.com/media/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
          }).then(() => {
            // Profile updated!
            const {uid,email,displayName,photoURL} = auth.currentUser;
        // ...
        dispatch(addUser({uid: uid,email: email, displayName: displayName , photoURL: photoURL}));
            navigate("/browse");
            // ...
          }).catch((error) => {
            // An error occurred
            // ...
            setErrorMessage(error.message);
          });
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode +"-" +errorMessage);
          // ..
        });
    }else{
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        navigate("/browse");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMessage(errorCode +"-" +errorMessage);
      });
    }
  }; 

  const toggleSignInForm = () =>{
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
        <Header/>
        <div className="relative">
        <img  src ="https://assets.nflxext.com/ffe/siteui/vlv3/dace47b4-a5cb-4368-80fe-c26f3e77d540/f5b52435-458f-498f-9d1d-ccd4f1af9913/IN-en-20231023-popsignuptwoweeks-perspective_alpha_website_large.jpg"
            alt= "logo"
        />
        </div>
        <div className="flex justify-center items-center">

          <form  onSubmit={(e) => e.preventDefault()} className=" w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
          <h1 className ="font-bold text-3xl py-4 ">{isSignInForm? "Sign In": "Sign Up"}</h1>
          {!isSignInForm && (
          <input  type ="text" placeholder="Full Name" className= "p-4 my-4 w-full bg-gray-700"/>
          )}
          <input ref={email} type ="text" placeholder="Email Address" className= "p-4 my-4 w-full bg-gray-700"/>
          <input ref={password} type ="password" placeholder="Password" className= "p-4 my-4 w-full  bg-gray-700"/>
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>Sign In</button>
          <p className="py-4 cursor-pointer"  onClick = {toggleSignInForm}>{isSignInForm? "New to Netflix? Sign Up Now": "Already registered Sign In Now..."}</p>
         </form>
        </div>
    </div>
  );
};

export default Login