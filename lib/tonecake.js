var info = new Object(); //created, language, nowplay, currentTonart, currentHarmony, currentHarmonyPosition, lockSustain, onSustain, onSeptime, onTerzImBass, on QuinteImBass, onSeptimeImBass

var tonecake = {

    create : function(option){

        info.language = 'default';
        info.currentTonart = option.tone + '-' + option.tonality;

        var cake = Cake.create(option);

        info.currentHarmony = Harmony.create({
            tone : option.tone,
            tonality : option.tonality
        });

        info.created = true;

        // init
        tonecake.event();
        tonecake.pedal();

    },
    event : function(){

        // NOTE : 클릭이벤트를 HTML오브젝트에 포함시키지 말고 여기서 정의하도록 하자.
        var hexagon = document.querySelectorAll('.hexagon');
        var hexagonOrder = ['hex0','hex1','hex2','hex3','hex4','hex5','hex6'];
        var eventStart = function(){
            this.className += ' onEvent';
            console.log(hexagonOrder.indexOf(this.id) + '-started');
        }
        var eventEnd = function(){
            this.className = 'hexagon';
            console.log(hexagonOrder.indexOf(this.id) + '-ended');
        }

        for( var i=0; i<hexagon.length; i++ ){
            hexagon[i].addEventListener("mousedown", eventStart);
            hexagon[i].addEventListener("mouseup", eventEnd);
            hexagon[i].addEventListener("touchstart", eventStart);
            hexagon[i].addEventListener("touchend", eventEnd);
        }

    },
    pedal : function( event ){

        function bassKeyClear(){
            info.onTerzImBass = true;
            info.onQuinteImBass = true;
            info.onSeptimeImBass = true;
            document.getElementById('btn3').className = '';
            document.getElementById('btn5').className = '';
            document.getElementById('btn7').className = '';
        }

        document.addEventListener('keydown', function( event ){
            switch(window.event?event.keyCode:event.which){
                case 16 : // shift - onSustain
                    info.onSustain = true;
                    document.getElementById('btnSustain').className += 'on';
                    break;
                case 17 : // ctrl - onSeptime
                    info.onSeptime = true;
                    document.getElementById('btnSeptime').className += 'on';
                    break;
                case 90 : // z- 3_ - onTerzImBass
                    if( info.onQuinteImBass || info.onSeptimeImBass ){
                        bassKeyClear();
                    }
                    info.onTerzImBass = true;
                    document.getElementById('btn3').className += 'on';
                    break;
                case 88 : // x - 5_ - onQuinteImBass
                    if( info.onTerzImBass || info.onSeptimeImBass ){
                        bassKeyClear();
                    }
                    info.onQuinteImBass = true;
                    document.getElementById('btn5').className += 'on';
                    break;
                case 67 : // c - 7_ - onSeptimeImBass
                    if( info.onTerzImBass || info.onQuinteImBass ){
                        bassKeyClear();
                    }
                    info.onSeptimeImBass = true;
                    document.getElementById('btn7').className += 'on';
                    break;
            }
        });

        document.addEventListener('keyup', function( event ){
            switch(window.event?event.keyCode:event.which){
                case 16 : // shift - onSustain
                    info.onSustain = false;
                    info.nowplay = false;
                    document.getElementById('btnSustain').className = '';
                    organReset();
                    break;
                case 17 : // ctrl - onSeptime
                    info.onSeptime = false;
                    document.getElementById('btnSeptime').className = '';
                    break;
                case 90 : // z - 3_ - onTerzImBass
                    info.onTerzImBass = false;
                    document.getElementById('btn3').className = '';
                    break;
                case 88 : // x - 5_ - onQuinteImBass
                    info.onQuinteImBass = false;
                    document.getElementById('btn5').className = '';
                    break;
                case 67 : // c - 7_ - onSeptimeImBass
                    info.onSeptimeImBass = false;
                    document.getElementById('btn7').className = '';
                    break;
            }

        });

    },
    play : function(name,id){

        var value = Harmony.positioning(name);

        var s = frequency.find(value[0].tone, value[0].octave),
            a = frequency.find(value[1].tone, value[1].octave),
            t = frequency.find(value[2].tone, value[2].octave),
            b = frequency.find(value[3].tone, value[3].octave);

        // NOTE: 다음 단계는 이것을 화성진행에 맞게 적절히 배치하는 알고리즘을 만드는것이다. 그건 harmony.positioning 에 정의하도록 한다. 그리고 오늘은 이만 자라..

        organFreqSet({soprano:s,alto:a,tenor:t,bass:b});

        // 현재 플레이상태인지 꼭 푸시해준다.
        info.nowplay = true;
        info.currentTonart = name;

    },
    stop : function(id){

        // NOTE : 재설계 필요
        if( info.onSustain === true ){

            // 플레이가 끝이나는 것을 sustain 개체에서 푸시해준다.

        } else {

            organFreqSet({soprano:0,alto:0,tenor:0,bass:0});

            // 현재 플레이상태가 끝난걸 꼭 푸시해준다.
            info.nowplay = false;

        }

    }

};

