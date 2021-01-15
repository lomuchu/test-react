import React from 'react'
import {Link, NavLink} from 'react-router-dom'
import { withRouter } from "react-router-dom";

const Navbar = (props) => {

    const cerrarSesion = () => {
        
        localStorage.removeItem('user')
        localStorage.removeItem('app')

                props.history.push('/login')
                window.location.reload();
    }

    return (
        <div className="navbar navbar-dark bg-dark">
            <Link to="/" className="navbar-brand">Tuten Admin</Link>
            <div>
                <div className="d-flex">
                {
                        props.user !== null ? ( <NavLink 
                        className="btn btn-dark mr-2" 
                        to="/"
                        exact
                    >
                        Inicio
                    </NavLink>)
                    : null
                    }
                    {
                        props.user !== null ? (
                        <button 
                            className="btn btn-dark" 
                            onClick={() => cerrarSesion()}
                        >
                            Cerrar Sesión
                        </button>
                        ): (
                        <NavLink 
                            className="btn btn-dark" 
                            to="/login"
                        >
                            Login
                        </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar)