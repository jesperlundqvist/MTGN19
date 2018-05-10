from app import app

#Definiera olika URL-er och vad de leder till
@app.route("/")
def index():
    return "Du har fått igång flask!"