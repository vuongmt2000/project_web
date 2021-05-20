import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from 'pages/Login'
import Signup from 'pages/Signup'
import HomePage from 'pages/Home'
import Message from 'pages/Message'
import Profile from 'pages/Profile'
import NotFound from 'pages/NotFound'
import MessageRedirect from 'pages/MessageRedirect'
import './App.css'
import Landing from 'pages/Landing'
import Friend from 'pages/Friend'
import NavBar from 'components/NavBar'
import { useAuth, ProvideAuth } from 'hooks/useAuth'
import classNames from 'classnames'
import PrivateRoute from 'components/Router/PrivateRoute'
import PublicRoute from 'components/Router/PublicRoute'
import handleDisconnectInternet from 'NetworkDetector'

function AppIml() {
    const { user } = useAuth()
    return (
        <Router>
            <div className="flex flex-col">
                {user && <NavBar />}
                <div
                    className={classNames('h-screen bg-blue', {
                        'pt-14': user,
                    })}
                >
                    <Switch>
                        <PublicRoute path="/" exact component={HomePage} />
                        <PublicRoute
                            restricted
                            path="/login"
                            component={Login}
                        />
                        <PublicRoute
                            restricted
                            path="/signup"
                            component={Signup}
                        />

                        <PrivateRoute
                            path="/message"
                            exact
                            component={MessageRedirect}
                        />
                        <PrivateRoute path="/message/t/" component={Message} />
                        <PrivateRoute path="/profile" component={Profile} />
                        <PrivateRoute path="/friend" component={Friend} />
                        <Route path="/landing" component={Landing} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

function App() {
    return (
        <ProvideAuth>
            <AppIml />
        </ProvideAuth>
    )
}

export default handleDisconnectInternet(App)
