import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children
}) => {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);


  // =====================================
  // LOAD USER
  // =====================================

  useEffect(() => {

    const savedUser =
      localStorage.getItem(
        "schoolUser"
      );

    const token =
      localStorage.getItem(
        "schoolToken"
      );

    if (
      savedUser &&
      token
    ) {

      try {

        setUser(
          JSON.parse(savedUser)
        );

      } catch (error) {

        console.error(
          "User Parse Error:",
          error
        );

        localStorage.removeItem(
          "schoolUser"
        );

        localStorage.removeItem(
          "schoolToken"
        );
      }
    }

    setLoading(false);

  }, []);


  // =====================================
  // LOGIN
  // =====================================

  const login = (
    token,
    userData
  ) => {

    localStorage.setItem(
      "schoolToken",
      token
    );

    localStorage.setItem(
      "schoolUser",
      JSON.stringify(userData)
    );

    setUser(userData);
  };


  // =====================================
  // LOGOUT
  // =====================================

  const logout = () => {

    localStorage.removeItem(
      "schoolToken"
    );

    localStorage.removeItem(
      "schoolUser"
    );

    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () =>
  useContext(AuthContext);