import os
from sqlalchemy import desc, asc
from app.models.image import Image
from app.models.video import Video
from app import db
from PIL import Image as Img
import uuid

UPLOAD_FOLDER = os.path.join(os.getcwd(),"static","media")

def upload_media(request):
    latest_files = request.files.getlist("files")
    name = request.form.get("uploadedby")
    event = request.form.get("event")
    week = request.form.get("week")
    if latest_files is not None:
        for uploaded_file in latest_files:
            original_filename, extension = os.path.splitext(uploaded_file.filename)

            # Spara orginalet
            filename = str(uuid.uuid4()) + extension ## Generera ett unikt filnamn så att det inte blir krockar
            path = os.path.join("static", "images", "profiles", filename)
            local_path = os.path.join(os.getcwd(), path)
            uploaded_file.save(local_path)

            # Skapa en thumbnail
            thumb = Img.open(local_path)
            filename_thumb = str(uuid.uuid4()) + extension

            path_thumb = os.path.join("static", "images", "profiles", filename_thumb)
            local_path_thumb = os.path.join(os.getcwd(), path_thumb)

            thumb.thumbnail([400, 400])
            thumb.save(local_path_thumb)

            new_img = Image(filename = path, uploaded_by = name,event = event, week = week, thumbnail = path_thumb)
            db.session.add(new_img)

    latest_videos = request.form.getlist("videos")
    if latest_videos is not None:
        for video in latest_videos:
            embed_link, thumbnail = handle_video(video)
            new_vid = Video(video_link = embed_link, uploaded_by = name,
            event = event,
            week = week,
            thumbnail = thumbnail)
            db.session.add(new_vid)


    db.session.commit()
    return True

def get_media(week_filter = None, event_filter = None, media_type = None, uploaded_by = None):
    output = []
    if media_type is None or media_type == "image":
        image_query = Image.query.filter()

        if week_filter is not None:
            image_query = image_query.filter(Image.week == week_filter)
        if event_filter is not None:
            image_query = image_query.filter(Image.event == event_filter)
        if uploaded_by is not None:
            image_query = image_query.filter(Image.uploaded_by == uploaded_by)
        image_query = image_query.all()
        for result in image_query:
            res_dict = result.as_dictionary()
            res_dict["type"] = "image"
            output.append(res_dict)

    if media_type is None or media_type == "video":
        video_query = Video.query.filter()

        if week_filter is not None:
            video_query = video_query.filter(Video.week == week_filter)
        if event_filter is not None:
            video_query = video_query.filter(Video.event == event_filter)
        if uploaded_by is not None:
            video_query = video_query.filter(Video.uploaded_by == uploaded_by)
        video_query = video_query.all()
        for video_result in video_query:
            res_dict = video_result.as_dictionary()
            res_dict["type"] = "video"
            output.append(res_dict)

    return output

def delete_media(request):
    imgs_to_delete = request.json["images"]
    vids_to_delete = request.json["videos"]

    if len(imgs_to_delete) is not 0:
        id_list = []
        for image in imgs_to_delete:
            id_list.append(image["id"])
        print(id_list)

        q = Image.query.filter()
        q = q.filter(Image.id.in_(id_list)).all()
        for resp in q:
            db.session.delete(resp)
        db.session.commit()

    if len(vids_to_delete) is not 0:
        video_id_list = []
        for video in vids_to_delete:
            video_id_list.append(video["id"])

        v = Video.query.filter()
        v = v.filter(Video.id.in_(video_id_list)).all()
        for resp in v:
            db.session.delete(resp)
        db.session.commit()

def generate_thumbnail(filename):
    im = Img.open(os.path.join(UPLOAD_FOLDER, filename))
    #aspect_ratio = im.shape[1] / im.shape[0]

    size = (200, 200) # thumbnail-storleken
    filename = filename.split(".")[0]
    outfile = os.path.splitext(im.filename)[0]
    try:
        im = im.resize(size)
        im.save(outfile + "_thumb.jpg", "JPEG")
    except IOError:
        print("en liten fucky wucky")

    return filename + "_thumb.jpg"

def get_weeks():
    output = []
    q1 = db.session.query(Image.week)
    q2 = db.session.query(Video.week)
    q3 = q1.union(q2)
    for value in q3.distinct():
        output.append(value[0])
    return output

def get_events():
    output = []
    q1 = db.session.query(Image.event)
    q2 = db.session.query(Video.event)
    q3 = q1.union(q2)
    for value in q3.distinct():
        output.append(value[0])
    return output

def handle_video(video_link):
    video_id = video_link.split("v=")[1]
    print(video_id)
    embed_link = "youtube.com/embed/" + video_id
    thumbnail = "http://img.youtube.com/vi/" + video_id + "/maxresdefault.jpg"

    return embed_link, thumbnail
