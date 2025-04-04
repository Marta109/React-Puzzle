import { useState, useContext } from "react";
import { PuzzleContext } from "../../contexts/appContext";
import Button from "../game-button/game-button";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [userName, setUserName] = useState("User");
  const [userSurName, setUserSurName] = useState("");
  const { dispatch } = useContext(PuzzleContext);
  const navigate = useNavigate();

  const handleUserName = (e) => {
    setUserName(e.target.value.trim());
  };
  const handleUserSurName = (e) => {
    setUserSurName(e.target.value.trim());
  };

  const submit = (e) => {
    e.preventDefault();
    const fullName = userName === "" ? "User" : `${userName} ${userSurName}`;
    localStorage.setItem("userName", fullName);
    dispatch({ type: "START_GAME", payload: fullName });
    navigate("/welcome");
  };

  return (
    <form className="login-form" onSubmit={submit}>
      <div className="container py-5 h-100 ">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-5 col-lg-6 col-xl-5">
            <div className="card shadow-2-strong game-login">
              <div className="card-body p-4 text-center">
                <h4 className="mb-4 title">Sign in and start game</h4>

                <div
                  data-mdb-input-init
                  className="form-outline mb-4 login-input"
                >
                  <label className="form-label" htmlFor="userName">
                    Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    placeholder="User"
                    className="form-control "
                    onChange={handleUserName}
                  />
                </div>

                <div
                  data-mdb-input-init
                  className="form-outline mb-4 login-input"
                >
                  <label className="form-label" htmlFor="userSurName">
                    Surname
                  </label>
                  <input
                    type="text"
                    id="userSurName"
                    className="form-control"
                    onChange={handleUserSurName}
                  />
                </div>
                <Button name={"Login"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Login;
