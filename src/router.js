import React, {Component} from 'react';
import './App.css';
import {HashRouter, Route, Switch, Redirect,BrowserRouter} from 'react-router-dom';
import App from './App';
import Login from './pages/login';
import Admin from './admin';
import Home from './pages/home';
import Permission from './pages/permissions';
import WebUserManage from './pages/usermanage/webusermanage';
import BackPlatform from './pages/usermanage/backplatform';
import BasicTable from './pages/table/basicTable'

class Router extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/home" component={Home}/>
                                    <Route path="/permission" component={Permission}/>
                                    <Route path="/usermanage/webuserManage" component={WebUserManage}/>
                                    <Route path="/usermanage/backplatform" component={BackPlatform}/>
                                    <Route path="/table/basic" component={BasicTable}/>
                                    {/* <Route component={NoMatch} /> */}
                                </Switch>
                            </Admin>
                        }/>
                    </Switch>
                </App>
            </BrowserRouter>
        );
    }
}

export default Router;
