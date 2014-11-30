// Javascript Document by Francesco Changhyun Cho.

var Harmony = {

    // This method return a seven scale degree.
    create : function(option){
    },

    positioning : function(option){
    },

    functions : {

        getKlang : function(tone, tonality, septime){

            var klang;

            if( tonart === 'moll' ){
                klang = dreiklang.moll;
            } else if( tonart === 'ver') {
                klang = dreiklang.ver;
            } else if( tonart === 'ueber' ){
                klang = dreiklang.ueber;
            } else {
                klang = dreiklang.dur;
            }

            var grund = getKeyPosition( tone ),
                terz = adjustKey( klang_grund + klang.terz ),
                quinte = adjustKey( klang_grund + klang.quinte );
            if( septime === 'dur' ){
                var septime = adjustKey( klang_grund + klang.septime_dur );
            } else {
                var septime = adjustKey( klang_grund + klang.septime );
            }

            return {"grund":getOriginalKeyName(grund), "terz":getOriginalKeyName(terz), "quinte":getOriginalKeyName(quinte), "septime":getOriginalKeyName(septime)};

        },

        getKlangDominant(tone, tonality){

            var dominant_grund = getToneByInterval(tone, 7);
            var dominant = getKlang(dominant_grund, 'dur');

            return dominant;

        },

        getKlangVerminderterDominant(tone, tonality){

            var ver_grund = getToneByInterval(tone, -1);
            var ver = getKlang(dominant_grund, 'ver');

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

            return ['c','cis','d','dis','e','f','fis','g','gis','a','b','h'];

        },

        // NOTE : 인터발기준으로 음을 구한다.
        getToneByInterval : function(tone, interval){

            var keys = getScale(info.currentHarmony.tonart);
            var result = Harmony.functions.adjustKeyposition(keys.indexOf(tone) + interval);

            return keys[result];

        },

        // NOTE : 키인덱스로 음이름을 구한다
        getToneByKeyindex : function(num){

            // NOTE : info 꼭 오브젝트가 전역에 정의되어 있어야 한다.
            var tone = Harmony.functions.getScale(info.currentHarmony.tonart);

            return tone[num];

        },

        // NOTE : 음이름으로 키인덱스를 구한다
        getKeyindexByTone : function(tone){

            // 원래 배열을 써야 하지만 같은음 다른이름인것이 몇몇 있어서 오브젝트로 정의함.
            var keyindex= [{"n":"c","v":0},{"n":"cis","v":1},{"n":"des","v":1},{"n":"d","v":2},{"n":"dis","v":3},{"n":"es","v":3},{"n":"e","v":4},{"n":"f","v":5},{"n":"fis","v":6},{"n":"ges","v":6},{"n":"g","v":7},{"n":"gis","v":8},{"n":"as","v":8},{"n":"a","v":9},{"n":"b","v":10},{"n":"ais","v":10},{"n":"h","v":11},{"n":"ces","v":11}];

            for( var i=0; keyindex.length>i; i++ ){
                if( keyPositions[i].n === tone ){
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

            dur : {
                grund   : 0,
                terz    : 4,
                quinte  : 7,
                septime : 10,
                septime_dur : 11
            },
            moll : {
                grund   : 0,
                terz    : 3,
                quinte  : 7,
                septime : 10,
                septime_dur : 11
            },
            ver : {
                grund   : 0,
                terz    : 3,
                quinte  : 6,
                septime : 9
            },
            ueber : {
                grund   : 0,
                terz    : 4,
                quinte  : 8,
                septime : 10
            }

        },

        harmonie : {

            dur : [
            ],

            moll : [
            ]

        }

    }

}