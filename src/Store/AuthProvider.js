
import CreateAuth from './Create-Auth'
import { useState } from 'react'
const AuthProvider = (props) => {
    const [tokens, setTokens] = useState([]);

    const addTokenHandler = (token) => {
        setTokens(prevToken => {
            return [token, ...prevToken];
        })
    }
    const removeTokens = () => {
        setTokens([]);
    }
    console.log(tokens);
    
    const context = {
        tokenStore: tokens,
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
