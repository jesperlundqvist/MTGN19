from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app import db

class Image(db.Model):
    id = Column(Integer, primary_key=True)
    filename = Column(String(512))
    thumbnail = Column(String(512))
    week = Column(Integer)

    event_id = Column(Integer, ForeignKey('event.id'))
    event = relationship("Event", back_populates="images")

    def as_dictionary(self):
        image_dict = {
            "id" : self.id,
            "filename":self.filename,
            "thumbnail": self.thumbnail,
            "week": self.week,
            "event": self.event.to_dict()
        }

        return image_dict
