from datetime import datetime
from flask import jsonify

def get_daily_messange_json():
    today = datetime.today()
    day = today.day
    month = today.month

    message = ""

    if month == 8 and day == 13:
        message = "Välkommen till Medieteknik och KTH, nØllan! Efter uppropet idag kommer VRAQUE visa er runt på campus och vi kommer även bjuda på lunch senare! På eftermiddagen är det en kontrollskrivning i matte, men oroa er inte, den är bara för att KTH vill ha statistik, det är inget allvarligt!"
    elif month == 8 and day == 14:
        message = "Ikväll är det dags för Välkomstgasquen, er första gasque med oss! Kom ihåg att gå på Gasquevettet kl 13 där VRAQUE kommer lära er hur man gasquear!"
    elif month == 8 and day == 15:
        message = "Idag har företaget Cygni en lunchföreläsning där de bjuder på lunch, så lämna matlådan hemma! Senare är det är det dags för en av Medias äldsta traditioner, Ö&B!"
    elif month == 8 and day == 16:
        message = "På eftermiddagen idag kommer ni få lite viktig information om sektionen och utbildningen. På kvällen är det Phångarna på Phortet, det kommer bli kul!"
    elif month == 8 and day == 17:
        message = "Kl 9 idag kommer ni få träffa och lära känna vårt klubbmästeri, MKM! Idag kan ni också lämna matlådan hemma då Sveriges Ingenjörer bjuder på lunchföreläsning. På eftermiddagen tar vi det lungt med lite Phika på philt!"
    elif month == 8 and day == 18:
        message = "Idag är det dags för Neverland-gasquen! Vi träffas i META kl 15!"
    elif month == 9 and day == 8:
        message = "nØllan vill inte missa nØg."
    elif month >= 9 and day >= 9:
        message = "Mottagningen tar aldrig slut."
    elif month <= 8 and day <= 13:
        message = "Hej Phöseriet! Här kommer det stå en kort presentation av dagen som uppdateras varje dag! Det kommer även finnas ett schema för dagen precis här under."
    else:
        message = "Idag är det inga mottagningsaktiviteter planerade! Passa på att ta det lungt!"

    return jsonify({"message": message})
