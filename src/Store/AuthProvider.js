
import CreateAuth from './Create-Auth'
import { useState } from 'react'
const AuthProvider = (props) => {
    const [tokens, setTokens] = useState(null);
    
    const addTokenHandler = (token) => {
        setTokens(token)
    }
    const removeTokens = () => {
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
