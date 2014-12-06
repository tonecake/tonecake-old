//  javascript document by Francesco Changhyun Cho.
//  This script works with harmony.js, frequency.js, organ.js and cake.js.

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

        Organ.create();

    },
    event : function(){

        // NOTE : 클릭이벤트를 HTML오브젝트에 포함시키지 말고 여기서 정의하도록 하자.
        var hexagon = document.querySelectorAll('.hexagon');
        var hexagonOrder = ['hex0','hex1','hex2','hex3','hex4','hex5','hex6'];
        var eventStart = function(){
            this.className += ' onEvent';
            console.log(hexagonOrder.indexOf(this.id) + '-started');
            Organ.set.soprano(442);
        }
        var eventEnd = function(){
            this.className = 'hexagon';
            console.log(hexagonOrder.indexOf(this.id) + '-ended');
            Organ.reset();
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
