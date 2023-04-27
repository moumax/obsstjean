import { createContext, useState, useMemo } from "react";

const CurrentUserContext = createContext();

// eslint-disable-next-line react/prop-types
export function CurrentUserContextProvider({ children }) {
  const [user, setUser] = useState(localStorage.getItem("role"));
  const value = useMemo(
    () => ({
      user,
      setUser,
    }),
    [user]
  );
  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserContext;
