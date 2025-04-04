import "./game-button.css";

const Button = ({ name, type = "submit", classes = "", onClick }) => {
  return (
    <button
      data-mdb-button-init
      data-mdb-ripple-init
      className={`btn btn-primary btn-lg  glow-on-hover ${classes}`}
      type={type}
      onClick={onClick ? onClick : undefined}
    >
      {name}
    </button>
  );
};

export default Button;
