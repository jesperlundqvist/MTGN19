from app import db

class Image(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    filename = db.Column(db.String(256))
    uploaded_by = db.Column(db.String(64))
    week = db.Column(db.Integer)
    event = db.Column(db.String(256))
    upload_date = db.Column(db.Date)
    thumbnail = db.Column(db.String(264))

    def __repr__(self):
        return '<Bild uppladdad av {}>'.format(self.uploaded_by)
    
    def as_dictionary(self):
        image_dict = {
            "id" : self.id,
            "filename":self.filename,
            "uploaded_by": self.uploaded_by,
            "week": self.week,
            "event": self.event,
            "upload_date": self.upload_date,
            "thumbnail": self.thumbnail
        }

        return image_dict