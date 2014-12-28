//  javascript document by Francesco Changhyun Cho.
//  This script works with harmony.js, frequency.js, organ.js and cake.js.

var info = new Object(); //created, language, nowplay, currentTonart, currentHarmony, currentHarmonyPosition, lockSustain, onSustain, onSeptime, onTerzImBass, on QuinteImBass, onSeptimeImBass

var tonecake = {

    info : new Object(),

    create : function(option){
        
        Harmony.rules.key.create();

        info.language = 'default';
        info.currentTonart = option.tone + '-' + option.tonality;
        info.currentHarmony = Harmony.create({
            tone : option.tone,
            tonality : option.tonality
        });

        var cake = Cake.create({
            harmony : info.currentHarmony,
            cakeColor : "FF0033",
            fontColor : "FFFFff",
            hexagonWidth : 138,
            hexagonHeight : 118,
            hexagonGutter : 4,
            hexagonRatio : 0.749
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

            for( var i=0; i<hexagon.length; i++){
                hexagon[i].className = 'hexagon';
            }

            this.className += ' onEvent';
            console.log(hexagonOrder.indexOf(this.id) + '-started');
            info.nowplay = true;

            if( info.onTerzImBass ){
                Organ.set.soprano(frequency.find(info.currentHarmony.harmony[hexagonOrder.indexOf(this.id)].akkord.terz,'4'));
            } else if( info.onQuinteImBass ){
                Organ.set.soprano(frequency.find(info.currentHarmony.harmony[hexagonOrder.indexOf(this.id)].akkord.quinte,'4'));
            } else if( info.onSeptimeImBass ){
                Organ.set.soprano(frequency.find(info.currentHarmony.harmony[hexagonOrder.indexOf(this.id)].akkord.septime,'4'));
            } else {
                Organ.set.soprano(frequency.find(info.currentHarmony.harmony[hexagonOrder.indexOf(this.id)].nameTone,'4'));
            }

            if( info.onSeptime ){
                Organ.set.bass(frequency.find(info.currentHarmony.harmony[hexagonOrder.indexOf(this.id)].akkord.septime,'3'));
            }
        }
        var eventEnd = function(){

            if( !info.onSustain ){

                this.className = 'hexagon';
                console.log(hexagonOrder.indexOf(this.id) + '-ended');
                info.nowplay = false;
                Organ.reset();

            }

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
                    if( !info.onTerzImBass ){
                        if( info.onQuinteImBass || info.onSeptimeImBass ){
                            bassKeyClear();
                        }
                        info.onTerzImBass = true;
                        document.getElementById('btn3').className += 'on';
                    }
                    break;
                case 88 : // x - 5_ - onQuinteImBass
                    if( !info.onQuinteImBass ){
                        if( info.onTerzImBass || info.onSeptimeImBass ){
                            bassKeyClear();
                        }
                        info.onQuinteImBass = true;
                        document.getElementById('btn5').className += 'on';
                    }
                    break;
                case 67 : // c - 7_ - onSeptimeImBass
                    if( !info.onSeptimeImBass ){
                        if( info.onTerzImBass || info.onQuinteImBass ){
                            bassKeyClear();
                        }
                        info.onSeptimeImBass = true;
                        document.getElementById('btn7').className += 'on';
                    }
            }
        });

        document.addEventListener('keyup', function( event ){
            switch(window.event?event.keyCode:event.which){
                case 16 : // shift - onSustain
                    info.onSustain = false;
                    document.getElementById('btnSustain').className = '';
                    var hexagon = document.querySelectorAll('.hexagon');
                    for( var i=0; i<hexagon.length; i++){
                        hexagon[i].className = 'hexagon';
                    }
                    info.nowplay = false;
                    Organ.reset();
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

    }

};
