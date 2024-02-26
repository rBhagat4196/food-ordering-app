import { Routes, Route, useNavigate } from "react-router-dom";
import LoginPage from "./pages/login";
import Home from "./pages/home";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { app } from "./config/firebase";
import { getAllCartItems, validateJWTToken } from "./api";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./redux/userSlice";
import { fadeOut } from "./animations";
import { motion } from "framer-motion";
import { Alert, Loader } from "./components";
import DashBoard from "./pages/DashBoard";
import { getItems, setItems } from "./redux/cartSlice";

function App() {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  useEffect(() => {
    setIsLoading(true);
    auth.onAuthStateChanged((cred) => {
      if (cred) {
        cred.getIdToken().then((token) => {
          validateJWTToken(token).then((data) => {
            if(data){
              getAllCartItems(data?.user_id).then(items => {
                // console.log(items);
                dispatch(setItems(items))
              })
            }
            dispatch(setUserDetails(data));

          });
        });
      }
    });
    setInterval(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  
  return (
    <div className="min-h-screen min-w-screen h-auto flex flex-col items-center justify-center">
      {isLoading && (
        <motion.div
          {...fadeOut}
          className="fixed z-50 inset-0 bg-lightOverlay backdrop-blur-md flex items-center justify-center w-full "
        >
          <Loader />
        </motion.div>
      )}
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard/*" element={<DashBoard />} />
      </Routes>

      {alert && <Alert type={alert?.type} message={alert?.msg} />}
    </div>
  );
}

export default App;
