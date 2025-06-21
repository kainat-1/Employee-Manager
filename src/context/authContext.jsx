import React, { createContext, useContext, useState } from "react";

const userContext = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (user) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <userContext.Provider value={{ user, login, logout }}>
      {children}
    </userContext.Provider>
  );
};

export const useAuth = () => useContext(userContext);

export default AuthContext;


// import React, { createContext, useContext, useState } from "react";
// import { Children } from "react";

// const userContext = createContext();
// const authContext = ({ Children }) => {
  

//   const login = (user) => {
//     setUser(user);
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("token");
//   };
//   return (
//     <userContext.provider value={{ user, login, logout }}>
//       {Children}
//     </userContext.provider>
//   );
// };
// export const useAuth = () => useContext(userContext);
// export default authContext;




























