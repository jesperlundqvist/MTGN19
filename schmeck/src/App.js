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
import Anvandare from './Admin/hantera_anvandare'
import Anvandartyper from './Admin/hantera_anvandartyper'
import HanteraBlandaren from './Admin/hantera_blandaren'
import HanteraMedia from './Admin/hantera_media'
import Inlagg from './Admin/inlagg'
import HanteraNollegrupp from './Admin/hantera_nollegrupper'
import HanteraInlagg from './Admin/hantera_inlagg';

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

          <ProtectedRoute path="/admin/anvandare" exact component={Anvandare} />
          <ProtectedRoute path="/admin/anvandartyper" exact component={Anvandartyper} />
          <ProtectedRoute path="/admin/blandaren" exact component={HanteraBlandaren} />
          <ProtectedRoute path="/admin/media" exact component={HanteraMedia} />
          <ProtectedRoute path="/admin/inlagg" exact component={Inlagg} />
          <ProtectedRoute path="/admin/inlagg/update/:id" exact component={Inlagg} />
          <ProtectedRoute path="/admin/inlagg/hantera" exact component={HanteraInlagg} />
          <ProtectedRoute path="/admin/n0llegrupper" exact component={HanteraNollegrupp} />

          <Route path="/login" component={Login} />
          <Route path="*" render={() => <h1>Page not found</h1>}/>
        </Switch>
        <Route path="/" component={Footer} />
      </Router>
    </div>
  );
}

export default App;
