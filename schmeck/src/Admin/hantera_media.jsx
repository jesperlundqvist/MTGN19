import React, { Component } from "react";
import Frack from "./../Frack";
import "./Admin.css"
class HanteraMedia extends Component {
    state = {
        events: []
    };

    componentDidMount() {
        Frack.Event.GetAll().then(res => {
            console.log("events: ", res.data)
            this.setState({ events: res.data });
        });
    }

    uploadMedia = (e) => {
        e.preventDefault();
        console.log(e.target.files.files.length)
        // funktion för uppladning av bilder till servern
        var outputData = [];

        var files = e.target.files.files;
        var week = e.target.week.value // veckan bilden togs
        var event = e.target.event.value // eventet bilden togs under
        var links = e.target.videos.value;
        var linkList = links.split(",");
        linkList = linkList.filter(v => v != "");
        var form_data = new FormData();

        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            form_data.append("files", file, file.name)
        }
        form_data.append("week", week);
        form_data.append("event", event);


        for (var j = 0; j < linkList.length; j++) {
            var link = linkList[j];
            form_data.append("videos", link);
        }

        Frack.Media.New(form_data).then((res) => {
            alert("Media was successfully uploaded")
        })

        console.log("Uppladdning klart!")

        /*$.ajax({
            url: "/api/media/",
            type: "POST",
            data: form_data,
            contentType: false,
            processData: false,
            success: function () {
                window.location.href = "/media";
            }
        })*/
    };


        /*
        function newType() {
        var name = $("#new_type_name").val();
        var date = $("#new_type_date").val();

        Frack.Event.New({name: name, datetime: date}).then(function (res) {
            $("#new_alert_success").show();
            $("#new_alert_success").text("Skapade nytt event!");

            var id = res.data.event_id;

            $("#type_list").append(`

                <li class="list-group-item" id="type_${id}">
                    <div class="d-flex w-100 justify-content-between">
                        <label for="input_name_${id}" class="inline_type_edit_label">Namn: </label>
                        <input type="text" id="input_name_${id}" class="inline_type_edit_input" value="${name}" />
                    </div>
                    <div class="d-flex w-100 justify-content-between">
                        <label for="input_date_${id}" class="inline_type_edit_label">Datum/tid: </label>
                        <input type="text" id="input_date_${id}" class="inline_type_edit_input" value="${date}" />
                    </div>
                    <br />
                    <div class="d-flex w-100 justify-content-between">
                        <button type="button" class="btn btn-primary btn-sm" onclick="saveType(${id});">Spara</button>
                        <button type="button" class="btn btn-secondary btn-sm" onclick="removeType(${id});">Ta bort</button>
                    </div>
                    <div id="input_alert_success_${id}" class="alert alert-success" role="alert" style="margin-top: 5px;display:none;"></div>
                </li>

                `);
        });
    }

    function saveType(id) {
        var data = {
            name: $("#input_name_" + id).val(),
            datetime: $("#input_date_" + id).val()
        };

        Frack.Event.Update(id, data).then(function (res) {
            $("#input_alert_success_" + id).show();
            $("#input_alert_success_" + id).text("Ändringar är sparade!");
        });
    }

    function removeType(id) {
        if (confirm("Är du säker på att du vill ta bort eventet? Ifall det finns bilder/videor kvar på detta event så kan saker gå sönder."))
        {
            Frack.Event.Delete(id).then(function(res) {
                $("#type_" + id).remove();
            });
        }
    }
*/

    render() {

        var events = <div>
            <ul class="list-group" id="type_list">
                {this.state.events.map((event) => {
                    var mnths = {
                        Jan: "01",
                        Feb: "02",
                        Mar: "03",
                        Apr: "04",
                        May: "05",
                        Jun: "06",
                        Jul: "07",
                        Aug: "08",
                        Sep: "09",
                        Oct: "10",
                        Nov: "11",
                        Dec: "12"
                    },
                        date = event.datetime.split(" ");

                    var str = [date[3], mnths[date[2]], date[1]].join("-");
                    console.log(date)
                    console.log(str)

                    return (
                        <form onSubmit="saveType({{id}});">

                            <label className="form_label" key={event.id}>Namn: </label>
                            <input type="text" name="name" defaultValue={event.name} />

                            <label className="form_label">Datum/tid: </label>
                            <input type="text" name="date" defaultValue={event.datetime} />

                            <input type="submit" value="Spara" />
                            <button type="button" onClick="removeType({{id}});">Ta bort</button>

                        </form>
                    )
                })}
            </ul>
            <h2 className="view_header">Nytt event</h2>
            <form class="form-control">
                <label className="form_label">Namn: </label>
                <input type="text" id="new_type_name" class="form-control" />

                <label className="form_label">Datum/tid: </label>
                <input type="datetime-local" id="new_type_date" class="form-control" />

                <input type="submit" class="btn btn-primary" onclick="event.preventDefault(); newType();" value="Skapa" />
            </form>

        </div>

        var media = <div>
            <form onSubmit={this.uploadMedia} className="user_block">
                <label className="form_label">Bilder:</label>
                <input type="file" name="files" multiple />
                <label className="form_label">Videor: (separera med ",")</label>
                <input name="videos" type="text" />
                <label className="form_label">Vecka</label>
                <select name="week">
                    <option value="33">33</option>
                    <option value="34">34</option>
                    <option value="35">35</option>
                    <option value="36">36</option>
                </select>
                <label className="form_label">Event</label>
                <select name="event">
                    {this.state.events.map((event) => {
                        return (<option value={event.id}>{event.name}</option>)
                    })}
                </select>
                <input type="submit" value="Ladda upp" />
            </form>
        </div>

        return (
            <div className="page">
                <h1 className="view_header">Ladda upp bild/video</h1>
                {media}
                <h1 className="view_header">Hantera event</h1>
                {events}


            </div>
        );
    }
}

export default HanteraMedia;
