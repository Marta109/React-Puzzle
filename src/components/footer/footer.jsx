import githubIcon from "../../assets/images/icons/github.svg";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <span>© 2025</span>
      <a
        href="https://github.com/Marta109"
        target="_blank"
        rel="noopener noreferrer"
        className="footer-icon"
        title="GitHub"
      >
        <img
          src={githubIcon}
          alt="GitHub"
          className="footer-icon"
        />
      </a>
    </footer>
  );
};

export default Footer;
