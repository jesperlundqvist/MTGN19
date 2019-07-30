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
        console.log(e.target.files.files)
        // funktion för uppladning av bilder till servern

        var files = e.target.files.files;
        var week = e.target.week.value // veckan bilden togs
        var event = e.target.event.value // eventet bilden togs under
        var links = e.target.videos.value;
        var linkList = links.split(",");
        linkList = linkList.filter(v => v !== "");
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
            console.log(res)
            alert("Media was successfully uploaded")
        })

        console.log("Uppladdning klart!")

    };



    newType = (event) => {
        event.preventDefault()

        var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        var name = event.target.name.value
        var date = event.target.date.value
        let timestamp = new Date(Date.parse(date));
        timestamp = timestamp.toLocaleDateString('sv-SV', options)

        console.log(timestamp)
        Frack.Event.New({ name: name, datetime: timestamp }).then((res) => {
            alert("Skapade nytt event " + name)

            var id = res.data.event_id;

        });
    }
    saveType = (event) => {
        event.preventDefault()
        var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
        
        
        var name = event.target.name.value
        var date = event.target.date.value
        var id = event.target.id;

        let timestamp = new Date(Date.parse(date));
        timestamp = timestamp.toLocaleDateString('sv-SV', options)
        console.log("Timestamp: ", timestamp)
        console.log("Date: ", date)

        var data = {
            name: name,
            datetime: timestamp
        };

       Frack.Event.Update(id, data).then((res) => {
           console.log(res)
           alert("Ändringar sparade!")
        });
    }
    /*
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
                    console.log("event id: ", event.id)

                    var options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric' }
                    var date = event.datetime
                    console.log(event.datetime)
                    let timestamp = new Date(Date.parse(date));
                    timestamp = timestamp.toLocaleDateString('sv-SV', options)
                    console.log(timestamp)

                    return (
                        <form onSubmit={this.saveType} key={event.id} id={event.id}>

                            <label className="form_label" >Namn: </label>
                            <input type="text" name="name" defaultValue={event.name} />

                            <label className="form_label">Datum/tid: </label>
                            <input type="text" name="date" defaultValue={timestamp} />

                            <input type="submit" value="Spara" />
                            <button type="button" onClick="removeType({{id}});">Ta bort</button>

                        </form>
                    )
                })}
            </ul>
            <h2 className="view_header" >Nytt event</h2>
            <form className="form-control" onSubmit={this.newType}>
                <label className="form_label">Namn: </label>
                <input type="text" name="name" className="form-control" />

                <label className="form_label">Datum/tid: </label>
                <input type="datetime-local" name="date" className="form-control" />

                <input type="submit" value="Skapa" />
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
