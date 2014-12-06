var frequency = {

    // 음이름과 옥타브를 넣으면 주파수로 반환하는 함수
    find : function(tone, octave){

        if( !tone || !octave ){

            console.log("Error : Invalid argument / example) frequency.find(tone, octave)");
            return 0;

        }

        if( octave > 8 ){

            octave = 8;

            console.log("Error : Invaild value of argumenet (octave) / octave value rage : 0~8.");

        }

        var freq;

        for( var i=0; i<frequency.data.length; i++ ){

            if( frequency.data[i].name === tone ){

                freq = frequency.data[i].freq;

            }

        }

        switch( octave ){
            case '0' :
                return freq / 16;
                break;
            case '1' :
                return freq / 8;
                break;
            case '2' :
                return freq / 4;
                break;
            case '3' :
                return freq / 2;
                break;
            case '4' :
                return freq;
                break;
            case '5' :
                return freq * 2
                break;
            case '6' :
                return freq * 4
                break;
            case '7' :
                return freq * 8
                break;
            case '8' :
                return freq * 16

        }

    },

    data : [
        {
            "name": "c",
            "freq": 262.81
        },
        {
            "name": "cis",
            "freq": 278.44
        },
        {
            "name": "des",
            "freq": 278.44
        },
        {
            "name": "d",
            "freq": 295
        },
        {
            "name": "dis",
            "freq": 312.54
        },
        {
            "name": "es",
            "freq": 312.54
        },
        {
            "name": "e",
            "freq": 331.13
        },
        {
            "name": "f",
            "freq": 350.82
        },
        {
            "name": "fis",
            "freq": 371.68
        },
        {
            "name": "ges",
            "freq": 371.68
        },
        {
            "name": "g",
            "freq": 393.78
        },
        {
            "name": "gis",
            "freq": 417.19
        },
        {
            "name": "as",
            "freq": 417.19
        },
        {
            "name": "a",
            "freq": 442
        },
        {
            "name": "b",
            "freq": 468.28
        },
        {
            "name": "h",
            "freq": 496.13
        }
    ]

}
