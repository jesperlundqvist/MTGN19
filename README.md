# GitWorkshop och lokalhosting

En liten workshop i hur man använder git, inriktat på nybörjare av git som har erfarenhet av datorer och terminal fönster sen tidigare.
### Vad vi ska prata om
<body>
    <ul>
        <li>
            Sätta upp git    
        </li>
        <li>
            Ska vi Pulla något?
        </li>
        <li>
            Vad är en commit?
        </li>
        <li>
            Bland grenar och gafflar
        </li>
    </ul>
</body>


### Sätta upp git
Har man en linux elle unix dator så är det lätt men flörtar man med windows så blir det lite mera komplisrat.
Jag rekommederar personligen att ni kör i terminalen om ni har möjlighet till det och känner er bekväma nog i en terminal milljö (Om inte så rekommenderar jag starkt att ni gör er bekväma i en terminal miljö) Annars finns det fleratalet olika GUI för att intergera med GIT.
* [SourceTree](https://www.sourcetreeapp.com) *Emmas och INPHO vraques rekommendation!*
* [GitgUb Desktop](https://desktop.github.com)

När man har installerat Git så behöver man skapa ett repo (Repository) vilket man lättast gör på hemsidan, i detta fall använder vi [Github](github.com) och jag har redan satt upp ett repo för denna övning så erat första steg blir att klona ner det så ni har en lokal kopia av det.

####WorkFLow
<body>
<img src="https://www.atlassian.com/git/images/tutorials/collaborating/comparing-workflows/centralized-workflow/01.svg"/>
</body>
Det jag kommer gå igenom idag är ett arbetsätt som kallas "Centralised Workflow" (eller något liknande) vilket går ut på att ni alla arbetar mot samma repo och inte bråkar för mycket med "brashes", mer om dem senare. Detta för att det är det absolut lättaste sättet att använda Git, och mera skulle vara overkill.

När man skapar ett nytt repo brukar det finns två filer, en gitignore samt en README.md (den ni nu läser).
####gitignore
I denna fil ligger lite regler för vilka filer git ska hålla koll på eller inte, jag har inkluderat den jag har bygt och kulteverat över de senaste åren, detta är vanligtvis en hidden file men det spelar inte någon roll på det stora hela, kanska bara lite knepigare att hitta ibland.
Vanligtvis brukar man ha den så den ignorerar os generade filer, compiled och komprimerade filer. Om ni vill se hur den funkar så är det bara att öpnna den i valfri text editor, jag föreslår sublime.

### Ska vi Pulla något?
