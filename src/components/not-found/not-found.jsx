// import { useContext } from "react";
// // import { AppContext } from "../../contexts/appContext";
// import { useNavigate } from "react-router-dom";
// import Button from "../button/button";
// import notFound from "../../assets/images/not-found.jpg";
// import "./not-found.css";

// const NotFound = ({ message }) => {
//   const { state, dispatch } = useContext();
//   // const { state, dispatch } = useContext(AppContext);
//   const navigate = useNavigate();

//   const handClick = () => {
//     dispatch({ type: "SET_ERROR", payload: false });
//     dispatch({ type: "SET_SEARCH", payload: "dark" });
//     navigate("/");
//   };
//   return (
//     <ul className="not-found">
//       <div className="not-found-descr">
//         {message ? <p>{message}</p> : <p>{state.error}</p>}
//         {message ? (
//           ""
//         ) : (
//           <Button child={"return back"} type="button" onClick={handClick} />
//         )}
//       </div>
//       <div className="no-film">
//         <img src={notFound} alt="No film" />
//       </div>
//     </ul>
//   );
// };

// export default NotFound;
