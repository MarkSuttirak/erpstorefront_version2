
import { createContext, useEffect, useState, useContext } from "react";


const SystemPageContext = createContext<contextValueSystemPage>({} as contextValueSystemPage);


import { useFrappeGetDocList} from 'frappe-react-sdk'
import { SystemPage } from "@/typing";


// Créez le fournisseur de contexte
const SystemPageProvider = ({children} : {children : any}) => { 
    // Définissez la variable d'état et la fonction pour la mettre à jour
    const [myVariable, setMyVariable] = useState<string>('');
    const [data , setData] = useState<SystemPage>()
    const [submited , setSubmit] = useState(2)
    // Fonction pour changer la variable
    const changeVariable = (newValue : string) => {
      setMyVariable(newValue);
    };
    
    var {data : dataList , mutate} = useFrappeGetDocList<SystemPage>('SystemPage',{fields : [
    'name',
   'content_json',
'content_type',
'meta_image',
'published_on',
'published',
'title']} )

    useEffect(() => {
      if(dataList)
      {
        if(myVariable)
        {
          let variable = parseInt(myVariable)
          setData(dataList[variable])
        }
      }
    },[dataList,myVariable])

    useEffect(()=> {
      mutate()
  
    },[submited])
  
    const changeSubmit = (value : number) => {
        setSubmit(value)
    }

    // Valeur fournie par le contexte
    const contextValue : contextValueSystemPage= {
      update : submited,
      variable : myVariable,
      dataList : dataList ,
      data : data,
      changeSubmit : changeSubmit,
      changeVariable : changeVariable,
    };
  
    return <SystemPageContext.Provider value={contextValue}>{children}</SystemPageContext.Provider>;
  };
  
  export { SystemPageContext, SystemPageProvider };

  type contextValueSystemPage = {
    update: number;
    variable: string;
    dataList: SystemPage[] | undefined;
    data: SystemPage | undefined;
    changeSubmit: (value: number) => void;
    changeVariable: (newValue: string) => void;
  }