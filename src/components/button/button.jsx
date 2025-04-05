import "./button.css";

const Button = ({
  child,
  type = "submit",
  classes = "",
  onClick,
  title=""
}) => {
  return (
    <button
      data-mdb-button-init
      data-mdb-ripple-init
      className={`btn btn-primary btn-lg  glow-on-hover ${classes}`}
      type={type}
      onClick={onClick ? onClick : undefined}
      title={title}
    >
      {child}
    </button>
  );
};

export default Button;
