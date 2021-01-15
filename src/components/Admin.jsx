import React from 'react'
import { withRouter } from "react-router-dom";
import axios from 'axios'
import * as moment from 'moment';

const Admin = (props) => {


    const [user, setUser] = React.useState(null)
    const [app, setApp] = React.useState(null)
    const [filtro, setFiltro] = React.useState(null)
    const [datosFiltrados, setDatosFiltrados] = React.useState([])
    const [campo, setCampo] = React.useState(null)
    const [expresion, setExpresion] = React.useState(null)
    const [datos, setDatos] = React.useState([])

    React.useEffect(() => {
        const userLocal = JSON.parse(localStorage.getItem('user'))
        const appLocal = JSON.parse(localStorage.getItem('app'))
        if(userLocal && appLocal){
            console.log('existe', userLocal)
            console.log('existe', userLocal)
            setUser(userLocal)
            setApp(appLocal)
        }else{
            console.log('no existe')
            
            localStorage.removeItem('user')
            localStorage.removeItem('app')
            props.history.push('/login')
            window.location.reload();
        }

        const getData = async(user,app) => {
            try {

                axios.defaults.headers = {
                    'Accept': 'application/json',
                    adminemail: user.email,
                    app: app,
                    token: user.sessionTokenBck
                }
                const data =  await axios.get(`https://dev.tuten.cl:443/TutenREST/rest/user/contacto@tuten.cl/bookings?current=true`)
                data.data.map(item => item.bookingTime = moment(item.bookingTime).format("DD MMM YYYY"));
                setDatos(data.data)
                setDatosFiltrados(data.data)
                console.log(data);

            } catch(error) {
                console.log(error);
            }
        }

        getData(userLocal,appLocal)
    }, [props.history])

    const filtrar = (e) => {
        e.preventDefault()
        console.log(campo);
        console.log(expresion);
        console.log(filtro);
        console.log(datos);
        let filtrados = datos;

        if(campo && campo != "null" &&
            filtro && filtro != "" &&
                expresion && expresion != "0") {
           

            if(campo == 'bookingId') {

                if(expresion == '1') {
                    filtrados = datos.filter(item => item.bookingId == filtro);
                } else if(expresion == '2') {
                    filtrados = datos.filter(item => item.bookingId >= filtro);
                } else if(expresion == '3') {
                    filtrados = datos.filter(item => item.bookingId <= filtro);
                }
                
            } else {
                if(expresion == '1') {
                    filtrados = datos.filter(item => item.bookingPrice == filtro);
                } else if(expresion == '2') {
                    filtrados = datos.filter(item => item.bookingPrice >= filtro);
                } else if(expresion == '3') {
                    filtrados = datos.filter(item => item.bookingPrice <= filtro);
                }
            }

            
            
            
        }

        setDatosFiltrados(filtrados)
        
    }

    const limpiar = () => {
        setCampo("null")
        setExpresion("0")
        setFiltro("")
        setDatosFiltrados(datos)
    }


    return (
        <div className="container">

                 
        <form onSubmit={filtrar}>

        <div className="form-row">
            <div className="form-group col-md-4">
                 <label for="inputCampo">Campo</label>
                 <select value={campo} onChange={e => setCampo(e.target.value)} id="inputCampo" className="form-control">
                     <option value="null" selected>Seleccione...</option>
                     <option value="bookingId">BookingId</option>
                     <option value="bookingPrice">Precio</option>
                 </select>
             </div>
             <div className="form-group col-md-4">
                 <label for="inputExpression">Expresion</label>
                 <select value={expresion} onChange={e => setExpresion(e.target.value)} id="inputExpression" className="form-control">
                     <option value="0" selected>Seleccione...</option>
                     <option value="1">Igual a</option>
                     <option value="2">Mayor igual a</option>
                     <option value="3">Menor igual a</option>
                 </select>
             </div>
             <div className="form-group col-md-2">
             <label for="inputValor">Valor</label>
             <input value={filtro} onChange={e => setFiltro(e.target.value)} type="number" className="form-control" id="inputValor"/>
             </div>
         </div>
             
         
             <button 
             className='btn btn-primary' 
             
             type="submit"
             >
             filtrar
             </button>
             <button type="button" className='btn btn-default' onClick={() => limpiar()}>limpiar</button>
         </form>
  

         <table className="table table-striped mt-5">
             <thead>
             <tr>
                 <th>BookingId</th>
                 <th>Cliente</th>
                 <th>Fecha de Creación</th>
                 <th>Dirección</th>
                 <th>Precio</th>
             </tr>
             </thead>
             <tbody>
                 {
                     datosFiltrados.map(item => (
                         <tr key={item.bookingId}>
                             <td>{item.bookingId}</td>
                             <td>{item.tutenUserClient.firstName} {item.tutenUserClient.lastName}</td>
                             <td>{item.bookingTime}</td>
                             <td>{item.locationId.streetAddress}</td>
                             <td>{item.bookingPrice}</td>
                         </tr>
                     ))
                 }
            
             </tbody>
         </table>
 </div>
        
    )
}


export default withRouter(Admin)