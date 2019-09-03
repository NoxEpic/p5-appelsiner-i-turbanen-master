/*
Først laver vi et nogle variable til at lave en appelsin
 - en kugle som vi vil skyde afsted og fange i en turban
*/

// Appelsinen

var newspeed;
var grav = 0.1;


// Turbanen
var turban;

var header;

// Øvrige
var tid = 10;
var score = 0;
var missed = 0;
var spil = true;
var knap;

var appelsiner = [];
var socket;

/* 
 * her prøvet at setup canvas  og  pin så man kan spille sammen med der virker ikke helt
 */
function setup() {

    var status = document.getElementById('status');

    //laver en if kommand som stopper spillet hvis man får for mange misses
    if (spil) {
        // Skaber informations diven
        status.innerHTML = 'spillet er i gang';

        //Skaber canvas
        createCanvas(windowWidth, windowHeight);

        //Skaber headeren
        header = createElement('h1', 'Appelsiner i turban')

        //kalder kurven 
        turban = new Kurv(windowWidth / 2, windowHeight - 100, 150, 50, 10);

        //gør klar til at have multiplayer
        // Starter med en alert
        if (confirm('Vil du joine et igangværende spil?')) {
            //En prompt til en pin fra den anden computer
            var pin = prompt('Pin:');
            socket = ElineSocket.connect(pin);
        } else {
            //skaber en pin som kan indsættes i den anden prompt
            socket = ElineSocket.create();
        }
        socket.onMessage(handleMessage);
    } else {
        //ændre informations diven til en taber tekst
        document.getElementById('status').innerHTML = 'Du tabte';

        //skaber en genstart knap
        status.createButton('Restart?')
        status.position(windowWidth / 2, windowHeight / 2);
        status.mousePressed(Genstartspillet);


    }
    //diffinere hvordan spill bliver false
    if (missed > 3) {
        spil = false;
    }
}

function Genstartspillet() {
    location.reload();
}
//den får b og sender shootNew til den anden spiller  
function handleMessage(msg) {
    switch (msg.type) {
        case 'shootNew':
            shootNew(msg.y);
            break;
        default:
            console.log('Unknown message', msg);
    }
}

function draw() {
    if (spil) {

        background(0);
        move();
        checkScore();
        display();

    } else {

        document.getElementById('status').innerHTML = 'Din taber';
        knap = createButton('Restart?');
        knap.position(300, 325);
        knap.mousePressed(Genstartspillet);
    }
    if (missed > 2) {
        spil = false;
    }
}

//Viser background
function display() {
    background(0);
    for (var i = 0; i < appelsiner.length; i++) {
        const appelsin = appelsiner[i];
        appelsin.display();
    }

    // Her vises turbanen - foreløbig blot en firkant
    turban.tegn();

    fill(255);
    text("Score: " + score, width - 80, 30);
    text("Missed: " + missed, width - 80, 60);
    text("Pin: " + socket.id, width - 80, 90);


    //Her skal vi sørge for at appelsinen bliver vist, hvis den skal vises
}

function move() {
    //Her skal vi sørge for at appelsinen bevæger sig, hvis den er startet
    for (var i = 0; i < appelsiner.length; i++) {
        const appelsin = appelsiner[i];

        if (appelsin.isOutOfBounds()) {
            appelsiner.splice(i, 1);
            i--;
        } else {
            appelsin.move();
        }
    }
}

function checkScore() {
    // Her checkes om turbanen har fanget appelsinen. Hvis ja, skydes en ny appelsin afsted
    for (var i = 0; i < appelsiner.length; i++) {
        const appelsin = appelsiner[i];
        if (appelsin.dy > 0) {
            if (turban.grebet(appelsin.x, appelsin.y)) {
                score += 1;
                appelsiner.splice(i, 1);
                i--;
            }
        }
    }
}


function shootNew(y) {
    //Her skal vi sørge for at en ny appelsin skydes afsted 
    const dx = 6 * Math.random();
    const dy = -15 * Math.random();
    appelsiner.push(new Appelsin(y, dx, dy));
}


//prøver at få shootNew til at skyde en bolde på en ande skæme
function mouseClicked() {
    socket.sendMessage({
        type: 'shootNew',
        y: mouseY,

    });
}

/*
OPGAVER
 Opgave 1 - undersøg hvad variablerne  grav  og  tid  bruges til.
            Skriv det i kommentarer, prøv at se hvad der sker, når
            I laver dem om. 

            grav er tyngdekraft og tid er hvornår bolten bliver vist og kastet 

 Opgave 2 - lav programmet om så det er tilfældigt hvor højt oppe 
            på venstre kan appelsinerne starter. Overvej om man kan 
            sikre, at appelsinen ikke ryger ud af skærmens top men 
            stadig har en "pæn" bane

 Opgave 3 - lav programmet om så man også kan bevæge turbanen mod
            højre og venstre med A- og D-tasterne. Prøv jer frem med
            forskellige løsninger for hvor hurtigt turbanen skal rykke

 Opgave 4 - ret programmet til, så det også angives hvor mange 
            appelsiner man IKKE greb med turbanen

 Opgave 5 - Undersøg hvad scriptet  kurv.js  er og gør, samt hvad de 
            funktioner, scriptet indeholder, skal bruges til. Skriv 
            det som kommentarer oven over hver funktion. Forklar tillige,
            hvad sammenhængen mellem dette script og turbanen i hoved-
            programmet er, og forklar det med kommentarer i toppen af 
            kurv.js

 Opgave 6 - find et billede af en turban og sæt det ind i stedet 
            for firkanten. Find eventuelt også en lyd, der kan afspilles, 
            når appelsinen gribes. Se gerne i "p5 Reference" hvordan, 
            hvis ikke I kan huske det:   https://p5js.org/reference/
            Lav programmet om, så man kan flytte turbanen med musen

 Opgave 7 - lav en Appelsin-klasse, lige som der er en Kurv-klasse. 
            Flyt koden til appelsinen ud i et selvstændigt script.
            Overvej hvad det skal hedde, oghvilke variabler og funktioner, 
            der skal lægges over i det nye script, herunder hvordan det 
            kommer til at berøre turbanen. Skriv jeres overvejelser i 
            kommentarerne

 Opgave 8 - ret programmet til, så der kan være flere appelsiner i 
            luften på en gang, dvs. at der kan skydes en ny appelsin
            afsted før den foregående er forsvundet. Overvej hvordan 
            og hvor hurtigt de skal skydes af, og forklar jeres tanker
            i kommentarerne

 Opgave 9 - ret programmet til, så det kan vindes og/eller tabes ved
            at man griber eller misser et antal appelsiner. Sørg for 
            at der vises en "Game Over"-skærm, som fortæller om man 
            vandt eller tabte, og som giver mulighed for at starte et
            nyt spil.
*/