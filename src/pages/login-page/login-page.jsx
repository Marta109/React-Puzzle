import Login from "../../components/login/login";
import githubLogo from "../../assets/images/icons/github.svg";
import "./login-page.css";

const LoginPage = () => {
  return (
    <div className="login-container">
      <Login />
      <div className="footer-container">
        <div className="github-icon-container">
          <a
            href="https://github.com/Marta109"
            target="_blank"
            rel="noreferrer"
            className=""
          >
            <img src={githubLogo} alt="GitHub" className="github" />
            <span>2025</span>
          </a>
        </div>
        <a
          href="https://agbu.am/am"
          target="_blank"
          rel="noreferrer"
          className="abgu"
        ></a>
      </div>
    </div>
  );
};

export default LoginPage;
