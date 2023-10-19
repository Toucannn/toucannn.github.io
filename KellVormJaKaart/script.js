(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
        let c2 = document.getElementById("clock2");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h > 12) {
                h = h - 12
            }

            // if (h < 10) {
            //     h = "0" + h;
            // }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    let e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";

    function estimateDelivery(event) {
        event.preventDefault();
        
        let linn = document.getElementById("linn");

        // loon tarnesumma jaoks muutuja
        let summa = 0

        // Kontrollin, kas kastikestes on linnukesed ja suurendan vastavalt vajadusele summat
        if (document.getElementById("v1").checked == true) {
            summa += 5
        }

        if (document.getElementById("v2").checked == true) {
            summa += 1
        }
        
        // kontrollin, kas väljad on täidetud
        if (document.getElementById('fname').value == "") {
            alert("Palun täitke kõik väljad!")
            document.getElementById('fname').focus()

        } else if (document.getElementById('lname').value == "") {
            alert("Palun täitke kõik väljad!")
            document.getElementById('lname').focus()

        } else if (document.getElementById('sm' || "lg" || "gigant").checked == false) {
            alert("Palun vali paki suurus!")
            // kui suurus valimata, lisan taustavärvi
            document.getElementById('radio').classList.add("highlight");

        } else if (linn.value === "") {
            // eemaldan taustavärvi
            document.getElementById('radio').classList.remove("highlight");
            
            alert("Palun valige linn nimekirjast");
            
            linn.focus();
            
            return;
            
            
        } else {
            
            // suurendan tarnesummat vastavalt linnale
            switch(linn.value) {
                case "trt":
                    summa+=2.5
                    break;
                case "nrv":
                    summa+=2.5
                    break;
                case "prn":
                    summa+=3
                    break;
                default:
                    summa
            }
            
            // teen tarnesumma nähtavaks
            e.innerHTML = summa + "&euro;";
            // eemaldan taustavärvi
            document.getElementById('radio').classList.remove("highlight");
        }
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

let mapAPIKey = "AmViERMFjDyPC4OhphlzyAec1c2Dl2on4IctBntjS2f8L94owEnEKJZNycfU5IGf";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    let newCenterPoint = new Microsoft.Maps.Location(
        58.356083105684355,
        26.160554306593024
    );

    let manorPoint = new Microsoft.Maps.Location(
        58.62527, 
        25.92243
    );

    let mausoleumPoint = new Microsoft.Maps.Location(
        57.999091414626776, 
        26.036304043211807
    );

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: newCenterPoint,
        zoom: 9,
        mapTypeId: Microsoft.Maps.MapTypeId.canvasDark,
        disablePanning: false
    });
    
    let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            subTitle: 'Hea koht',
            text: 'UT'
        });
    
    let pushpin2 = new Microsoft.Maps.Pushpin(manorPoint, {
        title: 'Võisiku mõis',
        subTitle: 'Timotheus Eberhard von Bocki elukoht',
        text: 'VB'
    });

    let pushpin3 = new Microsoft.Maps.Pushpin(mausoleumPoint, {
        title: 'Barclay de Tolly',
        subTitle: 'Kindralfeldmarssal Michael Andreas Barclay de Tolly viimne puhkepaik',
        text: 'BT'
    });

    map.entities.push(pushpin);
    map.entities.push(pushpin2);
    map.entities.push(pushpin3);

    // loon infoboxi Võisiku mõisa ja Barclay de Tolly mausoleumi juurde
    let infobox = new Microsoft.Maps.Infobox(manorPoint, {
        visible: false,
        maxWidth: 500
    });
    let infobox2 = new Microsoft.Maps.Infobox(mausoleumPoint, {
        visible: false,
        maxWidth: 500
    });

    // lisan infoboxi kaardile
    infobox.setMap(map);
    infobox2.setMap(map);

    // lisan pushpinidele metaandmed
    pushpin2.metadata = {
        title: 'Võisiku mõis',
        description: 'Timotheus Eberhard von Bocki elukoht. Siin toimub suur osa Jaan Krossi romaani "Keisri hull" tegevusest. Igale sellest piirkonnast pärit elanikule kohustuslik lugemine.'
    };
    pushpin3.metadata = {
        title: 'Barclay de Tolly mausoleum',
        description: 'Siin puhkab Eesti aladelt pärit suur väejuht Michael Andreas Barclay de Tolly. Tema juhtimisel tõrjuti Napoleon tagasi ning kindralfeldmarssal Barclay de Tolly llikus oma vägedega Pariisi. Pariisis viibis ta küll vallutajana, kuid sai kohalikelt võimudelt siiski ka aumedali, kuna ei lasknud oma meestel linnas marodööritseda ja rüüstada. Põnevaid lugusid tema kohta on veel hulgi ja neid saab kuulda muuseumi giidilt.'
    };

    // lisan pushpin2 ja 3-le sündmuse haldajad
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', clickEvent);
    Microsoft.Maps.Events.addHandler(pushpin3, 'click', clickEvent);

    function clickEvent(e) {
        if (e.target.metadata) {
            // lisan infoboxile pushpinide metaandmed
            infobox.setOptions({
                location: e.target.getLocation(),
                title: e.target.metadata.title,
                description: e.target.metadata.description,
                visible: true
            });
        }
    }
}



// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

