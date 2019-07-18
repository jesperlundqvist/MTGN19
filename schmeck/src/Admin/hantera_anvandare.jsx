import React, { Component } from "react";
import Frack from "./../Frack";
import axios from "axios";
import "./Admin.css"
class Anvandare extends Component {
    state = {
        types: [],
        n0llegroup: [],
        users: [],
        currentUser: "",
    };

    update_user = "";
    password = "lösenord1";

    /*componentWillUpdate = () => {
        
    }*/

    componentDidMount = () => {

        Frack.UserType.GetAll().then(res => {
            console.log("usertypes: ", res.data)
            this.setState({ types: res.data });
        });
        Frack.N0lleGroup.GetAll().then(res => {
            console.log("n0llegroups: ", res.data)
            this.setState({ n0llegroup: res.data });
        });

        Frack.User.GetAll().then(res => {
            console.log("Users: ", res.data)
            this.setState({ users: res.data });
        });


    }

    componentDidUpdate = () => {
        console.log("Kör component did update")
        this.handle_usersHTML()
    }

    /*changeHandler(e) {
        
        console.log(e.target.id, ": ", e.target.value)
        //this.setState({ });
    }*/

    submitNewUser = (e) => {
        e.preventDefault()
        let name = e.target.username.value
        console.log(e.target.usertype.value)
        if (e.target.n0llegroup.value == '-1' && e.target.usertype.value == 1) {
            alert("n0llan tillhör ingen n0llegrupp och n0llan är vilsen utan den!")
        }
        else {

            if (e.target.usertype.value == "1") {
                name += "-nØllan";
            }

            console.log("Username: ", name.toLowerCase())
            console.log("Usertype: ", e.target.usertype.value)
            console.log("n0llegroup: ", e.target.n0llegroup.value)
            var Password = "lösenord1"; //Ska detta göras om?
            var data = {
                name: name,
                username: name.toLowerCase(),
                password: Password,
                type_id: e.target.usertype.value
            };
            if (e.target.n0llegroup.value != -1) {
                data["n0llegroup_id"] = e.target.n0llegroup.value;
            }
            Frack.User.New(data).then((res) => {
                alert("Skapat ny användare. ", res.data);
                Frack.User.GetAll().then(res => {
                    console.log("Users: ", res.data)
                    this.setState({ users: res.data });
                })

            })
        }
    }


    saveAllUsers = () => {
        console.log("SaveAllUsers")
        this.state.users.map((user) => {
            this.saveUser(user)
        })
    }

    saveUser = (user) => {
        user.preventDefault();
        var id = user.target.username.id
        console.log("n0llegrupp: ", user.target.n0llegrupp.value)
        var data = {
            username: user.target.username.value,
            name: user.target.name.value,
            type_id: user.target.type.value,
            admin: user.target.admin.checked,
            hidden: user.target.hidden.checked,
        };
        if (user.target.n0llegrupp.value != '-1') {
            data["n0llegroup_id"] = user.target.n0llegrupp.value;
        }
        else {
            if (user.target.type.value == 1) {
                alert("OBS! n0llan tillhör ingen n0llegrupp!")
            }
        }

        var profilePicutureRequest = [];

        if (user.target.file.value.length > 0) {
            var file = user.target.file.files[0];
            var formData = new FormData();
            formData.append("image", file);

            profilePicutureRequest.push(axios({
                method: "post",
                url: "http://localhost:5000/api/upload_profile_picture/" + user.target.username.value,
                data: formData,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            }).catch(function (error) {
                console.error(error);
            }));
        }

        axios.all(profilePicutureRequest).then((responses) => {
            if (responses.length > 0) {
                //$("#input_picture_" + id).val("");
                //data["profile_picture"] = responses[0].data.url;
                console.log(responses)
            }

            Frack.User.Update(id, data).then((res) => {
                alert("Ändringar sparade!")
                //$("#input_alert_success_" + id).show();
                //$("#input_alert_success_" + id).text("Ändringar är sparade!");

                Frack.User.GetAll().then(res => {
                    console.log("Users: ", res.data)
                    this.setState({ users: res.data });
                })
            });
        })

    }

