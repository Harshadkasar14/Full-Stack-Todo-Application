import './App.css'
import HeaderComponent from './Components/Header'
import FooterComponent from './Components/Footer'
import LoginComponent from './Components/LoginComponent'
import WelcomeComponent from './Components/WelcomeComponent'
import ErrorComponent from './Components/ErrorComponent'
import LogoutComponent from './Components/LogoutComponent'
import ListTodoComponent from './Components/ListTodoComponent'
import {BrowserRouter, Route, Routes,} from "react-router-dom"
import AuthProvider, { useAuth } from './Components/Security/AuthContext'
import TodoComponent from './Components/TodoComponent'
import SignUpComponent from './Components/SignUpComponent'






function AuthenticatedRoute({children}){
  const authContext=useAuth()

  if(authContext.isAuthenticated)
     return children

  return <navigate to="/"></navigate>
}


export default function TodoApp() {
  return (
    <div className="TodoApp">
   <AuthProvider>
      <BrowserRouter>
       <HeaderComponent/>
        <Routes>

          <Route path='/' element={ <LoginComponent/>} />
          <Route path='/login' element={ <LoginComponent/>} />
          <Route path='/signup' element={ <SignUpComponent/>} />

          <Route path='/welcome/:username' element={ 
            <AuthenticatedRoute>
              <WelcomeComponent/>
            </AuthenticatedRoute>
            } />

          <Route path='/*' element={ 
            <AuthenticatedRoute>
              <ErrorComponent/>
            </AuthenticatedRoute>
            } />

          <Route path='/todos' element={ 
              <AuthenticatedRoute>
                <ListTodoComponent/>
              </AuthenticatedRoute>
            
            } />

            <Route path='/todo/:id' element={ 
              <AuthenticatedRoute>
                <TodoComponent/>
              </AuthenticatedRoute>
            
            } />

          <Route path='/logout' element={ 
            <AuthenticatedRoute>
            <LogoutComponent/>
            </AuthenticatedRoute>
            } />

        </Routes>
      <FooterComponent/>
      </BrowserRouter>
    </AuthProvider>
       
    </div>
  )
}







