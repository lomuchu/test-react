import axios from 'axios'
import React from 'react'
import {withRouter} from 'react-router-dom'

const Login = (props) => {

    const [email, setEmail] = React.useState('testapis@tuten.cl')
    const [pass, setPass] = React.useState('1234')
    const [app, setApp] = React.useState('APP_BCK')
    const [error, setError] = React.useState(null)


    const procesarDatos = e => {
        e.preventDefault()
        if(!email.trim() || !pass.trim()){
            console.log('Datos vacíos email!')
            setError('Datos vacíos email!')
            return
        }
        if(!pass.trim()){
            console.log('Datos vacíos pass!')
            setError('Datos vacíos pass!')
            return
        }
        if(!app.trim()){
            console.log('Datos vacíos app!')
            setError('Datos vacíos app!')
            return
        }
        console.log('correcto...')
        setError(null)

       
            login()
        

    }

    const login = React.useCallback(async () => {
        try {
           
            axios.defaults.headers = {
                'Accept': 'application/json',
                password: pass,
                app: app
            }
           const res = await axios.put(`https://dev.tuten.cl:443/TutenREST/rest/user/${email}`)
            console.log(res)
            
            localStorage.setItem('user', JSON.stringify(res.data))
            localStorage.setItem('app', JSON.stringify(app))
            setEmail('')
            setPass('')
            setApp('')
            setError(null)
            props.history.push('/')
            window.location.reload();
        } catch (error) {
            console.log(error)
           setError(error)
        }
    }, [email, pass, props.history])

    

    return (
        <div className="mt-5">
            <h3 className="text-center">
                Login
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange={ e => setEmail(e.target.value) }
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña"
                            onChange={ e => setPass(e.target.value) }
                            value={pass}
                        />
                        <input 
                            type="text" 
                            className="form-control mb-2"
                            placeholder="Ingrese App"
                            onChange={ e => setApp(e.target.value) }
                            value={app}
                        />
                        <button 
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                             Acceder
                        </button>
                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login)