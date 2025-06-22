import axios from "axios";

const api=axios.create({
    baseURL:'http://localhost:8080/api'
})

export function retriveTodosForUsersApi(username){
 return api.get(`/users/${username}/todos`)
}


export const deleteTodoApi
  =(username,id)=>api.delete(`/users/${username}/todos/${id}`)


export const retriveTodoApi
  =(username,id)=>api.get(`/users/${username}/todos/${id}`)


export const updateTodoApi
  =(username,id,todo)=>api.put(`/users/${username}/todos/${id}`,todo)

export const createTodoApi
  =(username,todo)=>api.post(`/users/${username}/todos`,todo)