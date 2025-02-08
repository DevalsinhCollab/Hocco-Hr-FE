import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login, googlelogin } from "../../features/authDetailsSlice";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import { LoadingButton } from "@mui/lab";
import "../../css/Login.css"

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

  const handleOnSuccessBtn = async (data) => {
    const googleloginData = await dispatch(googlelogin(data.tokenId));

    if (!googleloginData.payload.error) {
      const token = localStorage.setItem(
        "token",
        googleloginData.payload.token
      );
      navigate("/");
    }
  };

  const handleOnFailureBtn = (data) => {
    toast("User not authenticate");
  };

  return (
    <>
      <div className="loginBox">
        <div className="loginImgBox">
          <img src="./Images/graphic3.svg" alt="svg" className="p-4" />
        </div>
        <div className="loginExtraBox">
          <div className="loginData">
            <div className="">
              <h2 className="text-center">Login</h2>
            </div>
            <form method="post" onSubmit={LoginHandler}>
              <div className="loginForm">
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    className="emailInput form-control"
                    placeholder="Email"
                    required={true}
                    onChange={(e) => {
                      setUser({ ...user, email: e.target.value });
                    }}
                  />
                </div>
                <div className="mt-3">
                  <div className="d-flex justify-content-between">
                    <label>Password</label>
                    <label className="text-danger">Forgot Password?</label>
                  </div>
                  <div className="d-flex">
                    <input
                      type={visible ? "text" : "password"}
                      className="passInput form-control"
                      placeholder="Password"
                      required={true}
                      onChange={(e) => {
                        setUser({ ...user, password: e.target.value });
                      }}
                    />
                    <button
                      className="p-2 show_pass border ms-2"
                      type="button"
                      onClick={() => {
                        setVisible(!visible);
                      }}
                    >
                      {visible ? (
                        <i className="fa-solid fa-eye"></i>
                      ) : (
                        <i className="fa-solid fa-eye-slash"></i>
                      )}
                    </button>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="d-flex gap-1">
                    <input type="checkbox" />
                    <span className="text-secondary fs-6">
                      Remember password ?
                    </span>
                  </div>
                </div>
                <div className="py-3">
                  <div className="d-flex justify-content-center align-items-center w-100">
                    {/* <button
                      type="submit"
                      className="btn btn4 me-3"
                      style={{ width: "70%" }}
                    >
                      Login
                    </button> */}
                    <LoadingButton
                      size="small"
                      type="submit"
                      className="btn btn4 me-3"
                      loading={loading}
                      style={{ width: "70%" }}
                    >
                      Login
                    </LoadingButton>
                    {/* <GoogleLogin
                      style={{width: '30%'}}
                      className="btn rounded btn5"
                      clientId="1094420422080-6uef7egom8g22i0f8ehoe5m8mtouh38v.apps.googleusercontent.com"
                      buttonText="Login with Google"
                      onSuccess={handleOnSuccessBtn}
                      onFailure={handleOnFailureBtn}
                      cookiePolicy={"single_host_origin"}
                    /> */}
                  </div>
                </div>
                <div>
                  <div className="d-flex justify-content-center align-items-center gap-1 w-100">
                    <span className="text-secondary fs-6">
                      Dont have an account?
                    </span>
                    <Link to={"/signup"} className="sign fs-6">
                      SignUp
                    </Link>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
