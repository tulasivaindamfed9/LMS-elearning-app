import { createContext } from "react";
export const AppContext=createContext();

export const AppContextProvider=(props)=>{
 
  const currency=import.meta.env.VITE_CURRENCY
  
    const value={
      //  to access the currency varibale in our entire app we mentio it in value
      currency
    }
  return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
  )
}