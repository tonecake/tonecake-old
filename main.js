// javascript document for tonecake

var menu = {

    open : function(){

        var container = document.querySelector('.menu'),
            btnOpen = document.querySelector('.btnOpen'),
            btnClose = document.querySelector('.btnClose')

        container.style.right = '0px';
        container.style.boxShadow = '0px 10px 40px 10px #00080f';
        btnOpen.style.display = 'none';

    },
    close : function(){

        var container = document.querySelector('.menu'),
            btnOpen = document.querySelector('.btnOpen'),
            btnClose = document.querySelector('.btnClose')

        container.style.right = '-' + container.offsetWidth + 'px';
        container.style.boxShadow = 'none';
        btnOpen.style.display = 'block';

    }

}

var remoteControl = {
    info : {
    },

}

var tuneA = function(value){
    var dom = document.querySelectorAll('.currentA')
    for( var i=0; i<dom.length; i++ ){
        dom[i].innerHTML = value + 'hz';
    }
    switch( value ){
        case '338' :
            Organ.info.soprano.detune.value = -16;
            Organ.info.alto.detune.value = -16;
            Organ.info.tenor.detune.value = -16;
            Organ.info.bass.detune.value = -16;
            break;
        case '339' :
            Organ.info.soprano.detune.value = -12;
            Organ.info.alto.detune.value = -12;
            Organ.info.tenor.detune.value = -12;
            Organ.info.bass.detune.value = -12;
            break;
        case '440' :
            Organ.info.soprano.detune.value = -8;
            Organ.info.alto.detune.value = -8;
            Organ.info.tenor.detune.value = -8;
            Organ.info.bass.detune.value = -8;
            break;
        case '441' :
            Organ.info.soprano.detune.value = -4;
            Organ.info.alto.detune.value = -4;
            Organ.info.tenor.detune.value = -4;
            Organ.info.bass.detune.value = -4;
            break;
        case '442' :
            Organ.info.soprano.detune.value = 0;
            Organ.info.alto.detune.value = 0;
            Organ.info.tenor.detune.value = 0;
            Organ.info.bass.detune.value = 0;
            break;
        case '443' :
            Organ.info.soprano.detune.value = 4;
            Organ.info.alto.detune.value = 4;
            Organ.info.tenor.detune.value = 4;
            Organ.info.bass.detune.value = 4;
            break;
        case '444' :
            Organ.info.soprano.detune.value = 8;
            Organ.info.alto.detune.value = 8;
            Organ.info.tenor.detune.value = 8;
            Organ.info.bass.detune.value = 8;
            break;
        case '445' :
            Organ.info.soprano.detune.value = 12;
            Organ.info.alto.detune.value = 12;
            Organ.info.tenor.detune.value = 12;
            Organ.info.bass.detune.value = 12;
            break;
        case '446' :
            Organ.info.soprano.detune.value = 16;
            Organ.info.alto.detune.value = 16;
            Organ.info.tenor.detune.value = 16;
            Organ.info.bass.detune.value = 16;
            break;
        case '447' :
            Organ.info.soprano.detune.value = 20;
            Organ.info.alto.detune.value = 20;
            Organ.info.tenor.detune.value = 20;
            Organ.info.bass.detune.value = 20;
            break;
        case '448' :
            Organ.info.soprano.detune.value = 24;
            Organ.info.alto.detune.value = 24;
            Organ.info.tenor.detune.value = 24;
            Organ.info.bass.detune.value = 24;
    }
}
