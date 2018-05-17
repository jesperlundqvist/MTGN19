#import db_interface TODO: skriv db_interface

class News:
    def __init__(self, author, headline, text, tags):
        self.author = author
        self.headline = headline
        self.text = text
        self.tags = tags
    
def as_news(dict):
    #funktion för att konvertera dictionary till nyhetsobjekt
    return News(dict["author"], dict["headline"], 
                dict["text"], dict["tags"])

def save_to_db(news_obj):
    #TODO: skriv klart denna
    return True