var Cake = {

    create : function(option){

        var dom = {
            wrapper : null,
            cake : null,
            hexagons : [
                {elem : null, id : "hex0", top : 0, left : 0},
                {elem : null, id : "hex1", top : (option.hexagonHeight + option.hexagonGutter) * -1, left : 0},
                {elem : null, id : "hex2", top : ((option.hexagonHeight / 2) + (option.hexagonGutter / 2)) * -1, left : (option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)},
                {elem : null, id : "hex3", top : (option.hexagonHeight / 2) + (option.hexagonGutter / 2), left : (option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)},
                {elem : null, id : "hex4", top : option.hexagonHeight + option.hexagonGutter, left: 0},
                {elem : null, id : "hex5", top : (option.hexagonHeight / 2) + (option.hexagonGutter / 2), left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * -1},
                {elem : null, id : "hex6", top : ((option.hexagonHeight / 2) + (option.hexagonGutter / 2)) * -1, left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * -1}
                // hexagon on outside
            ]
        };

        var tone = option.tone;
        var tonality = option.tonality

        makeCake();

        function makeCake(){

            setupWrapper();
            setupCake();
            setupHexagons();

        }

        function setupWrapper(){
            if ( info.created ){
                var elem = document.getElementById('cake-wrapper');
                elem.parentNode.removeChild(elem);
            }

            dom.wrapper = document.createElement('div');
            dom.wrapper.className = 'cake-wrapper';
            dom.wrapper.id = 'cake-wrapper';
            dom.wrapper.style.position = 'absolute';
            dom.wrapper.style.display = 'block';
            // wrapper의 가로 세로를 굳이 정의해야 할 지에 대해 다시 생각해보기.
            dom.wrapper.style.width = (option.hexagonWidth * 5) + (option.hexagonGutter * 4) + 'px';
            dom.wrapper.style.height = (option.hexagonHeight * 5) + (option.hexagonGutter * 4) + 'px';
            dom.wrapper.style.top = '50%';
            dom.wrapper.style.left = '50%';
            dom.wrapper.style.marginLeft = '-' + ((option.hexagonWidth * 5) + (option.hexagonGutter * 4)) / 2 + 'px';
            dom.wrapper.style.marginTop = '-' + ((option.hexagonHeight * 5) + (option.hexagonGutter * 4)) / 2 + 'px';

            dom.wrapper.style.padding = 0;

            document.body.appendChild(dom.wrapper);

//            tonecake.status.created = 'yes';

        }

        function setupCake(){

            dom.cake = document.createElement('div');
            dom.cake.className = 'cake';
            dom.cake.style.position = 'relative';
            dom.cake.style.display = 'block';
            dom.cake.style.width = option.hexagonWidth + 'px';
            dom.cake.style.height = option.hexagonHeight + 'px';
            dom.cake.style.top = '50%';
            dom.cake.style.margin = '0 auto';
            dom.cake.style.marginTop = '-' + option.hexagonHeight / 2 + 'px';

            dom.wrapper.appendChild(dom.cake);

        }

        function setupHexagons(){

            var harmony = Harmony.create({
                tone : tone,
                tonality : tonality
            });
            // NOTE : 조성(tonart)인자를 어떻게 전달할것인지 그 방법에 대하여 생각해볼만 하다.

            var i = null;
            for( i = 0; dom.hexagons.length > i; i += 1 ) {

                dom.hexagons[i].elem = document.createElement('div');
                dom.hexagons[i].elem.id = dom.hexagons[i].id;
                // 이곳에서 화성을 컨트롤하는 스위치를 켠다.
//                dom.hexagons[i].elem.setAttribute('onMousedown', 'tonecake.play("' + harmony.harmony[i].tonart + '","' + harmony.harmony[i].akkord.grund + '","' + harmony.harmony[i].akkord.terz + '","' + harmony.harmony[i].akkord.quinte + '","' + harmony.harmony[i].akkord.septime + '","' + dom.hexagons[i].id + '")');

                // 이것은 마우스이벤트이다.
//                dom.hexagons[i].elem.setAttribute('onMousedown', 'tonecake.play("' + harmony.harmony[i].tonart + '","' + dom.hexagons[i].id + '")');
//                dom.hexagons[i].elem.setAttribute('onMouseup','tonecake.stop("' + dom.hexagons[i].id + '")');

                dom.hexagons[i].elem.className = 'hexagon';
                dom.hexagons[i].elem.style.position = 'absolute';
                dom.hexagons[i].elem.style.top = dom.hexagons[i].top + 'px';
                dom.hexagons[i].elem.style.left = dom.hexagons[i].left + 'px';
                dom.hexagons[i].elem.style.display = 'block';
                dom.hexagons[i].elem.style.width = option.hexagonWidth + 'px';
                dom.hexagons[i].elem.style.height = option.hexagonHeight + 'px';

                dom.cake.appendChild(dom.hexagons[i].elem);

                // hexagons' content (wrapper)

                var content = document.createElement('div');
                content.style.position = 'absolute';
                content.style.color = '#' + option.fontColor;
                content.style.textAlign = 'center';
                content.style.lineHeight = 1.25;

                dom.hexagons[i].elem.appendChild(content);

                // (content)

                var name = document.createElement('div');
                name.style.fontSize = '2em';
                name.style.cursor= 'default';
                name.innerHTML = harmony.harmony[i].nameShort;

                content.appendChild(name);

                var description = document.createElement('div');
                description.style.fontSize = '1em';
                description.style.cursor= 'default';
                description.innerHTML = harmony.harmony[i].tonart;

                content.appendChild(description);

                // wrapper의 위치를 조정함

                content.style.top = '50%';
                content.style.left = '50%';
                content.style.marginTop = '-' + content.offsetHeight / 2 + 'px';
                content.style.marginLeft = '-' + content.offsetWidth / 2 + 'px';

            }

        }

    },
    response : function(){
    },
    animate : function (){
    }

}

