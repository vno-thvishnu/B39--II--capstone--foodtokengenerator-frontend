import React, { createContext, useState } from 'react'


export const  UserContext = createContext();

export const UserProvider =({children})=>{

    const [failModal,setFailModal]=useState(false);
    const [successModal,setSuccessModal]=useState(false);

    const [loginsuccessModal,setLoginsuccessModal]=useState(false);
    const [loginsuccessRouter,setLoginsuccessRouter]=useState(false);

    const [alertmodal,setAlertmodal]=useState(false)
    // const [postagain,setPostagain]=useState("")



    const [displaymsg,setDisplaymsg]=useState([]);

    const [loginBy,setLoginBy]=useState([])

    return(
        <UserContext.Provider value={{failModal,setFailModal,
            successModal,setSuccessModal,
        displaymsg,setDisplaymsg,
        loginsuccessModal,setLoginsuccessModal,
        loginsuccessRouter,setLoginsuccessRouter,
        alertmodal,setAlertmodal,
        // postagain,setPostagain
        loginBy,setLoginBy
        }}>
            {children}
        </UserContext.Provider>
    )
}
