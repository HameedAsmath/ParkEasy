import React, { useState, useContext, createContext, useEffect } from "react";

const Context = createContext()

export const Usercontext = ({children}) => {
    const [isAdmin, setIsAdmin] = useState(false)
    const [id, setId] = useState("")
    const [email, setEmail] = useState("")
    const [firstname, setFirstName] = useState("")
    useEffect(() => {
      console.warn(isAdmin)
      console.warn(email)
      console.warn(firstname)
      console.warn(id)
      // isAdmin ? navigate('/admin-home',{replace: true}) : navigate('/home',{replace: true})
    }, [isAdmin,email, firstname, id])
  return (
    <Context.Provider value={{isAdmin, setIsAdmin, email, setEmail, firstname, setFirstName, id, setId}}>
        {children}
    </Context.Provider>
  )
}

export const useUserContext = () => useContext(Context);
