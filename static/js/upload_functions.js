

uploadMedia = function () {
    // funktion för uppladning av bilder till servern
    var outputData = [];
    var fileSelect = document.getElementById("files");
    var files = fileSelect.files;
    var week = $("#week").val(); // veckan bilden togs
    var event = $("#event").val(); // eventet bilden togs under
    var links = $("#videos").val();
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

    $.ajax({
        url: "/api/media/",
        type: "POST",
        data: form_data,
        contentType: false,
        processData: false,
        success: function () {
            window.location.href = "/media";
        }
    })
};

uploadDocument = function () {
    var fileSelect = document.getElementById("files");
    var files = fileSelect.files;


    var form_data = new FormData();

    for (var j = 0; j < files.length; j++) {
        var file = files[j];
        form_data.append("files", file, file.name);
    }
    $(".lightbox").css("display", "flex")
    .css("justify-content", "center")
    .css("align-items", "center");

    generateThumbNail(files, form_data)




};
function generateThumbNail(fileList, form_data) {
    PDFJS.workerSrc = "/static/js/pdf.worker.js";
    var pdfWorker = new PDFJS.PDFWorker();
    var DOC_URL = "/static/blandaren/";
    var title = $("#blandar_title").val();
    $(".upload-status").text("Skapar thumbnail..")
    for (var i = 0; i < fileList.length; i++) {
        var docObj = fileList[i];
        var fileReader = new FileReader();
        pdf_file = docObj.filename;
        fileReader.readAsDataURL(docObj)
        fileReader.onload = (event) => {
            var typedArray = new Uint8Array(event.target.result);
            PDFJS.getDocument(event.target.result).then(function (pdf) {
                pdf.getPage(1).then(function (page) {
                    var viewport = page.getViewport(0.5);
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    var renderContext = {
                        canvasContext: ctx,
                        viewport: viewport
                    };
                    page.render(renderContext).promise.then(() => {
                        // Draw behind current content
                        ctx.globalCompositeOperation = "destination-over";
                        // Set background color
                        ctx.fillStyle = "#fff";
                        // Draw on entire canvas
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                        // Create image from canvas
                        var img_src = canvas.toDataURL("image/png");
                        img_src = img_src.split(",")[1];
                        form_data.append("thumbnail", img_src)
                        form_data.append("title", title)
                        $(".upload-status").empty();
                        $(".upload-status").text("Laddar upp..")
                        $.ajax({
                            url: "/api/blandaren",
                            type: "POST",
                            data: form_data,
                            contentType: false,
                            processData: false,
                            success: function () {
                                window.location.href = "/blandaren";
                            }
                        })
                    })
                })
            })
        }
    }


};
