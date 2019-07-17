import React, { Component } from "react";
import Frack from "./../Frack";
import "./Admin.css"
class Anvandare extends Component {
    state = {
        types: [],
        n0llegroup: [],
        users: [],
        currentUser: "",
    };

    componentDidMount() {
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

    changeHandler(e) {
        
        console.log(e.target.id, ": ", e.target.value)
        //this.setState({ });
    }

    submitNewUser(e) {
        e.preventDefault()
        let name = e.target.username.value



        if (e.target.usertype.value == "1") {
            name += "-nØllan";
        }

        console.log("Username: ", name.toLowerCase())
        console.log("Usertype: ", e.target.usertype.value)
        console.log("n0llegroup: ", e.target.n0llegroup.value)

        var data = {
            name: name,
            username: name.toLowerCase(),
            password: "potatis",
            type_id: e.target.usertype.value
        };
        if (e.target.n0llegroup.value != -1) {
            data["n0llegroup_id"] = e.target.n0llegroup.value;
        }
        Frack.User.New(data).then(function (res) {
            console.log("Skapat ny användare. ", res.data);
            //$("#createdUserAlert").show();
            //$("#createdUserAlert").text("Skapade användare " + username + "!");
            //$("#input_name").val("");
        });
    }


    saveAllUsers() {
        console.log("SaveAllUsers")
        this.state.users.map((user) => {
            this.saveUser(user)
        })
    }

    saveUser(user) {
        console.log("SaveUser: ")
        console.log(user)

        //$("#input_alert_success_" + id).hide();

        /*
        var data = {
            username: user.username,
            name: user.name,
            type_id: ,
            admin: $("#input_admin_" + id).is(':checked'),
            hidden: $("#input_hidden_" + id).is(':checked')
        };

        if ($("#input_n0llegroup_" + id).val() != -1)
        {
            data["n0llegroup_id"] = $("#input_n0llegroup_" + id).val();
        }
        else
        {
            if ($("#input_type_" + id + " option:selected").text() == "nØllan")
            {
                if (!confirm("nØllan \"" + data.username + "\" har ingen nØllegrupp! Är du säker på att det ska vara så?"))
                {
                    return;
                }
            }
        }

        var profilePicutureRequest = [];

        if ($("#input_picture_" + id).prop('files').length > 0)
        {
            var file = $("#input_picture_" + id).prop('files')[0];
            var formData = new FormData();
            formData.append("image", file);

            profilePicutureRequest.push(axios({
                method: "post",
                url: "/api/upload_profile_picture/" + data.username,
                data: formData,
                auth: {
                    username: sessionStorage.authToken,
                    password: ""
                }
            }).catch(function(error) {
                console.error(error);
            }));
        }

        axios.all(profilePicutureRequest).then(function(responses) {
            if (responses.length > 0) {
                //$("#input_picture_" + id).val("");
                data["profile_picture"] = responses[0].data.url;
            }

            Frack.User.Update(id, data).then(function (res) {
                //$("#input_alert_success_" + id).show();
                //$("#input_alert_success_" + id).text("Ändringar är sparade!");
            });
        });*/
    }

    removeUser(id) {
        console.log("Remove user: ")
        console.log(id)
        //let id = e.target.value;
        /*if (confirm("Är du säker på att du vill ta bort användaren?"))
        {
            Frack.User.Delete(id).then(function(res) {
                /*$("#user_" + id).remove();
            });
        }*/
    }

    userResetPassword(id) {
        console.log("reset password: ")
        console.log(id)
        //let id = e.target.value;
        var newPassword = "lösenord1";

        Frack.User.Update(id, { password: newPassword }).then(function (res) {
            /*$("#input_alert_success_" + id).show();
            $("#input_alert_success_" + id).text("Nytt lösenord är \"" + newPassword + "\"!");*/
        });
    }

    render() {
        //Form(HTML) för att skapa användare
        var create_user = <div className="admin_block">
            <h1 className="view_header">Skapa användare</h1>
            <form className="form-group" onSubmit={this.submitNewUser}>
                <label className="form_label">Namn: </label>
                <input type="text" className="form-control" placeholder="Namn" name="username" />
                <br />
                <label className="form_label">Användartyp: </label>
                <select className="form-control" name="usertype">

                    {this.state.types.map((type) => {
                        return (<option key={type.id} value={type.id}>{type.name}</option>)
                    })}

                </select>
                <br />
                <label className="form_label">nØllegrupp: </label>
                <select className="form-control" name="n0llegroup">
                    <option value="-1">Ingen</option>
                    {this.state.n0llegroup.map((group) => {
                        return (<option key={group.id} value={group.id}>{group.name}</option>)
                    })}

                </select>
                <br />
                <input type="submit" className="btn btn-primary" value="Skapa ny användare" />
            </form>
        </div>

        //Form(HTML) för att uppdatera användare
        var update_user =
            <div className="admin_block">
                <h1 className="view_header">Hantera användare</h1>
                <ul class="list-group" id="user_list">

                    {this.state.users.map((user) => {
                        return (
                            
                                <li class="list-group-item flex-column align-items-start" id={user.id}>
                                    <form onSubmit={() => this.saveUser(user)}>
                                    <div class="d-flex w-100 justify-content-between">
                                        <label class="form_label">Användarnamn: </label>
                                        <input type="text" id={`input_username_${user.id}`} class="inline_user_edit_input" defaultValue={user.username} onBlur={this.changeHandler}/>
                                    </div>
                                    <div class="d-flex w-100 justify-content-between">
                                        <label class="form_label">Namn: </label>
                                        <input type="text" id={`input_name${user.id}`} class="inline_user_edit_input" defaultValue={user.name} onBlur={this.changeHandler}/>
                                    </div>
                                    <div class="d-flex w-100 justify-content-between">
                                        <label class="form_label">Typ: </label>
                                        <select id={`input_type_${user.id}`}>
                                            {this.state.types.map((type) => {
                                                return (<option key={type.id} value={type.id}>{type.name}</option>)
                                            })}
                                        </select>
                                    </div>
                                    <div class="d-flex w-100 justify-content-between">
                                        <label class="form_label">nØllegrupp: </label>
                                        <select id={`input_n0llegroup_${user.id}`}>
                                            <option value="-1">Ingen</option>
                                            {this.state.n0llegroup.map((group) => {
                                                return (<option key={group.id} value={group.id}>{group.name}</option>)
                                            })}
                                        </select>
                                    </div>

                                    <div class="d-flex w-100 justify-content-between">
                                        <label class="form_label">Admin: </label>
                                        <input id={`input_admin_${user.id}`} type="checkbox" />
                                    </div>

                                    <div class="d-flex w-100 justify-content-between">
                                        <label class="form_label">Dold: </label>
                                        <input id={`input_hidden_${user.id}`} type="checkbox" />
                                    </div>

                                    <div>
                                        <label class="form_label">Ny profilbild: </label>
                                        <br />
                                        <input type="file" id={`input_picture_${user.id}`} />
                                    </div>

                                    <br />

                                    <div class="d-flex w-100 justify-content-between">
                                    <input type="submit" class="btn btn-primary btn-sm" value={user.id} onClick={() => this.saveUser(user)}>Spara</input>
                                    <button type="button" class="btn btn-secondary btn-sm" value={user.id} onClick={() => this.userResetPassword(user)}>Återställ lösenord</button>
                                    <button type="button" class="btn btn-secondary btn-sm" value={user.id} onClick={() => this.removeUser(user)}>Ta bort</button>
                                </div>

                                </form>
                                <br />
                                <div id={`input_alert_success_${user.id}`} class="alert alert-success" role="alert" />
                            </li>
                        )
                    })
                    }
                </ul>
                <br />
                <button type="button" class="btn btn-primary" onClick={this.saveAllUsers}>Spara alla ändringar</button>
            </div>

        return (
            <div className="page">
                {create_user}
                {update_user
                }
            </div>
        );
    }
}

export default Anvandare;
