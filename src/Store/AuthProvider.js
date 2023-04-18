
import CreateAuth from './Create-Auth'
import { useEffect, useState } from 'react'
const AuthProvider = (props) => {
  const [tokens, setTokens] = useState(null);
  useEffect(() => {
    if (tokens === null || localStorage.getItem("token") !== null)
      setTokens(localStorage.getItem("token"));
  },[tokens])
  
    
    const addTokenHandler = (token) => {
      setTokens(token)
      localStorage.setItem('token', token);
    }
  const removeTokens = () => {
        localStorage.removeItem('token');
        setTokens(null);
    }
  const userIsLoggedIn = !!tokens;
  // console.log(tokens);
    
    const context = {
        tokenStore: tokens,
        isLoggedIN: userIsLoggedIn,
        addTokens: addTokenHandler,
        removeTokens : removeTokens,
    }
  return (
    <CreateAuth.Provider value={context}>
      {props.children}
    </CreateAuth.Provider>
  )
}

export default AuthProvider;
