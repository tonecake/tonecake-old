// javascript document by Francesco Changhyun Cho.

// 전체적으로 너무 형식화 되어있어 자유롭지 못하다. 고로 그러한 없는 유연성을 만들기 위해.. 노력하자!

var Organ = {
    info : {
        soprano : {},
        gainNode1 : {},
        alto : {},
        gainNode2 : {},
        tenor : {},
        gainNode3 : {},
        bass : {},
        gainNode4 : {}
    },
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

        var organInfo = new Object();

        var organ = Organ.initialize();

        // NOTE : 볼륨등을 컨트롤한다. audioContext -> gainNode -> destination 순서..

        Organ.info.gainNode1 = organ.createGain();
        Organ.info.soprano = organ.createOscillator();
        Organ.info.soprano.connect(Organ.info.gainNode1);
        Organ.info.gainNode1.connect(organ.destination);
        Organ.info.gainNode1.gain.value = Organ.config.gain.defaultVolume;

        Organ.info.gainNode2 = organ.createGain();
        Organ.info.alto = organ.createOscillator();
        Organ.info.alto.connect(Organ.info.gainNode2);
        Organ.info.gainNode2.connect(organ.destination);
        Organ.info.gainNode2.gain.value = Organ.config.gain.defaultVolume;

        Organ.info.gainNode3 = organ.createGain();
        Organ.info.tenor = organ.createOscillator();
        Organ.info.tenor.connect(Organ.info.gainNode3);
        Organ.info.gainNode3.connect(organ.destination);
        Organ.info.gainNode3.gain.value = Organ.config.gain.defaultVolume;

        Organ.info.gainNode4 = organ.createGain();
        Organ.info.bass = organ.createOscillator();
        Organ.info.bass.connect(Organ.info.gainNode4);
        Organ.info.gainNode4.connect(organ.destination);
        Organ.info.gainNode4.gain.value = Organ.config.gain.defaultVolume;

        Organ.set.general({
            soprano : Organ.config.freq.soprano,
            alto    : Organ.config.freq.alto,
            tenor   : Organ.config.freq.tenor,
            bass    : Organ.config.freq.bass
        });

        var time = organ.currentTime;

        Organ.info.soprano.start(time);
        Organ.info.alto.start(time);
        Organ.info.tenor.start(time);
        Organ.info.bass.start(time);

    },

    set : {

        general : function(option){

            if( option.soprano != 'keep' ){
                Organ.info.soprano.frequency.value = option.soprano;
            }
            if( option.alto != 'keep' ){
                Organ.info.alto.frequency.value = option.alto;
            }
            if( option.tenor != 'keep' ){
                Organ.info.tenor.frequency.value = option.tenor;
            }
            if( option.bass != 'keep' ){
                Organ.info.bass.frequency.value = option.bass;
            }

        },
        soprano : function(freq){

            if ( !freq ){ var freq = 0; }
            Organ.info.soprano.frequency.value = freq;
//            Organ.set.general({soprano:freq,alto:'keep',tenor:'keep',bass:'keep'});

        },
        alto : function(freq){

            if ( !freq ){ var freq = 0; }
            Organ.info.alto.frequency.value = freq;
//            Organ.set.general({soprano:'keep',alto:freq,tenor:'keep',bass:'keep'});

        },
        tenor : function(freq){

            if ( !freq ){ var freq = 0; }
            Organ.info.tenor.frequency.value = freq;
//            Organ.set.general({soprano:'keep',alto:'keep',tenor:freq,bass:'keep'});

        },
        bass : function(freq){

            if ( !freq ){ var freq = 0; }
            Organ.info.bass.frequency.value = freq;
//            Organ.set.general({soprano:'keep',alto:'keep',tenor:'keep',bass:freq});

        }
    },

    reset : function(){

        Organ.set.general({soprano:0,alto:0,tenor:0,bass:0});

    }

}
