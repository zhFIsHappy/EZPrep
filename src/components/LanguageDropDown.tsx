import "../assets/css/dropdown.css";
import { useState } from "react";
function Dropdown({selected, setSelected}: {selected : string, setSelected: React.Dispatch<React.SetStateAction<string>>} ){
    const options = ['Java', 'C++', 'Javascript']
    const [isActive, setIsActive] = useState(false);
    <div className = "dropdownlanguage">
        <div className = "dropdownlanguage-btn" onClick={(e) =>{
            setIsActive(!isActive)}} >{selected}</div>
        {isActive && 
        (<div className="dropdownlanguage-content">
            {options.map(option=>(
                <div onClick={(e)=> setSelected(option)}
                className = "dropdownlanguage-item">
                    {option}
                </div>
            ))}
            
            

        </div>)}
    </div>
}
export default Dropdown;