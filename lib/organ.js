// javascript document by Francesco Changhyun Cho.

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
    gainNode4

var soprano,
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
