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
