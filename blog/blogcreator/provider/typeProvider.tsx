'use client'
import { TypeContextType, contextType, DataType } from "@/typing";
import { createContext, useState} from "react";

const TypeContext = createContext<contextType>({} as contextType);


import {useFrappeGetDocList} from 'frappe-react-sdk'

// Créez le fournisseur de contexte
const TypeProvider = ({children} : {children : any}) => { 
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<TypeContextType>('');
    // Fonction pour changer la variable
    const changeVariable = (newValue : TypeContextType) => {
      setMyVariable(newValue);
    };

    const getdata = () => {
      var {data ,isLoading} = useFrappeGetDocList<DataType>('Blog Category',{fields : [ 'title',
      'name',
       'published'
       ]} )
      if (data){
        return {data, isLoading}
      }else{
        data = {} as DataType[];
        return {data, isLoading}
      }
 
    } 


    // Valeur fournie par le contexte
    const contextValue : contextType = {
      variable : myVariable,
      data : getdata ,
      ChangeVariable : changeVariable,
    };
  
    return <TypeContext.Provider value={contextValue}>{children}</TypeContext.Provider>;
  };
  
  export { TypeContext, TypeProvider };