var Organ = {
    config : {
        freq : {
            // default value
            soprano : 0,
            alto    : 0,
            tenor   : 0,
            bass    : 0,
        },
        gain : {
            defaultVolume : 0.1
        }
    },
    initialize : function(o){

        var context = (window.AudioContext
                    || window.webkitAudioContext
                    || window.mozAudioContext
                    || window.msAudioContext
                    || window.oAudioContext);

        if( context ){

            return new context();

        } else {

            return false;

        }

    },
    create : function(o){

        var organ = Organ.initialize();

        // NOTE : 볼륨등을 컨트롤한다. audioContext -> gainNode -> destination 순서..
        gainNode1 = organ.createGain(); // soprano
        gainNode2 = organ.createGain(); // alto
        gainNode3 = organ.createGain(); // tenor
        gainNode4 = organ.createGain(); // bass

        soprano = organ.createOscillator();
        alto    = organ.createOscillator();
        tenor   = organ.createOscillator();
        bass    = organ.createOscillator();

        soprano.connect(gainNode1);
        alto.connect(gainNode2);
        tenor.connect(gainNode3);
        bass.connect(gainNode4);

        gainNode1.connect(organ.destination);
        gainNode2.connect(organ.destination);
        gainNode3.connect(organ.destination);
        gainNode4.connect(organ.destination);

        gainNode1.gain.value = Organ.config.gain.defaultVolume;
        gainNode2.gain.value = Organ.config.gain.defaultVolume;
        gainNode3.gain.value = Organ.config.gain.defaultVolume;
        gainNode4.gain.value = Organ.config.gain.defaultVolume;

        organFreqSet({
            soprano : Organ.config.freq.soprano,
            alto    : Organ.config.freq.alto,
            tenor   : Organ.config.freq.tenor,
            bass    : Organ.config.freq.bass
        });

    }

}

