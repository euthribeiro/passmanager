import React, { createContext, ReactNode, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
};

interface IStoragedDataContext {
  getLoginData: () => Promise<LoginDataProps[]>;
  setLoginData: (login: LoginDataProps) => Promise<void>;
}

const StoragedDataContext = createContext(
  {} as IStoragedDataContext
);

interface IStoragedDataProvider {
  children: ReactNode;
}



function StoragedDataProvider({ children } : IStoragedDataProvider) {

  async function getLoginData() {
    const loginsStoraged = await AsyncStorage.getItem('@passmanager:logins');
  
    if(loginsStoraged) {
      const logins: LoginDataProps[] = JSON.parse(loginsStoraged);

      return logins;
    }

    return [];
  }

  async function setLoginData(login: LoginDataProps) {
    try {
      const loginsStoraged = await AsyncStorage.getItem('@passmanager:logins');
  
      if(loginsStoraged) {
        const logins: LoginDataProps[] = JSON.parse(loginsStoraged);

        await AsyncStorage.setItem('@passmanager:logins', JSON.stringify([...logins, login]));
      } else {
        await AsyncStorage.setItem('@passmanager:logins', JSON.stringify([login]));
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  return (
    <StoragedDataContext.Provider
      value={{
        getLoginData,
        setLoginData
      }}
    >
      {children}
    </StoragedDataContext.Provider>
  )
}

function useStorageData() {
  const  context = useContext(StoragedDataContext);

  return context;
}

export { StoragedDataProvider, useStorageData };