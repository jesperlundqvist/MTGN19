import React from 'react';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import Home from './Home/Home';
import Profiles from './Profiles/Profiles';
import Schedule from './Schedule/Schedule';
import News from './News/News';
import Admin from './Admin/Admin';
import Media from './Media/Media';
import Navigation from './Navigation/Navigation';
import Blandaren from './Blandaren/Blandaren'
import ProtectedRoute from './ProtectedRoute';
import Login from './Login/Login';

function App() {
  console.log(sessionStorage.getItem("authToken"))
  return (
    <div className="App">
      <Router>     
        <Route path="/" component={Navigation} />
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/profiler" exact component={Profiles} />
          <ProtectedRoute path="/profiler/:user" exact component={Profiles} />
          <ProtectedRoute path="/schema" exact component={Schedule} />
          <ProtectedRoute path="/nyheter" exact component={News} />
          <ProtectedRoute path="/admin" exact component={Admin} />
          <ProtectedRoute path="/media" exact component={Media} />
          <ProtectedRoute path="/blandaren" exact component={Blandaren} />
          <Route path="/login" component={Login} />
          <Route path="*" render={() => <h1>Page not found</h1>}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