Organ.create();

var time = Organ.initialize.currentTime;

var gainNode1,
    gainNode2,
    gainNode3,
    gainNode4,

    soprano,
    alto,
    tenor,
    bass;

function organFreqSet(option){

    if( option.soprano != 'keep' ){
        soprano.frequency.value = option.soprano;
    }
    if( option.alto != 'keep' ){
        alto.frequency.value    = option.alto;
    }
    if( option.tenor != 'keep' ){
        tenor.frequency.value   = option.tenor;
    }
    if( option.bass != 'keep' ){
        bass.frequency.value    = option.bass;
    }

}

function organSopranoSet(freq){
    if ( !freq ){ var freq = 0; }
    organFreqSet({soprano:freq,alto:'keep',tenor:'keep',bass:'keep'});
}

function organAltoSet(freq){
    if ( !freq ){ var freq = 0; }
    organFreqSet({soprano:'keep',alto:freq,tenor:'keep',bass:'keep'});
}

function organTenorSet(freq){
    if ( !freq ){ var freq = 0; }
    organFreqSet({soprano:'keep',alto:'keep',tenor:freq,bass:'keep'});
}

function organBassSet(freq){
    if ( !freq ){ var freq = 0; }
    organFreqSet({soprano:'keep',alto:'keep',tenor:'keep',bass:freq});
}

function organReset(){
    organFreqSet({soprano:0,alto:0,tenor:0,bass:0});
}


soprano.start(time);
alto.start(time);
tenor.start(time);
bass.start(time);

