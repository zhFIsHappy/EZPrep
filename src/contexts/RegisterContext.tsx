import { createContext, Dispatch, useReducer, useState } from 'react';
import {RegisterForm, SelectedPreference} from "../types";
import PreferenceSettings from "../components/PreferenceSettings";

const initialRegisterForm: RegisterForm = {
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
  salt: "",
};

const initialPreference: SelectedPreference = {
  difficulty: "Easy",
  language: "C",
  time: 20,
};

export const RegisterContext = createContext<{
  registerForm: RegisterForm;
  modifyForm: (name: any, value: any) => void;
  selectedPreference: SelectedPreference;
  modifyPreference: (name: any, value: any) => void;
}>({
  registerForm: initialRegisterForm,
  modifyForm: (name: any, value: any) => {},
  selectedPreference: initialPreference,
  modifyPreference: (name: any, value: any) => {},
});

RegisterContext.displayName = "RegisterContext";

export function RegisterContextProvider({children}: React.PropsWithChildren<{}>) {
  // Use the useReducer hook to manage the interview chat messages state
  // @ts-ignore
  const [registerForm, setRegisterForm] = useState<RegisterForm>(initialRegisterForm);
  const [selectedPreference, setSelectedPreference] = useState<SelectedPreference>(initialPreference);

  const modifyForm = (name: any, value: any) => {
    setRegisterForm({ ...registerForm, [name]: value});
  };

  const modifyPreference = (name: any, value: any) => {
    if (name === "time") {
      console.log("into", name, value);
      if (value <= 0) {
        setSelectedPreference({ ...selectedPreference, [name]: 1});
      } else if (value > 60) {
        setSelectedPreference({ ...selectedPreference, [name]: 60});
      } else {
        setSelectedPreference({ ...selectedPreference, [name]: value});
      }
    } else {
      setSelectedPreference({ ...selectedPreference, [name]: value});
    }

  }

  // You can provide any other context values or functions you need here
  return (
    <>
      <RegisterContext.Provider value={{
        registerForm, modifyForm,
        selectedPreference, modifyPreference
      }}>
        {children}
      </RegisterContext.Provider>
    </>
  );
}





