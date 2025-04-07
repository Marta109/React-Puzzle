import "./spinner.css";

const Spinner = ({ name = "" }) => {
  return (
    <>
      <div className="spinner-border mt-5 spinner" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      {name ? <p>Loading {name}...</p> : ""}
    </>
  );
};

export default Spinner;