var frequency = {

    // 음이름과 옥타브를 넣으면 주파수로 반환하는 함수
    find : function(tone, octave){

        if( !tone || !octave ){

            console.log("Error : Invalid argument / example) frequency.find(tone, octave)");
            return 0;

        }

        if( octave > 8 ){

            octave = 8;

            console.log("Error : Invaild value of argumenet (octave) / octave value rage : 0 ~ 8.");

        }

        var i = null;
        for( i = 0; frequency[octave].length > i; i += 1 ) {

            if( frequency[octave][i].name === tone ) {

                return frequency[octave][i].freq;

            }

        }

    },

    // data
    0 : [
        { "name" : "c"  , "freq" : 262.81 / 16 },
        { "name" : "cis", "freq" : 278.44 / 16 },
        { "name" : "des", "freq" : 278.44 / 16 },
        { "name" : "d"  , "freq" : 295.00 / 16 },
        { "name" : "dis", "freq" : 312.54 / 16 },
        { "name" : "es" , "freq" : 312.54 / 16 },
        { "name" : "e"  , "freq" : 331.13 / 16 },
        { "name" : "f"  , "freq" : 350.82 / 16 },
        { "name" : "fis", "freq" : 371.68 / 16 },
        { "name" : "ges", "freq" : 371.68 / 16 },
        { "name" : "g"  , "freq" : 393.78 / 16 },
        { "name" : "gis", "freq" : 417.19 / 16 },
        { "name" : "as" , "freq" : 417.19 / 16 },
        { "name" : "a"  , "freq" : 442.00 / 16 },
        { "name" : "b"  , "freq" : 468.28 / 16 },
        { "name" : "h"  , "freq" : 496.13 / 16 }
    ],
    1 : [
        { "name" : "c"  , "freq" : 262.81 / 8 },
        { "name" : "cis", "freq" : 278.44 / 8 },
        { "name" : "des", "freq" : 278.44 / 8 },
        { "name" : "d"  , "freq" : 295.00 / 8 },
        { "name" : "dis", "freq" : 312.54 / 8 },
        { "name" : "es" , "freq" : 312.54 / 8 },
        { "name" : "e"  , "freq" : 331.13 / 8 },
        { "name" : "f"  , "freq" : 350.82 / 8 },
        { "name" : "fis", "freq" : 371.68 / 8 },
        { "name" : "ges", "freq" : 371.68 / 8 },
        { "name" : "g"  , "freq" : 393.78 / 8 },
        { "name" : "gis", "freq" : 417.19 / 8 },
        { "name" : "as" , "freq" : 417.19 / 8 },
        { "name" : "a"  , "freq" : 442.00 / 8 },
        { "name" : "b"  , "freq" : 468.28 / 8 },
        { "name" : "h"  , "freq" : 496.13 / 8 }
    ],
    2 : [
        { "name" : "c"  , "freq" : 262.81 / 4 },
        { "name" : "cis", "freq" : 278.44 / 4 },
        { "name" : "des", "freq" : 278.44 / 4 },
        { "name" : "d"  , "freq" : 295.00 / 4 },
        { "name" : "dis", "freq" : 312.54 / 4 },
        { "name" : "es" , "freq" : 312.54 / 4 },
        { "name" : "e"  , "freq" : 331.13 / 4 },
        { "name" : "f"  , "freq" : 350.82 / 4 },
        { "name" : "fis", "freq" : 371.68 / 4 },
        { "name" : "ges", "freq" : 371.68 / 4 },
        { "name" : "g"  , "freq" : 393.78 / 4 },
        { "name" : "gis", "freq" : 417.19 / 4 },
        { "name" : "as" , "freq" : 417.19 / 4 },
        { "name" : "a"  , "freq" : 442.00 / 4 },
        { "name" : "b"  , "freq" : 468.28 / 4 },
        { "name" : "h"  , "freq" : 496.13 / 4 }
    ],
    3 : [
        { "name" : "c"  , "freq" : 262.81 / 2 },
        { "name" : "cis", "freq" : 278.44 / 2 },
        { "name" : "des", "freq" : 278.44 / 2 },
        { "name" : "d"  , "freq" : 295.00 / 2 },
        { "name" : "dis", "freq" : 312.54 / 2 },
        { "name" : "es" , "freq" : 312.54 / 2 },
        { "name" : "e"  , "freq" : 331.13 / 2 },
        { "name" : "f"  , "freq" : 350.82 / 2 },
        { "name" : "fis", "freq" : 371.68 / 2 },
        { "name" : "ges", "freq" : 371.68 / 2 },
        { "name" : "g"  , "freq" : 393.78 / 2 },
        { "name" : "gis", "freq" : 417.19 / 2 },
        { "name" : "as" , "freq" : 417.19 / 2 },
        { "name" : "a"  , "freq" : 442.00 / 2 },
        { "name" : "b"  , "freq" : 468.28 / 2 },
        { "name" : "h"  , "freq" : 496.13 / 2 }
    ],
    4 : [
        { "name" : "c"  , "freq" : 262.81 },
        { "name" : "cis", "freq" : 278.44 },
        { "name" : "des", "freq" : 278.44 },
        { "name" : "d"  , "freq" : 295.00 },
        { "name" : "dis", "freq" : 312.54 },
        { "name" : "es" , "freq" : 312.54 },
        { "name" : "e"  , "freq" : 331.13 },
        { "name" : "f"  , "freq" : 350.82 },
        { "name" : "fis", "freq" : 371.68 },
        { "name" : "ges", "freq" : 371.68 },
        { "name" : "g"  , "freq" : 393.78 },
        { "name" : "gis", "freq" : 417.19 },
        { "name" : "as" , "freq" : 417.19 },
        { "name" : "a"  , "freq" : 442.00 },
        { "name" : "b"  , "freq" : 468.28 },
        { "name" : "h"  , "freq" : 496.13 }
    ],
    5 : [
        { "name" : "c"  , "freq" : 262.81 * 2 },
        { "name" : "cis", "freq" : 278.44 * 2 },
        { "name" : "des", "freq" : 278.44 * 2 },
        { "name" : "d"  , "freq" : 295.00 * 2 },
        { "name" : "dis", "freq" : 312.54 * 2 },
        { "name" : "es" , "freq" : 312.54 * 2 },
        { "name" : "e"  , "freq" : 331.13 * 2 },
        { "name" : "f"  , "freq" : 350.82 * 2 },
        { "name" : "fis", "freq" : 371.68 * 2 },
        { "name" : "ges", "freq" : 371.68 * 2 },
        { "name" : "g"  , "freq" : 393.78 * 2 },
        { "name" : "gis", "freq" : 417.19 * 2 },
        { "name" : "as" , "freq" : 417.19 * 2 },
        { "name" : "a"  , "freq" : 442.00 * 2 },
        { "name" : "b"  , "freq" : 468.28 * 2 },
        { "name" : "h"  , "freq" : 496.13 * 2 }
    ],
    6 : [
        { "name" : "c"  , "freq" : 262.81 * 4 },
        { "name" : "cis", "freq" : 278.44 * 4 },
        { "name" : "des", "freq" : 278.44 * 4 },
        { "name" : "d"  , "freq" : 295.00 * 4 },
        { "name" : "dis", "freq" : 312.54 * 4 },
        { "name" : "es" , "freq" : 312.54 * 4 },
        { "name" : "e"  , "freq" : 331.13 * 4 },
        { "name" : "f"  , "freq" : 350.82 * 4 },
        { "name" : "fis", "freq" : 371.68 * 4 },
        { "name" : "ges", "freq" : 371.68 * 4 },
        { "name" : "g"  , "freq" : 393.78 * 4 },
        { "name" : "gis", "freq" : 417.19 * 4 },
        { "name" : "as" , "freq" : 417.19 * 4 },
        { "name" : "a"  , "freq" : 442.00 * 4 },
        { "name" : "b"  , "freq" : 468.28 * 4 },
        { "name" : "h"  , "freq" : 496.13 * 4 }
    ],
    7 : [
        { "name" : "c"  , "freq" : 262.81 * 8 },
        { "name" : "cis", "freq" : 278.44 * 8 },
        { "name" : "des", "freq" : 278.44 * 8 },
        { "name" : "d"  , "freq" : 295.00 * 8 },
        { "name" : "dis", "freq" : 312.54 * 8 },
        { "name" : "es" , "freq" : 312.54 * 8 },
        { "name" : "e"  , "freq" : 331.13 * 8 },
        { "name" : "f"  , "freq" : 350.82 * 8 },
        { "name" : "fis", "freq" : 371.68 * 8 },
        { "name" : "ges", "freq" : 371.68 * 8 },
        { "name" : "g"  , "freq" : 393.78 * 8 },
        { "name" : "gis", "freq" : 417.19 * 8 },
        { "name" : "as" , "freq" : 417.19 * 8 },
        { "name" : "a"  , "freq" : 442.00 * 8 },
        { "name" : "b"  , "freq" : 468.28 * 8 },
        { "name" : "h"  , "freq" : 496.13 * 8 }
    ],
    8 : [
        { "name" : "c"  , "freq" : 262.81 * 16 },
        { "name" : "cis", "freq" : 278.44 * 16 },
        { "name" : "des", "freq" : 278.44 * 16 },
        { "name" : "d"  , "freq" : 295.00 * 16 },
        { "name" : "dis", "freq" : 312.54 * 16 },
        { "name" : "es" , "freq" : 312.54 * 16 },
        { "name" : "e"  , "freq" : 331.13 * 16 },
        { "name" : "f"  , "freq" : 350.82 * 16 },
        { "name" : "fis", "freq" : 371.68 * 16 },
        { "name" : "ges", "freq" : 371.68 * 16 },
        { "name" : "g"  , "freq" : 393.78 * 16 },
        { "name" : "gis", "freq" : 417.19 * 16 },
        { "name" : "as" , "freq" : 417.19 * 16 },
        { "name" : "a"  , "freq" : 442.00 * 16 },
        { "name" : "b"  , "freq" : 468.28 * 16 },
        { "name" : "h"  , "freq" : 496.13 * 16 }
    ],
}

