from sqlalchemy import Column, Integer, String
from app import app, db

class Video(db.Model):
    id = Column(Integer, primary_key = True)
    uploaded_by = Column(String(64))
    event = Column(String(256))
    week = Column(Integer)
    thumbnail = Column(String(256))

    def as_dictionary():
        vid_dict = {
            "id": self.id,
            "event": self.event,
            "week":self.week,
            "thumbnail":self.thumbnail
        }

        return vid_dict