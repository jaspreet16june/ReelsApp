import { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { authContext } from "../AuthProvider";

import {signInWithGoogle, auth} from "../firebase";
let Login = ()=>{

    let user = useContext(authContext);
    console.log(user);

    return (
    <> 
    {(user) ? <Redirect to = "/"/>:" " }

    <button onClick={()=>{
        signInWithGoogle();
    }}
        className = "btn btn-primary m-4">Login To Google</button>

       
    </>
    )
}
export default Login;