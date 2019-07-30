import React, { Component } from "react";
import ProfileButton from "./ProfileButton";
import Frack from "./../Frack";
import "./Profiles.css";

class Profiles extends Component {
  state = { profiles: [] };

  componentDidMount() {
    //window.scrollTo(0, 0);
    Frack.User.GetAll().then(res => {
      console.log(res);
      const profiles = res.data;
      profiles.sort((a, b) => this.sortUsers(a,b))
      this.setState({ profiles: profiles});
    }).catch((errer) => {
      Frack.Logout();
      this.props.history.push('/login');
    });;
  }

  clickHandeler = (index, userName) => {
    console.log(index)
    this.props.history.push({pathname:`/profiler/${userName}`, state:{profiles:this.state.profiles, index:index}});
  };

  sortUsers = (a, b) => {
    const group = ['nØllan', 'KPH','INPHO','ARR','LEK', 'ÖPH', 'VRAQUE', 'RSA']
    if (a.hidden !== b.hidden) {
      return( a.hidden - b.hidden)
    }
    if (group.indexOf(a.type.name) !== group.indexOf(b.type.name)) {
      return (group.indexOf(a.type.name) - group.indexOf(b.type.name))
    }
    if (a.n0llegroup && b.n0llegroup) {
      if (a.n0llegroup.name !== b.n0llegroup.name) {
        return(a.n0llegroup.name - b.n0llegroup.name)
      }
    }
    return 0;
  }

  render() {
    //console.log(this.state.types)
    const { profiles } = this.state;
    if (profiles.length === 1) {
      return null
    }
    
    console.log(profiles)
    return (
      <div className='page'>
        <h1 className='view_header'>Profiles</h1>
        <div className='profiles-contaner'>
          {profiles.map((profile, i) => {
            if (!profile.hidden) {
              if (i === 0) {
                return (<React.Fragment key={i}>
                  {(profile.type.name ==='nØllan') ? <h2 className="media-divider">{`${profile.n0llegroup.name}`}</h2> : <h2 className="media-divider">{`${profile.type.name}`}</h2>}
                  <ProfileButton key={profile.id} index={i} name={profile.name} userName={profile.username} userImg={profile.profile_picture} clickHandeler={this.clickHandeler} />
                </React.Fragment>)
              } 
              console.log(profiles[i-1].type.name, profile.type.name)
              if (profiles[i-1].type.name !== profile.type.name || (profile.type.name ==='nØllan' && profiles[i-1].n0llegroup.name !== profile.n0llegroup.name)) {
                return (<React.Fragment key={i}>
                  {(profile.type.name ==='nØllan') ? <h2 className="media-divider">{`${profile.n0llegroup.name}`}</h2> : <h2 className="media-divider">{`${profile.type.name}`}</h2>}
                  <ProfileButton key={profile.id} index={i} name={profile.name} userName={profile.username} userImg={profile.profile_picture} clickHandeler={this.clickHandeler} />
                </React.Fragment>)
              }
              return (<ProfileButton key={profile.id} index={i} name={profile.name} userName={profile.username} userImg={profile.profile_picture} clickHandeler={this.clickHandeler} />);
            }
            if (profiles[i-1].type.name !== profile.type.name || (profile.type.name ==='nØllan' && profiles[i-1].n0llegroup.name !== profile.n0llegroup.name)) {
              return (<React.Fragment key={i}>
                {(profile.type.name ==='nØllan') ? <h2 className="media-divider">{`${profile.n0llegroup.name}`}</h2> : <h2 className="media-divider">{`${profile.type.name}`}</h2>}
              </React.Fragment>)
            }
            return null;

          })}
        </div>
      </div>
    );
  }
}

export default Profiles;
