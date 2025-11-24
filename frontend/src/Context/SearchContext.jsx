import React, { createContext, useState } from 'react'

// Create a Context

export const ContextContent=createContext();

// Create a Context Provider 

const ContextApi = ({children}) => {
    const [search, setsearch] = useState("");
  return (
    <ContextContent.Provider value={{setsearch,search}}>
        {children}
    </ContextContent.Provider>
  )
}
export default ContextApi;

