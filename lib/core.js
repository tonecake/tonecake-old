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

    },
    event : function(){

        var hexagon = document.querySelectorAll('hexagon');

    },
    pedal : function( event ){

        // 파이어폭스에서 key event를 감지하는 방식이 약간 다른듯 하다. 정확히 알고 만들자. <- 제이쿼리를 사용해 해결

        document.addEventListener('keydown', function( event ){

            switch(window.event?event.keyCode:event.which){
                case 16 : // shift - onSustain
                    info.onSustain = true;
                    document.getElementById('btnSustain').className += 'on';
                    document.addEventListener('keyup', function( event ){
                        if( window.event?event.keyCode:event.which === 16 ){
                            info.onSustain = false;
                            info.nowplay = false;
                            document.getElementById('btnSustain').className = ' ';
                            organReset();
                        }
                    });
                    break;
                case 17 : // ctrl - onSeptime
                    info.onSeptime = true;
                    document.getElementById('btnSeptime').className += 'on';
                    document.addEventListener('keyup', function( event ){
                        if( window.event?event.keyCode:event.which === 17 ){
                            info.onSeptime = false;
                            document.getElementById('btnSeptime').className = ' ';
                        }
                    });
                    break;
                case 54 : // 6 - onTerzImBass
                    info.onTerzImBass = true;
                    document.getElementById('btn6').className += 'on';
                    document.addEventListener('keyup', function( event ){
                        info.onTerzImBass = false;
                        document.getElementById('btn6').className = ' ';
                    });
                    break;
                case 52 : // 4 - onQuinteImBass
                    info.onQuinteImBass = true;
                    document.getElementById('btn4').className += 'on';
                    document.addEventListener('keyup', function( event ){
                        info.onQuinteImBass = false;
                        document.getElementById('btn4').className = ' ';
                    });
                    break;
                case 50 : // 2 - onSeptimeImBass
                    info.onSeptimeImBass = true;
                    document.getElementById('btn2').className += 'on';
                    document.addEventListener('keyup', function( event ){
                        info.onSeptimeImBass = false;
                        document.getElementById('btn2').className = ' ';
                    });
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

        document.getElementById(id).className += ' play';

        // 현재 플레이상태인지 꼭 푸시해준다.
        info.nowplay = true;
        info.currentTonart = name;

    },
    stop : function(id){

        document.getElementById(id).className = 'hexagon';

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
