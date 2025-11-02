import { createContext } from "react";
window.dispatchEvent(new Event("storage"));

export const AuthContext = createContext();
