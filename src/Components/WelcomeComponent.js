import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import  { retriveHelloWorldPathVariable } from './api/HelloWorldApiService';
function WelcomeComponent(){
    const {username}=useParams();

    const[message, setMessage]=useState(null)
   


    function CallRestApi(){

    // retriveHelloWorldBean()
    //       .then((response)=>successResponse(response))
    //       .catch((error)=>errorResponse(error))

    
    retriveHelloWorldPathVariable(username)
          .then((response)=>successResponse(response))
          .catch((error)=>errorResponse(error))
    

    }

    function successResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error)
    }
    return(
        <div className="welcome">
            <h1>Welcome {username}</h1>
            Your Todos <Link to="/todos">Go here</Link>
            <div>
                <button className="btn btn-success" onClick={CallRestApi}> Call {username}</button>
            </div>
            <div className="text-info">{message}

            </div>
        </div>
    )
}

export default WelcomeComponent;