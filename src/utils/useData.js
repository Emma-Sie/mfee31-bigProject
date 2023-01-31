import React, {
    useState,
    useContext,
    createContext,
  } from 'react'
  
  const DataContext = createContext(null)
  
  export const DataProvider = ({ children }) => {
    const [values, setValues] = useState({name:'',phone:''})
  
    return (
      <DataContext.Provider
        value={{
            values,
            setValues,
        }}            
      >
        {children}
      </DataContext.Provider>
    )
  }
  
  export const useData = () => useContext(DataContext)