import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/authDetailsSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import { LoadingButton } from "@mui/lab";
import "../../css/Login.css"
import { IconButton, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const LoginHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    if (!user.email) return toast("Please enter your email");
    if (!user.password) return toast("Please enter your password");

    const getData = await dispatch(login(user));

    if (getData.type.includes("fulfilled")) {
      // eslint-disable-next-line
      const token = localStorage.setItem("authUser", getData.payload.token);
      setUser({
        email: "",
        password: "",
      });
      if (getData && getData.payload && getData.payload.data && getData.payload.data.company) {
        localStorage.setItem("companyId", getData.payload.data.company);
      }
      navigate("/dashboard");
    } else {
      toast(getData.payload.response.data.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: `${import.meta.env.VITE_GOOGLE_CLIENT_ID}`,
        scope: "",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <main className="d-flex align-items-center min-vh-100 py-3 py-md-0">
      <div className="container">
        <div className="card login-card">
          <div className="row no-gutters m-0">
            <div className="col-md-6  images">
              <img
                src="/Images/Hocco New Logo.gif"
                alt="login"
                className="login-card-img"
                id="img-1"
              />
              <img src="/Images/Doc.png" alt="image" id="img-2" />
            </div>
            <div className="col-md-6">
              <div className="card-body">
                <p className="login-card-description">Welcome, Sign In</p>
                <form onSubmit={LoginHandler}>
                  <div className="form-group mt-5">
                    <TextField
                      id="input"
                      type="text"
                      name="email"
                      label="Email"
                      variant="standard"
                      placeholder="Enter Email"
                      value={user?.email}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        style: {
                          color: "white",
                          borderColor: "white",
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                    />
                  </div>
                  <div className="form-group mb-1 mt-3">
                    <TextField
                      type={visible ? "text" : "password"}
                      name="password"
                      id="input"
                      label="Password"
                      variant="standard"
                      placeholder="Enter Password"
                      value={user?.password}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleVisibility}
                            edge="end"
                          >
                            {visible ? (
                              <VisibilityOffIcon className="text-warning" />
                            ) : (
                              <VisibilityIcon className="text-white" />
                            )}
                          </IconButton>
                        ),
                        style: {
                          borderColor: "white",
                          color: "white",
                        },
                      }}
                      InputLabelProps={{
                        style: { color: "white" },
                      }}
                    />
                  </div>
                  <div className="d-flex align-items-center justify-content-between mt-3">
                    {/* {authLoading && authLoading ? (
                      <>
                        <button className="login-btn" type="button" disabled>
                          <span
                            className="spinner-border spinner-border-sm"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Loading...
                        </button>
                      </>
                    ) : ( */}
                    <>
                      <LoadingButton
                        id="login"
                        className="btn btn-block login-btn"
                        type="submit"
                        defaultValue="Login"
                        sx={{ textTransform: "capitalize" }}
                        loading={loading}
                      >
                        Login
                      </LoadingButton>
                      {/* <button
                        id="login"
                        className="btn btn-block login-btn "
                        type="submit"
                        defaultValue="Login"
                      >
                        Login
                      </button> */}
                    </>
                    {/* )} */}

                    {/* <Link
                      to={"/auth/forgotpassword"}
                      className="forgot-password-link mb-4"
                    >
                      Forgot password?
                    </Link> */}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
