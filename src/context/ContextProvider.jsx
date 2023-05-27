const { createContext, useState, useContext } = require("react");

const StateContext = createContext({
    user: null,
    token:null,
    notification_msg:null,
    setUser: () => {},
    setToken: () => {},
    setNtoficationMsg: () => {}
});
export const ContextProvider = ({children}) =>{
    const [user, setUser] = useState({});
    const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const setToken = (token) => {
        _setToken(token)
        if(token){
            localStorage.setItem('ACCESS_TOKEN',token);
        }else{
            localStorage.removeItem('ACCESS_TOKEN');
        }
    }
    const [notification_msg, setNotificationMsg] = useState('');
    const setNotification = (message) =>{
        setNotificationMsg(message);
        setTimeout(()=>{
            setNotificationMsg('');
        },5000);
    }
    return (
        <StateContext.Provider value = {{user,token,notification_msg,setUser,setToken,setNotification}}>
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () =>useContext(StateContext);
