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
    elif month == 8 and day == 20:
        message = "Idag är det Sektionens dag! Under dagen kommer ni få chansen att se allt det roliga och viktiga som sektionen gör förutom mottagningen! Ni kommer också få skriva en tenta i nØllekunskap och dagen avslutas med Medieklassikern."
    elif month == 8 and day == 21:
        message = "Under dagen kommer ni få fokusera på att plugga intromatte. Ifall något känns oklart, ta chansen att fråga på pluggstugan!"
    elif month == 8 and day == 22:
        message = "På förmiddagen kommer ni få se vad kåren gör! Studentkåren är för alla studenter på KTH, till skillnad från sektionen som bara är för medianer. På eftermiddagen är det BBR! Oömma kläder rekommenderas!"
    elif month == 8 and day == 23:
        message = "Idag har ARR ett event för er! Det vill ni inte missa. På kvällen kommer METAspexet hålla ett spex för er! Men vad är ens ett spex? Gå på nØllespexet för att få veta!"
    elif month == 8 and day == 24:
        message = "På morgonen är det dags för tenta i intromatte! Senare kommer INPHO hålla ett event för er och efter det är det dags att åka iväg till Stugan! Lycka till på tentan!"
    elif month == 8 and day == 26:
        message = "Idag kommer ni få träffa vårt kära Data! Tillsammans kommer vi ha en picknick med dem i Rålambhovsparken!"
    elif month == 8 and day == 27:
        message = "Idag börjar skolan på riktigt! För att gå igång både kropp och knopp kör vi lite morgongympa innan er första envarreföreläsning!"
    elif month == 8 and day == 28:
        message = "Under dagen fortsätter envarren! Ni kommer också ha er första föreläsning i Intro till medieteknik! Efter skolan är det nØllepubrundan, så då kommer ni få chansen att se alla andra sektioner och deras pubar."
    elif month == 8 and day == 29:
        message = "Idag är det seminarium i Intro till medieteknik. Det blir också en föreläsning lite senare. På kvällen är det kårspex, som är THS spex!"
    elif month == 8 and day == 30:
        message = "Efter envarren idag kommer ni få gå på ert första sektionsmöte, SM#Ø! Kom och bestäm om sektionens framtid och kanske kandidera till en post? Efter det kommer MKM hålla läsårets första pub i META!"
    elif month == 9 and day == 8:
        message = "nØllan vill inte missa nØg."
    elif month >= 9 and day >= 9:
        message = "Mottagningen tar aldrig slut."
    elif month <= 8 and day <= 13:
        message = "Hej Phöseriet! Här kommer det stå en kort presentation av dagen som uppdateras varje dag! Det kommer även finnas ett schema för dagen precis här under."
    else:
        message = "Idag är det inga mottagningsaktiviteter planerade! Passa på att ta det lungt!"

    return jsonify({"message": message})
