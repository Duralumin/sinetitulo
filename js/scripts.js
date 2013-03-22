/*
Dopo diverse ore di meditazione e tabelle, sono giunto alla conclusione che non è possibile utilizzare lo stesso modello di danno per il funzionamento delle armi puramente cinetiche come i railgun o flak (shot) e per le armi esplosive come missili e siluri (shell). 

L'unica variazione in realtà sarà che per i shot la differenza tra armatura e penetrazione verrà sottratta al danno (eventualmente portandolo a 0), mentre per le shell o c'è penetrazione, o il danno non viene applicato.

In entrambi i casi, se la penetrazione è almeno la metà dell'armatura, viene applicato il danno derivato dal punteggio di attacco.

Parimenti, non posso modellare allo stesso modo la difficoltà per railgun, flak e missili. 

I railgun sparano un penetratore cinetico ad alta velocità, completamente inerte. Il che significa che diventa maggiormente difficile colpire mano a mano che aumenta la distanza (dando maggiore tempo al bersaglio di evitare i colpi).

I missili fintantoché hanno carburante continuano ad accelerare e a mirare verso il bersaglio, diventando poi proiettili inerti quando finisce il carburante.

I flak si espandono in una nuvola di sfere di acciaio ad alta velocità, per cui aumentando la distanza diventa più facile colpire, ma diminuisce danno e penetrazione.

I siluri sono paragonabili più a delle piccole navi che a dei missili.

Dopo lunghissime ponderazioni, questo è il risultato : 
    
- i railgun hanno la classica difficoltà pari alla distanza moltiplicata per la spinta, ma ignorano il punteggio difensivo (contromisure ecc)

- i missili partono da precisione (AB) pari a 0, e aumentano la precisione di 1 per ogni esagono fino a raggiungere la loro AB massima. In questa fase ignorano la spinta del bersaglio. Se la distanza al bersaglio fosse ancora maggiore, da quel punto funzionano esattamente come se un railgun, ma la difficoltà è sia distanza per spinta sia contromisure.
- i flak aumentano di 1 l'AB per ogni esagono, ma diminuiscono di 1 l'AP e l' AD
- i siluri possono funzionare in due modi, guidati o non guidati. Nel primo caso, la difficoltà è la distanza tra la nave e il siluro (niente spinta), e ci deve essere un percorso diretto tra la nave e il siluro (e non possono essere lanciati altri siluri finché il primo non ha colpito). Nel secondo caso la difficoltà sono solo le contromisure del bersaglio, ma viene utilizzato solo l'AB del siluro.

*/

 var testWeapon = {
                  type :  'shot',
                  ab : '4',
                  ap : '3',
                  ad : '8',
                  n : '5',                 
              };
              
 var testTarget = {
                  thrust :  '2',
                  dist : '5',
                  ecm : '8',
              };
              

 //document.addEventListener("deviceready", function () {  alert("Hello Jan!");  });

var calculateVariablesClick = function() {
    var $formW = $("weaponForm");
    var weapon = {
        type :  $formW.find("[name=type]").val(),
        ab : $formW.find("[name=ab]").val(),
        ap : $formW.find("[name=ap]").val(),
        ad : $formW.find("[name=ad]").val(),
        n : $formW.find("[name=n]").val(),                 
    };
    var $formT = $("weaponForm");
    var target = {
        thrust :  $formT.find("[name=thrust]").val(),
        dist : $formT.find("[name=dist]").val(),
        ecm : $formT.find("[name=ecm]").val(),                  
    };
    
    
    var variables = calculateVariables(weapon, target);
}

var calculateDamageClick = function() {
    var $form = $("dataForm");
    var params = {
    toHit : $form.find("[name=toHit]").val(),
    difficulty : $form.find("[name=difficulty]").val(),
    wAP : $form.find("[name=wAP]").val(),
    wDB : $form.find("[name=wDB]").val(),
    nShots : $form.find("[name=nShots]").val()
    };
    
    var damage = calculateRGDamage(params);
    $("#result").val(damage);
}



    
var defaultParameters = {
      toHit : "15",    
      diff : "10",
      armor : "10",
      wAB : "0",
      wAP : "4",
      wAD : "8",
      n : "1"
};

var calculateVariables = function(attWeapon, targetShip) {
    var type = attWeapon.type;
    var wBaseAB = attWeapon.ab;
    var wBaseAP = attWeapon.ap;
    var wBaseAD = attWeapon.ad;
        
    var thrust = targetShip.thrust;    
    var distance = targetShip.dist;
    var ecm = targetShip.ecm;
    
    var vars = {
         diff : 0,
         wAB : wBaseAB,
         wAP : wBaseAP,
         wAD : wBaseAD,
         n : attWeapon.n,
    }
    
    if (type=='shot') {
        vars.diff = thrust * distance;            
    } else if (type == 'shell') {
        vars.wAB = Math.min(wBaseAB, distance);
        vars.diff = ecm;
        if (distance > wBaseAB) {
            vars.diff += thrust * distance-wBaseAB;
        }
    } else if (type == 'flak') {
        vars.diff = thrust * distance;
        vars.wAD = min0(wBaseAD-distance);
        vars.wAP = min0(wBaseAP-distance);
        vars.wAB = wBaseAB + distance;
    }
            
    return vars;
    
}

var calculateDamage = function(params) {
    
    var    toHit = toInt(params.toHit);
    var    difficulty = toInt(params.diff);
    var    armor = toInt(params.armor);
    var    wAB = toInt(params.wAB);
    var    wAP = toInt(params.wAP);
    var    wAD = toInt(params.wAD);
    var    nShots = toInt(params.n);      
      
    var margin = toHit+wAB-difficulty;
    var margin5 = to5(margin);
    var precision5 = to5(toHit+wAB-(difficulty*2));
    var penetration = margin5 * wAP;
    var remainingArmor = min0(armor-penetration);
    var isPartialPenetration = remainingArmor <= half(armor);
    
     var damageParams = {
        margin5 : margin5,
        isPartialPenetration : isPartialPenetration
    }
    $.extend(damageParams, params);
    
    var damForProj = calculateShotDamage(damageParams);
    
    var totDamage = damForProj * nShots;
    var totDamage5 = 0;
    if (totDamage > 0) {
        totDamage5 = to5(damForProj * nShots)+1;
    }      
    
    var damageResult = {
        damageBlocks : totDamage5,
        precisionLevel : precision5,
        partialPenetration : isPartialPenetration        
    }
    
    return damageResult;
    
}

function calculateShotDamage(params) {
    var damForShot = 0;
    if (params.isPartialPenetration) {
        damForShot = min0(params.wAD - params.remainingArmor) + params.margin5;
    } else {
        damForShot = min0(params.wAD - params.remainingArmor + params.margin5);
    }
   return damForShot;
}

function calculateShellDamage(params) {
    var damForShot = 0;
    if (params.isPartialPenetration) {
        damForShot = min0(params.wAD - params.remainingArmor) + params.margin5;
    } else {
        damForShot = min0(params.wAD - params.remainingArmor + params.margin5);
    }
   return damForShot;
}

function calculatePrecisionMargin(params) {
    return to5(min0(params.toHit - params.difficulty*2));
    
}

function to5(value) {
    return min0(Math.floor(value/5));
}

function half(value) {
    return Math.floor(value/2);
}

function min0(value) {
    return Math.max(value, 0);
}

function toInt(value) {
    return parseInt(value, 10);
}



     