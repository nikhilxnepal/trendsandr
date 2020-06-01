import React, { createContext, useState } from 'react';

export const GlobalContext = createContext();

const GlobalContextProvider = (props) => {
  
  const [loading, setLoading] = useState(false);

  const toggleLoading = (loadingState) => {
    setLoading(loadingState)
  }

  return (
    <GlobalContext.Provider value={{loading, toggleLoading: toggleLoading}}>
      {props.children}
    </GlobalContext.Provider>
  );
}
 
export default GlobalContextProvider;