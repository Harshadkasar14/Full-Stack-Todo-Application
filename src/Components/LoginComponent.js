import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Security/AuthContext";



function LoginComponent(){
    
   const[username,setUsername]=useState("Harshad");

   const[password,setPassword]=useState("Pass@2003");

   const [errorMessage, setErrorMessage] = useState('');
    
    const navigate=useNavigate();
    const authContext=useAuth()

   function handleUsernameChange(event){
       console.log(event.target.value);
       setUsername(event.target.value)
    }

    
    function handlePasswordChange(event){
        setPassword(event.target.value)
    }

   

    async function handelSubmit(){
       const result= await authContext.login(username,password)

       if (result.success)
        { 
            navigate(`/welcome/${username}`)
        }else{
             setErrorMessage(result.message);
        }         
    }function handleSignup(){
        navigate(`/signup`)
    }



    

    return(
        <div className="login">
            {errorMessage && (
        <div style={{ color: "red" }}>
          {errorMessage}
          {errorMessage.includes("sign up") && (
            <div style={{ marginTop: "10px" }}>
              <Link to="/signup"></Link>
            </div>
          )}
        </div>
      )}
           <div className="loginform">
             <div>
             <label>User Name:</label>
             <input type="text" name="username" value={username} onChange={handleUsernameChange}/>
             </div>
             <div>
             <label>Password:</label>
             <input type="password" name="password" value={password} onChange={handlePasswordChange}/>
             </div>
             <div>
             <button type="button" className="btn btn-success me-2" onClick={handelSubmit} >Login</button>
             <button type="button" className="btn btn-outline-primary" onClick={handleSignup} >signup</button>
             </div>
           </div>

           
        </div>
    )
}


export default LoginComponent