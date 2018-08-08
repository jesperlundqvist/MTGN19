from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app import db

class Video(db.Model):
    id = Column(Integer, primary_key=True)
    video_link = Column(String(512))
    thumbnail = Column(String(512))
    week = Column(Integer)

    event_id = Column(Integer, ForeignKey('event.id'))
    event = relationship("Event", back_populates="videos")

    def as_dictionary(self):
        vid_dict = {
            "id": self.id,
            "video_link": self.video_link,
            "event": self.event.to_dict(),
            "week":self.week,
            "thumbnail":self.thumbnail
        }

        return vid_dict
