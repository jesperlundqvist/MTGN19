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
import Footer from './Footer/Footer';
import Profile from './Profile/Profile'
import Frack from './Frack';

function App() {
  console.log("hej")
  Frack.UpdateCurrentUser().catch((res) =>  {Frack.Logout();})
  return (
    <div className="App">
      <Router>     
        <Route path="/" component={Navigation} />  
        <Switch>
          <ProtectedRoute path="/" exact component={Home} />
          <ProtectedRoute path="/profiler/:user" exact component={Profile} />
          <ProtectedRoute path="/profiler" exact component={Profiles} />
          <ProtectedRoute path="/schema" exact component={Schedule} />
          <ProtectedRoute path="/nyheter" exact component={News} />
          <ProtectedRoute path="/admin" exact adminOnly={true} component={Admin} />
          <ProtectedRoute path="/media" exact component={Media} />
          <ProtectedRoute path="/blandaren" exact component={Blandaren} />
          <Route path="/login" component={Login} />
          <Route path="*" render={() => <h1>Page not found</h1>}/>
        </Switch>
        <Route path="/" component={Footer} />
      </Router>
    </div>
  );
}

export default App;
