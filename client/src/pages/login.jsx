/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { LoginInput ,Loader } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import {getAuth , signInWithPopup , GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { app } from "../config/firebase";
import { validateJWTToken } from "../api";
import {useNavigate} from "react-router-dom"
import { useDispatch, useSelector} from "react-redux";
import { setUserDetails } from "../redux/userSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.user.user)

  useEffect(()=>{

    if(user){
      return navigate('/',{replace : true});
    }
  },[user])
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassord] = useState("");
  const loginWithGoogle = async()=>{
    await signInWithPopup(auth,googleProvider).then(user=>{
      auth.onAuthStateChanged((cred) => {
        if(cred){
          cred.getIdToken().then(token =>{
            validateJWTToken(token).then((data) => dispatch(setUserDetails(data)))
          })
          navigate("/",{replace : true})
        }
      })
    })
  }
  const signUpWithEmailPass = async()=>{
    if((!email|| !password || !confirmPassword) ){
    }else{
      if(password === confirmPassword){
        setEmail("")
        setPassword("")
        setConfirmPassord("")
        await createUserWithEmailAndPassword(auth,email,password).then(user =>{
          auth.onAuthStateChanged((cred) => {
            if(cred){
              cred.getIdToken().then(token =>{
                validateJWTToken(token).then((data) => dispatch(setUserDetails(data)))
              })
              navigate("/",{replace : true})
            }
          })
        })
      }else{
        alert("password not matched");
      }
    }
  }

  const signInWithEmailPass = async()=>{
    if((!email|| !password ) ){
      alert("please enter credentials")
    }else{
      await signInWithEmailAndPassword(auth,email,password).then(user =>{
        auth.onAuthStateChanged((cred) => {
          if(cred){
            cred.getIdToken().then(token =>{
              validateJWTToken(token).then((data) => dispatch(setUserDetails(data)))
            })
            navigate("/",{replace : true})
          }
        })
      })
    }
  }
  return (
    <div className="min-h-screen min-w-full relative overflow-hidden flex">
      {/* background image  */}
      <img
        src="/food.jpg "
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      {/* content  */}
      <div className="flex flex-col items-center bg-lightOverlay w-[70%] md:w-[508px] z-10 backdrop-blur-md p-4 px-4 py-12">
        {/* logo */}
        <div className="flex gap-4 w-full items-center justify-center">
          <img src="/logo.png " className="w-8" />
          <p className="text-headingColor font-semibold text-2xl">
            FlavorFleet
          </p>
        </div>

        <p className="text-xl font-semibold mt-4">Welcome Back</p>
        <p className="text-sm text-gray-800/[0.8]">
          Elevate your eats: flavors fly, satisfaction arrives.
        </p>

        {/* inputs */}

        <div className="mt-4 w-full flex flex-col items-center justify-center gap-4 px-4 md:px-12 py-4">
          <LoginInput
            placeHolder={"Email Here"}
            icon={<FaEnvelope />}
            inputState={email}
            inputStateFunc={setEmail}
            type="email"
            isSignUp={isSignUp}
            className="text-xl text-textColor"
          />
          <LoginInput
            placeHolder={"Password Here"}
            icon={<FaLock />}
            inputState={password}
            inputStateFunc={setPassword}
            type="password"
            isSignUp={isSignUp}
            className="text-xl text-textColor"
          />
          {isSignUp && (
            <LoginInput
              placeHolder={"Confirm Password Here"}
              icon={<FaLock />}
              inputState={confirmPassword}
              inputStateFunc={setConfirmPassord}
              type="password"
              isSignUp={isSignUp}
              className="text-xl text-textColor"
            />
          )}

          {!isSignUp ? (
            <p>
              Doesn&apos;t have an account:{" "}
              <motion.button
                {...buttonClick}
                onClick={() => setIsSignUp(true)}
                className="text-red-700 underline cursor-pointer bg-transparent"
              >
                Create one
              </motion.button>
            </p>
          ) : (
            <p>
              Already have an account:{" "}
              <motion.button
                {...buttonClick}
                onClick={() => setIsSignUp(false)}
                className="text-red-700 underline cursor-pointer bg-transparent"
              >
                Sign-in here
              </motion.button>
            </p>
          )}

          {/* button  */}
          {isSignUp ? (
            <motion.button
              {...buttonClick}
              onClick={signUpWithEmailPass}
              className="w-full h-full px-4 py-2 bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-100 rounded-lg"
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={signInWithEmailPass}
              className="w-full h-full px-4 py-2 bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-100 rounded-lg"
            >
              Sign In
            </motion.button>
          )}

          <div className="flex items-center justify-between gap-16">
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
            <p className="text-white">OR</p>
            <div className="w-24 h-[1px] rounded-md bg-white"></div>
          </div>

          <motion.div {...buttonClick} className="flex items-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4" onClick={()=>loginWithGoogle()}>
            <FcGoogle className="text-3xl"/>
            <p className="capitalize text-base text-headingColor" >Sign with Google</p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
