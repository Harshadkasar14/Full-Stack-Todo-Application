import axios from "axios";

const api=axios.create({
    baseURL:'http://localhost:8080'
})

export function retriveHelloWorldBean(){
 return api.get('/hello-world-bean')
}

export const retriveHelloWorldPathVariable
   =(username)=>api.get(`/hello-world/path-variable/${username}`)





   // we also export like this and access as call
// export const retriveHelloWorldBean
//    =()=>axios.get('http://localhost:8080/hello-world-bean')

