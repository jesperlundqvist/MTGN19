Först behöver man en authentication token, vilket man får genom att logga in med rätt användarnamn och lösenord:  
```curl -u admin:inpho -i -X GET localhost:5000/api/token```

Sen kan man använda denna token för att göra saker på sidan, tex nå en hemlig sida:  
```curl -u <TOKEN>: -i -X GET localhost:5000/api/hemlig```

Eller skriva ett inlägg:  
```curl -u <TOKEN>: -i -X POST -H "Content-Type: application/json" -d '{"author": "Jesper", "tags": "", "headline": "Rubrik!", "text": "Lite text"}' localhost:5000/api/news/```
