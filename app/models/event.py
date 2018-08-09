from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from app import db

class Event(db.Model):
    __tablename__ = "event"
    id = Column(Integer, primary_key=True)
    name = Column(String(64), unique=True)
    datetime = Column(DateTime())

    images = relationship("Image", back_populates="event")
    videos = relationship("Video", back_populates="event")

    def __init__(self, name, datetime):
        self.name = name
        self.datetime = datetime

    def to_dict(self):
        type = {}
        type["id"] = self.id
        type["name"] = self.name
        type["datetime"] = self.datetime
        return type
