import React from "react";
import { useNavigate } from "react-router-dom";

const Preference = ({ onButtonClick }) => {
  return (
    <div>
      <h1>Page 2: This is Preference</h1>
      <button onClick={() => onButtonClick("pagethree")}></button>
    </div>
  );
};
// function Preference() {
//   const navigate = useNavigate();
//   function openPage() {
//     navigate("/System-Suggest");
//   }

//   return (
//     <>
//     <h1>This is Page 2</h1>
//       <button onClick={openPage}>Click Me</button>
//     </>
//   );
// }

export default Preference;
