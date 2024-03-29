import {Children, createContext, useContext, useState} from 'react';

const LoginContext = createContext();

const LoginProvider = ({children}) => {
  const [isLoggedin, setIsLoggedin] = useState(false);
  return (
    <LoginContext.Provider value={{isLoggedin, setIsLoggedin}}>
      {children}
    </LoginContext.Provider>
  );
};
export const useLogin = () => useContext(LoginContext);
export default LoginProvider;
