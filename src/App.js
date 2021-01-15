
import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Login from './components/Login'
import Admin from './components/Admin'

function App() {

  const [user, setUser] = React.useState(false)

  React.useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    console.log('init', userLocal);
    setUser(userLocal)
  }, [])

  return user !== false ? (
    <Router>
            <div className="container">
                <Navbar user={user}/>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    
                    <Route path="/" exact>
                        <Admin />
                    </Route>
                </Switch>
            </div>
        </Router>
  ) : (
    <div>Cargando...</div>
)
}

export default App;
