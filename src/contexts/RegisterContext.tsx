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
  codingExperience: "",
  algoExperience: "",
  difficulty: "Easy",
  language: "",
  time: 20,
};

export const RegisterContext = createContext<{
  registerForm: RegisterForm;
  modifyForm: (name: any, value: any) => void;
  clearForm: () => void;
  selectedPreference: SelectedPreference;
  modifyPreference: (name: any, value: any) => void;
  preferenceTime: number;
}>({
  registerForm: initialRegisterForm,
  modifyForm: (name: any, value: any) => {},
  clearForm: () => {},
  selectedPreference: initialPreference,
  modifyPreference: (name: any, value: any) => {},
  preferenceTime: 0,
});

RegisterContext.displayName = "RegisterContext";

export function RegisterContextProvider({children}: React.PropsWithChildren<{}>) {
  // Use the useReducer hook to manage the interview chat messages state
  // @ts-ignore
  const [registerForm, setRegisterForm] = useState<RegisterForm>(initialRegisterForm);
  const [selectedPreference, setSelectedPreference] = useState<SelectedPreference>(initialPreference);
  const [preferenceTime, setPreferenceTime] = useState(0);

  const modifyForm = (name: any, value: any) => {
    setRegisterForm({ ...registerForm, [name]: value});
  };

  const modifyPreference = (name: any, value: any) => {
    if (name === "time") {
      value = Number(value);
      console.log(value);
      setPreferenceTime(value);
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

  const clearForm = () => {
    setRegisterForm(initialRegisterForm);
  }

  // You can provide any other context values or functions you need here
  return (
    <>
      <RegisterContext.Provider value={{
        registerForm, modifyForm, clearForm,
        selectedPreference, modifyPreference, preferenceTime
      }}>
        {children}
      </RegisterContext.Provider>
    </>
  );
}





