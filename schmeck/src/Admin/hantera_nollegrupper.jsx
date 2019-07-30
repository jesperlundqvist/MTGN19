import React, { Component } from "react";
import "./Admin.css"
import Frack from "./../Frack";

class HanteraNollegrupp extends Component {
    state = {
        n0llegroup: []
    };

    componentDidMount() {
        Frack.N0lleGroup.GetAll().then(res => {
            console.log("n0llegroups: ", res.data)
            this.setState({ n0llegroup: res.data });
        });
    }

    newN0lleGroup(event) {
        event.preventDefault()
        var name = event.target.name.value;

        Frack.N0lleGroup.New({ name: name }).then(function (res) {
            //$("#new_alert_success").show();
            //$("#new_alert_success").text("Skapade ny nØllegrupp!");
            console.log("Created group")

           // var id = res.data.group_id;

            /*$("#n0llegroup_list").append(`
    
                <li class="list-group-item" id="n0llegroup_${id}">
                    <div class="d-flex w-100 justify-content-between">
                        <label for="input_name_${id}" class="inline_n0llegroup_edit_label">Namn: </label>
                        <input type="text" id="input_name_${id}" class="inline_n0llegroup_edit_input" value="${name}" />
                    </div>
                    <br />
                    <div class="d-flex w-100 justify-content-between">
                        <button type="button" class="btn btn-primary btn-sm" onclick="saveN0lleGroup(${id});">Spara</button>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="removeN0lleGroup(${id});">Ta bort</button>
                    </div>
                    <div id="input_alert_success_${id}" class="alert alert-success" role="alert" style="margin-top: 5px;display:none;"></div>
                </li>
    
                `);*/
        });
    }

    saveN0lleGroup(event) {
        event.preventDefault()
        console.log("Save group with id: ", event.target.name.id)
        var id = event.target.name.id;
        var data = {
            name: event.target.name.value
        };

       Frack.N0lleGroup.Update(id, data).then(function (res) {
            //$("#input_alert_success_" + id).show();
            //$("#input_alert_success_" + id).text("Ändringar är sparade!");
            console.log("Ändringar är sparade!")
        });
    }

    removeN0lleGroup(id) {
        console.log("Removing group with id: ", id)
        Frack.N0lleGroup.Delete(id).then(function (res) {
            console.log("Removed group!")
        });
        /* if (confirm("Är du säker på att du vill ta bort nØllegruppen? Alla användare i gruppen kommer att tappa sin grupp!")) {
             Frack.N0lleGroup.Delete(id).then(function (res) {
                 $("#n0llegroup_" + id).remove();
             });
         }*/
    }


    render() {

        var handle_groups = <div>
            <ul class="list-group" id="n0llegroup_list">
                {this.state.n0llegroup.map((group) => {
                    return (
                        <form onSubmit={this.saveN0lleGroup} key={group.id} >
                            <li class="list-group-item" id="n0llegroup_{{id}}">
                                <div class="d-flex w-100 justify-content-between">
                                    <label className="form_label" >Namn: </label>
                                    <input type="text" name="name" id={group.id} defaultValue={group.name} />
                                </div>
                                <br />
                                <div class="d-flex w-100 justify-content-between">
                                    <input type="submit" class="btn btn-primary btn-sm" value="Spara" />
                                    <button type="button" class="btn btn-secondary btn-sm" onClick={() => this.removeN0lleGroup(group.id)}>Ta bort</button>
                                </div>
                            </li>
                        </form>)
                })}
            </ul>
            <br />
            <h1 className="view_header">Skapa n0llegrupp</h1>
            <h4 className="form_label">Ny nØllegrupp</h4>
            <form class="form-control" onSubmit={this.newN0lleGroup}>
                <label className="form_label">Namn: </label>
                <input type="text" name="name" class="form-control" />
                <br />
                <input type="submit" class="btn btn-primary" value="Skapa"/>
            </form>
        </div>

        return (
            <div className="page">
                <h1 className="view_header">Hantera n0llegrupper</h1>
                {handle_groups}
            </div>
        );
    }
}

export default HanteraNollegrupp;