    removeUser = (id) => {
        Frack.User.Delete(id).then((res) => {
            alert("User was successfully deleted")
            Frack.User.GetAll().then(res => {
                console.log("Users: ", res.data)
                this.setState({ users: res.data });
            })
        })

        /* }*/
    }

    userResetPassword = (id) => {
        //let id = e.target.value;
        var newPassword = "lösenord1"; //Ska detta göras om?

        Frack.User.Update(id, { password: newPassword }).then(function (res) {
            /*$("#input_alert_success_" + id).show();
            $("#input_alert_success_" + id).text("Nytt lösenord är \"" + newPassword + "\"!");*/
        });
    }

    handle_usersHTML = () => {
        //Form(HTML) för att uppdatera användare
        this.update_user =
            <div className="admin_block">
                <h1 className="view_header">Hantera användare</h1>
                <div className="admin_container" id="user_list">

                    {this.state.users.map((user) => {
                        return (
                            <div className="user_block">
                                <img className="prof_pic_admin" src={user.profile_picture} alt="" />
                                <form onSubmit={this.saveUser} >
                                    <div className="" id={user.id} key={user.id} className="user_grid">


                                        <label className="form_label">Användarnamn: </label>
                                        <input type="text" name="username" id={`${user.id}`}  defaultValue={user.username} onBlur={this.changeHandler} />

                                        <label className="form_label">Namn: </label>
                                        <input type="text" id={`input_name${user.id}`} name="name"  defaultValue={user.name} onBlur={this.changeHandler} />

                                        <label className="form_label">Typ: </label>
                                        <select name="type" id={`input_type_${user.id}`} defaultValue={user.type.id}>
                                            {this.state.types.map((type) => {
                                                return (<option key={type.id} value={type.id}>{type.name}</option>)
                                            })}
                                        </select>

                                        <label className="form_label">nØllegrupp: </label>

                                        <select name="n0llegrupp" id={`input_n0llegroup_${user.id}`} defaultValue={(user.n0llegroup) ? (user.n0llegroup.id) : "-1"}>
                                            <option value="-1">Ingen</option>
                                            {this.state.n0llegroup.map((group) => {
                                                return (<option key={group.id} value={group.id}>{group.name}</option>)
                                            })}
                                        </select>

                                        <label className="form_label">Admin: </label>
                                        <input name="admin" id={`input_admin_${user.id}`} type="checkbox" defaultChecked={user.admin} />

                                        <label className="form_label">Dold: </label>
                                        <input name="hidden" id={`input_hidden_${user.id}`} type="checkbox" defaultChecked={user.hidden} />

                                        <label className="form_label">Ny profilbild: </label>

                                        <input name="file" type="file" id={`input_picture_${user.id}`} />




                                        <br />
                                        <div className="buttons">
                                            <input type="submit" value="Spara" />
                                            <button type="button" className="btn btn-secondary btn-sm" onClick={() => this.userResetPassword(user.id)}>Återställ lösenord</button>
                                            <button type="button" className="btn btn-secondary btn-sm" value={user.id} onClick={() => this.removeUser(user.id)}>Ta bort</button>
                                        </div></div>
                                </form>
                            </div>
                        )
                    })
                    }
                </div>
            </div>
    }

    render() {
        this.handle_usersHTML()
        //Form(HTML) för att skapa användare
        var create_user = <div className="admin_block">
            <h1 className="view_header">Skapa användare</h1>
            <form className="form-group user_block" onSubmit={this.submitNewUser}>
                <label className="form_label">Namn: </label>
                <input type="text" className="form-control" placeholder="Namn" name="username" />
                <label className="form_label">Användartyp: </label>
                <select className="form-control" name="usertype">

                    {this.state.types.map((type) => {
                        return (<option key={type.id} value={type.id}>{type.name}</option>)
                    })}

                </select>
                <label className="form_label">nØllegrupp: </label>
                <select className="form-control" name="n0llegroup">
                    <option value="-1">Ingen</option>
                    {this.state.n0llegroup.map((group) => {
                        return (<option key={group.id} value={group.id}>{group.name}</option>)
                    })}

                </select>
                <br/>
                <input type="submit" className="buttons" value="Skapa ny användare" />
            </form>
        </div>



        return (
            <div className="page">
                {create_user}
                {this.update_user}
            </div>
        );
    }
}

export default Anvandare;
