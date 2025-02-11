import { createContext, ReactNode, useContext, useState } from "react";

const AppContext = createContext({} as any);

interface AppContextProps {
    children: ReactNode;
}
export const AppProvider = ( {children }: AppContextProps ) => {
const [teste, setTeste] = useState('testado');
    return (
        <AppContext.Provider 
        value={{ teste }}
        >
        {children}
        </AppContext.Provider>
    )
};
export const useAppContext = () => useContext(AppContext);