var Harmony = {

    // This method return a seven scale degree.
    create : function(option){ // option : tone, tonality

        if( !option ){

            console.log('Error : Invalid argument / example : Harmony.create({tone:_____,tonality:_____})');
            return false;

        } else {

            return getHarmony(option.tone, option.tonality);

        }

        function getHarmony(tone, tonality){

            var result = {
                "tonart" : tone + '-' + tonality,
                "harmony" : []
            };

            var harmonyset;
            if( tonality === 'dur' ){
                harmonyset = Harmony.rules.harmonyset.dur;
            } else {
                harmonyset = Harmony.rules.harmonyset.moll;
            }

            for( var i=0; i<harmonyset.length; i++ ){

                var harmony_name = harmonyset[i].name
                var harmony_septime;

                if ( harmonyset[i].septime === 'dur' ){
                    harmony_septime = 'dur';
                } else {
                    harmony_septime = 'default';
                }

                var harmony_result = {
                    "name" : harmonyset[i].name,
                    "nameShort" : harmonyset[i].nameShort,
                    "nameTone" : Harmony.functions.getToneByInterval(tone, harmonyset[i].interval),
                    "tonart" : Harmony.functions.getToneByInterval(tone, harmonyset[i].interval) + '-' + harmonyset[i].tonality,
                    "akkord" : Harmony.functions.getKlang(Harmony.functions.getToneByInterval(tone, harmonyset[i].interval), harmonyset[i].tonality, harmony_septime),
                    "descendant" : []
                }

                result.harmony.push(harmony_result);

            }

            return result;

        }

    },

    positioning : function(tonart){

        // 본 메소드에서 쓰이는 변수들을 정리
        var result = new Array(),

            soprano,    sopranoTone,    sopranoPosition,    sopranoOctave,
            alto,       altoTone,       altoPosition,       altoOctave,
            tenor,      tenorTone,      tenorPosition,      tenorOctave,
            bass,       bassTone,       bassPosition,       bassOctave;

        soprano = {'name' : 'soprano', 'tone' : sopranoTone, 'octave' : sopranoOctave};
        alto    = {'name' : 'alto', 'tone' : altoTone, 'octave' : altoOctave};
        tenor   = {'name' : 'tenor', 'tone' : tenorTone, 'octave' : tenorOctave};
        bass    = {'name' : 'bass', 'tone' : bassTone, 'octave' : bassOctave};

        result.push(soprano, alto, tenor, bass);

        info.currentPosition = result;
        return result;

    },

    // 라이브러리 내에서 쓰이는 각종 함수들을 객체형태로 모아놓았다.
    functions : {

        getKlang : function(tone, tonality, septime){

            var klang;

            if( tonality === 'moll' ){
                klang = Harmony.rules.dreiklang.moll;
            } else if( tonality === 'ver') {
                klang = Harmony.rules.dreiklang.ver;
            } else if( tonality === 'ueber' ){
                klang = Harmony.rules.dreiklang.ueber;
            } else {
                klang = Harmony.rules.dreiklang.dur;
            }

            var grund = Harmony.functions.getKeyindexByTone( tone ),
                terz = Harmony.functions.adjustKeyposition( grund + klang.terz ),
                quinte = Harmony.functions.adjustKeyposition( grund + klang.quinte );
            if( septime === 'dur' ){
                var septime = Harmony.functions.adjustKeyposition( grund + klang.septime_dur );
            } else {
                var septime = Harmony.functions.adjustKeyposition( grund + klang.septime );
            }

            return {
                "grund": Harmony.functions.getToneByKeyindex(grund),
                "terz": Harmony.functions.getToneByKeyindex(terz),
                "quinte": Harmony.functions.getToneByKeyindex(quinte),
                "septime": Harmony.functions.getToneByKeyindex(septime)
            };

        },

        getKlangDominant : function(tone, tonality){

            var dominant_grund = Harmony.functions.getToneByInterval(tone, 7);
            var dominant = Harmony.functions.getKlang(dominant_grund, 'dur');

            return dominant;

        },

        getKlangVerminderterDominant : function(tone, tonality){

            var ver_grund = Harmony.functions.getToneByInterval(tone, -1);
            var ver = Harmony.functions.getKlang(dominant_grund, 'ver');

            return ver;

        },

        // NOTE : 현재 조성에 맞는 스케일을 반환한다.
        getScale : function(tonart){

            var flatTonart = ['f-dur', 'd-moll', 'b-dur', 'g-moll', 'es-dur', 'c-moll', 'as-dur', 'f-moll', 'des-dur', 'b-moll', 'ges-dur', 'es-moll', 'ces-dur', 'as-moll'];

            for( var i=0; flatTonart.length>i; i++ ) {
                if( flatTonart[i] === tonart ) {
                    return ['c','des','d','es','e','f','ges','g','as','a','b','h'];
                    break;
                }
            }

            return ['c','cis','d','dis','e','f','fis','g','gis','a','ais','h'];

        },

        // NOTE : 인터발기준으로 음을 구한다.
        getToneByInterval : function(tone, interval){

            var keys = Harmony.functions.getScale(info.currentTonart);
            var result = Harmony.functions.adjustKeyposition(keys.indexOf(tone) + interval);

            return keys[result];

        },

        // NOTE : 키인덱스로 음이름을 구한다
        getToneByKeyindex : function(num){

            // NOTE : info 꼭 오브젝트가 전역에 정의되어 있어야 한다.
            var tone = Harmony.functions.getScale(info.currentTonart);

            return tone[num];

        },

        // NOTE : 음이름으로 키인덱스를 구한다
        getKeyindexByTone : function(tone){

            // 원래 배열을 써야 하지만 같은음 다른이름인것이 몇몇 있어서 오브젝트로 정의함.
            var keyindex= [{"n":"c","v":0},{"n":"cis","v":1},{"n":"des","v":1},{"n":"d","v":2},{"n":"dis","v":3},{"n":"es","v":3},{"n":"e","v":4},{"n":"f","v":5},{"n":"fis","v":6},{"n":"ges","v":6},{"n":"g","v":7},{"n":"gis","v":8},{"n":"as","v":8},{"n":"a","v":9},{"n":"b","v":10},{"n":"ais","v":10},{"n":"h","v":11},{"n":"ces","v":11}];

            for( var i=0; keyindex.length>i; i++ ){
                if( keyindex[i].n === tone ){
                    return keyindex[i].v;
                    break;
                }
            }

            return false;

        },

        // NOTE : 연산이 끝났을 때, 인식되는 음정범위를 벗어날 경우 그것을 픽스함
        adjustKeyposition : function(num){

            if( num > 11 ){
                return num - 12;
            } else {
                return num;
            }

        },

    },

    // Objects and Arrays
    rules : {
        dreiklang  : {
            "dur": {
                "grund": 0,
                "terz": 4,
                "quinte": 7,
                "septime": 10,
                "septime_dur": 11
            },
            "moll": {
                "grund": 0,
                "terz": 3,
                "quinte": 7,
                "septime": 10,
                "septime_dur": 11
            },
            "ver": {
                "grund": 0,
                "terz": 3,
                "quinte": 6,
                "septime": 9
            },
            "ueber": {
                "grund": 0,
                "terz": 4,
                "quinte": 8,
                "septime": 10
            }
        },
        harmonyset : {
            "dur": [
                {
                    "name": "tonika",
                    "nameShort": "T",
                    "tonality": "dur",
                    "septime": "dur",
                    "interval": 0
                },
                {
                    "name": "sub-dominant",
                    "nameShort": "S",
                    "tonality": "dur",
                    "interval": 5
                },
                {
                    "name": "sub-dominant-parallele",
                    "nameShort": "Sp",
                    "tonality": "moll",
                    "interval": 2
                },
                {
                    "name": "tonika-parallele",
                    "nameShort": "Tp",
                    "tonality": "moll",
                    "interval": 9
                },
                {
                    "name": "dominant",
                    "nameShort": "D",
                    "tonality": "dur",
                    "interval": 7
                },
                {
                    "name": "dominant-parallele",
                    "nameShort": "Dp",
                    "tonality": "moll",
                    "interval": 4
                },
                {
                    "name": "vermindert-dominant",
                    "nameShort": "D-",
                    "tonality": "ver",
                    "interval": 11
                }
            ],
            "moll": [
                {
                    "name": "tonika",
                    "nameShort": "t",
                    "tonality": "moll",
                    "septime": "dur",
                    "interval": 0
                },
                {
                    "name": "sub-dominant",
                    "nameShort": "s",
                    "tonality": "moll",
                    "interval": 5
                },
                {
                    "name": "sub-dominant-parallele",
                    "nameShort": "sP",
                    "tonality": "dur",
                    "interval": 9
                },
                {
                    "name": "tonika-parallele",
                    "nameShort": "tP",
                    "tonality": "dur",
                    "interval": 4
                },
                {
                    "name": "dominant",
                    "nameShort": "D",
                    "tonality": "dur",
                    "interval": 7
                },
                {
                    "name": "dominant-parallele",
                    "nameShort": "dP",
                    "tonality": "dur",
                    "interval": 11
                },
                {
                    "name": "mollsubdominantischer-sextakkord",
                    "nameShort": "s⁶",
                    "tonality": "ver",
                    "interval": 2
                }
            ]
            // 이 뒤에 하모니시, 멜로디 단음계도 추가해야 한다. 그리고 필요에 따라 다른 선법들도 추가하는게 좋을것 같다.
        }

    }

}

