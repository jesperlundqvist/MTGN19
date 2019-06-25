**Frack**

Frack är backend-delen av webprojektet för mottagningen 2018.

**Setup (behöver göras en gång per dator)**

Frack är byggt på Python 3.6, därför måste du ha rätt python-version installerad för att kunna utveckla; du kan kolla vilken python version-som är installerad genom att skriva

```Python```

 i kommandotolken.

För att kunna sätta upp din utvecklingsmiljö behöver du först installera ```virtualenv```-paketet. Detta gör du genom att skriva 

```pip install virtualenv``` 

i kommandotolken.

Sedan måste du skapa filerna som behövs för din virtuella miljö. Detta gör du genom att skriva

```virtualenv venv```

i kommandotolken

För att starta din virtuella miljö måste du skriva

```source venv/bin/activate```

i kommandotolken. Om du använder windows skriver du istället 

```venv\Scripts\activate```.

Du måste starta din virtuella miljö för att kunna köra koden.
För att stänga ned den virtuella miljön, skriv 

```deactivate``` i kommandotolken.

**Installation av paket**

Första gången du startar din virtuella miljö måste du installera paketen som frack använder sig av; paketen finns listade i ```requirements.txt``` och kan enkelt installeras till din virtuella miljö genom att skriva

```pip install -r requirements.txt```

i kommandotolken.

**Testa din kod**

För att testa frack på en lokal webbserver behöver du först skriva

```export FLASK_APP=frack.py```

i kommandotolken. Om du använder windows ska du istället skriva

``` set FLASK_APP=frack.py```

(OBS! Se till att din virtuella miljö körs, och att du installerat paketen innan du försöker testa appen!)

Sedan behöver du bara skriva

```python frack.py```

i kommandotolken för att starta din lokala testserver, som kommer köras på den address som visas i kommandofönstret.

