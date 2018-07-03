from flask import Flask
import os
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('flask.cfg')
db = SQLAlchemy(app)

from app import routes
from app.models.news import News
from app.models.user import User, UserType, N0lleGroup
db.create_all() #OBS UTAV BARA HELVETE denna ska inte finnas med i prod, den dumpar och skapar en ny databas

inpho = UserType(name="INPHO")
k = N0lleGroup(name="Magi-Karparna")

adminUser = User(username="admin")
adminUser.set_password("inpho")

testNews = News(headline="Första inlägget", author="INPHO", tags="", text="Här är det lite text!")
dag1News = News(headline="Välkommen nØllan!", author="ÖPH", tags="", text="Dag 1 är redan slut och vi hoppas att ni har haft en toppenstart tillsammans med oss!<br><br>Vi hoppas att ni ska trivas här hos oss på Medieteknik och att ni ser fram emot Mottagningen.<br><br>Under morgondagen vankas det gasque så passa på att komma till Gasquevettet där VRAQUE kommer lära er allt om hur man gasquear.<br><br>Tagga Välkomstgasque i morgon!")
db.session.add(adminUser)
db.session.add(testNews)
db.session.add(dag1News)

print(adminUser)

db.session.commit()
