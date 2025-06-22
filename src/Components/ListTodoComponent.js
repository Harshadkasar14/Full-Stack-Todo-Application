import { useEffect, useState } from "react";
import { deleteTodoApi, retriveTodosForUsersApi } from "./api/TodoApiService";
import { useAuth } from "./Security/AuthContext";
import { useNavigate } from "react-router-dom";



function ListTodoComponent(){

    const today=new Date();

    const authContext=useAuth()
    const username=authContext.username

    const navigate=useNavigate()

    const targetDate=new Date(today.getFullYear(), today.getMonth()+2, today.getDay())
    const [todos,setTodos]=useState([])
    const [message, setMessage]=useState(null);

    // const todos=[
    //     {id:1, description:"Learn Java", done:false, targetDate:targetDate},
    //     {id:2, description:"Learn Javascript", done:false, targetDate:targetDate},
    //     {id:3, description:"Learn React.js", done:false, targetDate:targetDate},
    //     {id:4, description:"Learn Spring boot", done:false, targetDate:targetDate}
    // ]

    useEffect( ()=>{
        refreshTodos() 
    }, [])

    function refreshTodos(){
        retriveTodosForUsersApi(username)
         .then(response=>{
            setTodos(response.data)
         })
         .catch(error=>console.log(error))
    }

    function deleteTodo(id){
        console.log('clicked' + id)
        deleteTodoApi(username,id)
        .then(()=>{
             setMessage(`Delete the todo with id=${id} successful`)
             refreshTodos()
        }
            
        )
        .catch(error=>console.log(error))
    }


    
    function updateTodo(id){
        console.log('clicked' + id)
       navigate(`/todo/${id}`)
    }

    function addNewTodo(){
        
       navigate(`/todo/-1`)
    }

    return(
        <div className='container'>
            <h1>Todos List </h1>
            <div className="alert">{message}</div>
            <div>
               <table className="table">
                    <thead>
                        <tr>

                            <th>Description</th>
                            <th>Is Done?</th>
                            <th>Target Date</th>
                            <th>Delete</th>
                            <th>Update</th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                      todos.map(
                         todo=>(
                          <tr key={todo.id}> 
                             <td>{todo.description}</td>
                             <td>{Boolean(todo.done) ? 'true' : 'false'}</td>
                             <td>{todo.targetDate.toString()}</td>
                             <td><button className="btn btn-warning hover-red" 
                                       onClick={()=>deleteTodo(todo.id)}>Delete</button></td>
                             <td><button className="btn btn-success"
                                     onClick={()=>updateTodo(todo.id)}>Update</button></td>
                          </tr>
                         )
                        )
                     }
                    </tbody>
               </table>
            </div>
            <div className="btn btn-success m-5" onClick={addNewTodo}>Add New Todo</div>
        </div>
    )
}



export default ListTodoComponent;