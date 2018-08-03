from datetime import datetime
from flask import jsonify

def get_daily_messange_json():
    today = datetime.today()
    day = today.day
    month = today.month

    message = ""

    if month == 8 and day == 13:
        message = "Välkommen till Medieteknik och KTH, nØllan! Upprop, lunch, kontrollskrivning osv."
    elif month == 8 and day == 14:
        message = "Ikväll är det dags för Välkomstgasquen, er första gasque med oss! Kom ihåg att gå på Gasquevettet kl 13 där VRAQUE kommer lära er hur man gasquear!"
    elif month == 9 and day == 8:
        message = "nØllan vill inte missa nØg."
    elif month >= 9 and day >= 9:
        message = "Mottagningen tar aldrig slut."
    elif month <= 8 and day <= 13:
        message = "Hej Phöseriet! Här kommer det stå en kort presentation av dagen som uppdateras varje dag! Det kommer även finnas ett schema för dagen precis här under."
    else:
        message = "Idag är det inga mottagningsaktiviteter planerade! Passa på att ta det lungt!"

    return jsonify({"message": message})
