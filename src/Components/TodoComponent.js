import { useNavigate, useParams } from "react-router-dom"
import { createTodoApi, retriveTodoApi, updateTodoApi } from "./api/TodoApiService"
import { useAuth } from "./Security/AuthContext"
import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import moment from "moment"

export default function TodoComponent() {

   const {id}=useParams()

   const [description, setDescription]=useState('')
   const [targetDate, setTargetDate]=useState('')
   const [done, setDone] = useState(false); 

   
   const authContext=useAuth()

   const navigate=useNavigate()

   const username=authContext.username
   
   useEffect( ()=>{
      retriveTodos() 
   },[id])


   function retriveTodos(){
     if(id != -1){
        retriveTodoApi(username, id)
          .then(response=>{
            setDescription(response.data.description)
            setTargetDate(response.data.targetDate)
            setDone(response.data.done)
        })
          .catch(error=>console.log(error))
      }
   }


   function onSubmit(values){
    console.log(values)
    const todo={
        id: id,
        username: username,
        description: values.description,
        targetDate: values.targetDate,
        done: values.done
    }

    console.log(todo)

    if(id == -1){ 
        createTodoApi(username, todo)
          .then(response =>{
            navigate('/todos')
    })
     .catch(error =>console.log(error))
    }else{
            updateTodoApi(username, id, todo)
           .then(response =>{
            navigate('/todos')
    })
     .catch(error =>console.log(error))
    }
   
   }


   function validate(values){
    let errors={ }

    if(values.description.length<5){
       errors.description='Enter at Least 5 Characters'
    }

    if(values.targetDate == null || values.targetDate =='' || !moment(values.targetDate).isValid()){
        errors.targetDate='Enter a targetDate'
    }
    console.log(values)
    return errors
   }

  return (
    <div className="container">
        <h1>Enter Todo Details</h1>
        <div>
           <Formik initialValues={{description, targetDate, done}}
            enableReinitialize={true}
            onSubmit={onSubmit}
            validate={validate}
            validateOnChange={false}
            validateOnBlur={false}
            >
            {
              (props)=>(
             <Form>
                <ErrorMessage 
                    name="description"
                    component="div"
                    className="alert alert-warning"
                />
                <ErrorMessage 
                    name="targetDate"
                    component="div"
                    className="alert alert-warning"
                />
                 
                 <fieldset className="form-group">
                    <label>Description</label>
                    <Field type="text"  className="form-control" name="description"/>
                 </fieldset>
                 <fieldset className="form-group">
                    <label>TargetDate</label>
                    <Field type="date"  className="form-control" name="targetDate"/>
                 </fieldset>
                 <fieldset className="form-group">
                    <label className="form-check-label " htmlFor="done">Is Done</label>
                    <Field type="checkbox" className="form-check-input m-3  border border-dark" name="done" id="done"/>
                 </fieldset>
                 <div>
                    <button className="btn btn-success m-5" type="submit">Save</button>
                 </div>
             </Form>
              )
            } 
           </Formik>

        </div>
        </div>
  )
}
