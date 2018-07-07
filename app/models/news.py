from app import db
from app.models.user import User
from sqlalchemy.orm import relationship
import datetime

class News(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    author_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    author = relationship("User")
    headline = db.Column(db.Text)
    text = db.Column(db.Text)
    tags = db.Column(db.String(64))
    timestamp = db.Column(db.DateTime(), default=datetime.datetime.utcnow)

    def __repr__(self):
        return '<Nyhet skriven av {}>'.format(self.author)

    def as_dictionary(self):
        news_dict = {
            "id" : self.id,
            "author" : self.author.to_dict(),
            "text" : self.text,
            "tags": self.tags,
            "headline": self.headline,
            "timestamp": self.timestamp
        }

        return news_dict
