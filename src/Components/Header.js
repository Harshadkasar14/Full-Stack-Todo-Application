import {Link} from 'react-router-dom'
import { useAuth } from './Security/AuthContext';


function HeaderComponent() {

   const authContext=useAuth()
   const isAuthenticated=authContext.isAuthenticated

   function logout(){
    authContext.logout()
   }
  return (

       <header className="border-bottom border-light border-5 mb-5 p-2">
            <div className="container">
                <div className="row">
                    <nav className="navbar navbar-expand-lg">
                        <div className="collapse navbar-collapse">
                            <ul className="navbar-nav">
                                <li className="nav-item fs-5">
                                    { isAuthenticated && 
                                    <Link className="nav-link custom-hover" to="/welcome/Harshad">Home</Link> }
                                </li>
                                <li className="nav-item fs-5">
                                    { isAuthenticated && <Link className="nav-link custom-hover" to="/todos">Todos</Link> }
                                </li>
                            </ul>
                        </div>
                        <ul className="navbar-nav">
                            <li className="nav-item fs-5">
                               { !isAuthenticated && <Link className="nav-link custom-hover" to="/login">Login</Link> }
                            </li>
                            <li className="nav-item fs-5">
                                {isAuthenticated && <Link className="nav-link hover-red" to="/logout" onClick={logout}>Logout</Link> }
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header> 
    
  )
}
export default HeaderComponent;