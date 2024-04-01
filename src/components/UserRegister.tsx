

const Register = ({onButtonClick}) =>{
    return (
      <h1>
        Page 1: This is User RegisterPage
        <button onClick={() => onButtonClick("pagetwo")}></button>
      </h1>
    );
}

export default Register;