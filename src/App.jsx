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
import { useDispatch } from "react-redux";
import { getuserbytoken } from "./features/authDetailsSlice";

// hr imports
import { routesArray } from "./utils/RoutesArray";
import { getTokenFromLocalStorage } from "./utils/common";
import ProtectedRoute from "./PrivateRoute";
import FullLayout from "./layout/FullLayout";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = getTokenFromLocalStorage();
    if (storedToken) {
      dispatch(getuserbytoken(storedToken));
    }
  }, [dispatch]);

  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          {routesArray.map((item) => (
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