import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import HomeScreen from './screens/home/index'
import LoginScreen from './screens/auth/login/index'
import RegisterScreen from './screens/auth/register/index'
import EditScreen from './screens/users/edit/index'
import NotesScreen from './screens/notes/index/index'

import PrivateRouter from './components/auth/private_router/index'

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={HomeScreen} />
                <Route exact path="/login" component={LoginScreen} />
                <Route exact path="/register" component={RegisterScreen} />
                <PrivateRouter exact path="/notes" component={NotesScreen} />
                <PrivateRouter exact path="/users/edit" component={EditScreen} />
            </Switch>
        </BrowserRouter>   
    )
}

export default Routes