// Javascript Document by Francesco Changhyun Cho.

var Harmony = {

    // This method return a seven scale degree.
    create : function(option){ // option : tone, tonality
        
        return getHarmony(option.tone, option.tonality);
        
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

            return ['c','cis','d','dis','e','f','fis','g','gis','a','b','h'];

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

        harmonyset : {

            "dur" : [
                {"name" : "tonika", "nameShort" : "T", "tonality" : "dur", "septime" : "dur", "interval" : 0 },
                {"name" : "sub-dominant", "nameShort" : "S", "tonality" : "dur", "interval" : 5 },
                {"name" : "sub-dominant-parallele", "nameShort" : "Sp", "tonality" : "moll", "interval" : 2},
                {"name" : "tonika-parallele", "nameShort" : "Tp", "tonality" : "moll", "interval" : 9},
                {"name" : "dominant", "nameShort" : "D", "tonality" : "dur", "interval" : 7},
                {"name" : "dominant-parallele", "nameShort" : "Dp", "tonality" : "moll", "interval" : 4},
                {"name" : "vermindert-dominant", "nameShort" : "D-", "tonality" : "ver", "interval" : 11}

            ],
            "moll" : [
                {"name" : "tonika", "nameShort" : "t", "tonality" : "moll", "septime" : "dur", "interval" : 0},
                {"name" : "sub-dominant", "nameShort" : "s", "tonality" : "moll", "interval" : 5}, //
                {"name" : "sub-dominant-parallele", "nameShort" : "sP", "tonality" : "dur", "interval" : 9}, //
                {"name" : "tonika-parallele", "nameShort" : "tP", "tonality" : "dur", "interval" : 4}, //
                {"name" : "dominant", "nameShort" : "D", "tonality" : "dur", "interval" : 7}, //
                {"name" : "dominant-parallele", "nameShort" : "dP", "tonality" : "dur", "interval" : 11}, //
                {"name" : "mollsubdominantischer-sextakkord", "nameShort" : "s⁶", "tonality" : "ver", "interval" : 2}
            ]

        }

    }

}
