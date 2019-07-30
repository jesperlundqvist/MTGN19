import React, { Component } from "react";
import Frack from "./../Frack";
import "./Admin.css"
class Anvandartyper extends Component {
    state = {
        types: []
    };

    componentDidMount() {
        Frack.UserType.GetAll().then(res => {
            console.log("usertypes: ", res.data)
            this.setState({ types: res.data });
        });
        
    }


    newType = (event) => {
        event.preventDefault()
        console.log("creating new: ", event.target.name.value)
        var name = event.target.name.value;
    
        Frack.UserType.New({name: name}).then(function (res) {
           alert("Skapat ny typ!")
    
           // var id = res.data.type_id;
            

            /*$("#type_list").append(`
    
                <li class="list-group-item" id="type_${id}">
                    <div class="d-flex w-100 justify-content-between">
                        <label for="input_name_${id}" class="inline_type_edit_label">Namn: </label>
                        <input type="text" id="input_name_${id}" class="inline_type_edit_input" value="${name}" />
                    </div>
                    <br />
                    <div class="d-flex w-100 justify-content-between">
                        <button type="button" class="btn btn-primary btn-sm" onclick="saveType(${id});">Spara</button>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="removeType(${id});">Ta bort</button>
                    </div>
                    <div id="input_alert_success_${id}" class="alert alert-success" role="alert" style="margin-top: 5px;display:none;"></div>
                </li>
    
                `);*/
        });
    }
    
    saveType = (event) => {
        event.preventDefault()
        console.log("saving: ", event.target.name.id)
        var id= event.target.name.id;
        var data = {
            name: event.target.name.value
        };
    
        Frack.UserType.Update(id, data).then(function (res) {
            alert("Ändringar sparade!")
        });
    }
    
    removeType = (id) => {
        console.log("removing: ", id)
        Frack.UserType.Delete(id).then(function(res) {
            alert("Removed a type!")
        });
       /* if (confirm("Är du säker på att du vill ta bort användartypen? Kom ihåg att alla användare måste ha en användartyp! Ifall det finns användare kvar med denna typ så kan saker gå sönder."))
        {
            Frack.UserType.Delete(id).then(function(res) {
                $("#type_" + id).remove();
            });
        }*/
    }

    render() {

        var hantera_typer = <div>
            <ul className="list-group" id="type_list">
                
                {this.state.types.map((type) => {
                    return (
                        <form onSubmit={this.saveType} key={type.id}>
                            <li className="list-group-item" id="type_{{id}}">
                                <div className="d-flex w-100 justify-content-between">
                                    <label className="form_label">Namn: </label>
                                    <input type="text" name="name" id={type.id} className="inline_type_edit_input" defaultValue={type.name} />
                                </div>
                                <br />
                                <div className="d-flex w-100 justify-content-between">
                                    <input type="submit" className="btn btn-primary btn-sm" value="Spara"/>
                                    <button type="button" className="btn btn-secondary btn-sm" onClick={()=>this.removeType(type.id)}>Ta bort</button>
                                </div>
                            </li>
                        </form>
                    )
                })}

            </ul>
            <br />
            <h1 className="view_header">Skapa användartyper</h1>
            <h4 className="form_label">Ny användartyp</h4>
            <form className="form-control" onSubmit={this.newType}>
                <label className="form_label">Namn: </label>
                <input type="text" name="name" id="new_type_name" className="form-control" />
                <br />
                <input type="submit" className="btn btn-primary" value="Skapa" />
            </form>
        </div>
        return (
            <div className="page">
                
                <h1 className="view_header">Hantera användartyper</h1>
                
                {hantera_typer}
            </div>
        );
    }
}

export default Anvandartyper;
