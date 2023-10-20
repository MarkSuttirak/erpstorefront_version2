'use client'
import { TabContextType, contextTab } from "@/typing";
import { createContext, useState } from "react";


const TabContext = createContext<contextTab>({} as contextTab);

// Créez le fournisseur de contexte
const TabProvider = ({children} : {children : any}) => {
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<TabContextType>('Post');
  
    // Fonction pour changer la variable
    const changeVariable = (newValue : TabContextType) => {
      setMyVariable(newValue);
    };
  
    // Valeur fournie par le contexte
    const contextValue = {
      variable : myVariable,
      ChangeVariable : changeVariable,
    };
  
    return <TabContext.Provider value={contextValue}>{children}</TabContext.Provider>;
  };
  
  export { TabContext, TabProvider };