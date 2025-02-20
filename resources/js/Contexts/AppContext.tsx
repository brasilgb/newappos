import { createContext, ReactNode, useContext, useState } from "react";

const AppContext = createContext({} as any);

interface AppContextProps {
    children: ReactNode;
}
export const AppProvider = ( {children }: AppContextProps ) => {
    const [filterDate, setFilterDate] = useState<Date>(new Date);

    return (
        <AppContext.Provider  value={{ 
            setFilterDate, 
            filterDate
        }}>
        {children}
        </AppContext.Provider>
    )
};
export const useAppContext = () => useContext(AppContext);