import React, {useState, useEffect, createContext} from "react"

type AnimationType = {
   sidebarRight : boolean,
   sidebar : boolean;
   sideApp : boolean
   toggle  : (value : objectAnimation) => void;
}

type objectAnimation = 'SideBar' | 'SideApp' | 'SideBarRight'

const AnimationContext = createContext<AnimationType>({} as AnimationType)

const AnimationProvider = ({children} : {children : any}) => {
    const [SideBarRight, setSideBarRight] = useState<boolean>(false)
    const [Sidebar, setSidebar] = useState<boolean>(false)
    const [SideApp, setSideApp] = useState<boolean>(false)

    const toggle = (value : objectAnimation) => {
        switch(value)
        {
            case 'SideBar':
                setSidebar(!Sidebar)
                break;
            case 'SideApp':
                setSideApp(!SideApp)
                break;
            case 'SideBarRight':
                setSideBarRight(!SideBarRight)
                break;

        }
    }

    const contextValue : AnimationType = {
        sidebarRight : SideBarRight,
        sidebar : Sidebar,
        sideApp : SideApp,
        toggle : toggle
    }

    return <AnimationContext.Provider value={contextValue}>{children}</AnimationContext.Provider>
}

export {AnimationProvider, AnimationContext}