from sqlalchemy import Column, Integer, String
from app import app, db

class Document(db.Model):
    id = Column(Integer, primary_key = True)
    filename = Column(String(64))
    thumbnail = Column(String(256))
    title = Column(String(256))

    def as_dictionary(self):
        doc_dict = {
            "id": self.id,
            "filename":self.filename,
            "thumbnail":self.thumbnail,
            "title": self.title
        }
        return doc_dict