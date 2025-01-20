import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginScreen from "./pages/Auth/LoginScreen";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { getuserbytoken } from "./features/authDetailsSlice";

// hr imports
import { routesArray } from "./utils/RoutesArray";
import { getTokenFromLocalStorage } from "./utils/common";
import ProtectedRoute from "./PrivateRoute";
import FullLayout from "./layout/FullLayout";
import AadharScreen from "./pages/Auth/AadharScreen";

function App() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state.authData); // Ensure you have loading in your Redux slice

  useEffect(() => {
    const storedToken = getTokenFromLocalStorage();
    if (storedToken) {
      dispatch(getuserbytoken(storedToken));
    }
  }, [dispatch]);

  let filteredRoutesArray = routesArray.filter((item) =>
    item.role.includes(auth?.userType || "")
  );

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/aadharVerify/:rStamp/:cId/:tId/:aId/:ocId"
          element={<AadharScreen />}
        />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {filteredRoutesArray.map((item) => (
            <Route
              key={item.id}
              path={item.link}
              element={<FullLayout Component={<item.component />} />}
            />
          ))}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;