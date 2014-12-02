// javascript document by Franziskus Changhyun Cho

var Cake = {

    create : function(option){

// option의 디폴트값이자 마크업
//        var option = {
//            tone : 'a',
//            tonart : 'dur',
//
//            cakeColor : "FF0033",
//            fontColor : "FFFFFF",
//            hexagonWidth : 138,
//            hexagonHeight : 118,
//            hexagonGutter : 3,
//            hexagonRatio : 0.749
//        };

        var dom = {
            wrapper : null,
            cake : null,
            hexagons : [
                {elem : null, id : "hex1", top : 0, left : 0},
                {elem : null, id : "hex2", top : (option.hexagonHeight + option.hexagonGutter) * -1, left : 0},
                {elem : null, id : "hex3", top : ((option.hexagonHeight / 2) + (option.hexagonGutter / 2)) * -1, left : (option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)},
                {elem : null, id : "hex4", top : (option.hexagonHeight / 2) + (option.hexagonGutter / 2), left : (option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)},
                {elem : null, id : "hex5", top : option.hexagonHeight + option.hexagonGutter, left: 0},
                {elem : null, id : "hex6", top : (option.hexagonHeight / 2) + (option.hexagonGutter / 2), left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * -1},
                {elem : null, id : "hex7", top : ((option.hexagonHeight / 2) + (option.hexagonGutter / 2)) * -1, left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * -1}
                // hexagon on outside
            ]
        };

        var tone = option.tone;
        var tonality = option.tonality

        makeCake();

        function makeCake(){

            setupWrapper();
            setupCake();
            setupHexagons();

        }

        function setupWrapper(){
            if ( info.created ){
                var elem = document.getElementById('cake-wrapper');
                elem.parentNode.removeChild(elem);
            }

            dom.wrapper = document.createElement('div');
            dom.wrapper.className = 'cake-wrapper';
            dom.wrapper.id = 'cake-wrapper';
            dom.wrapper.style.position = 'absolute';
            dom.wrapper.style.display = 'block';
            // wrapper의 가로 세로를 굳이 정의해야 할 지에 대해 다시 생각해보기.
            dom.wrapper.style.width = (option.hexagonWidth * 5) + (option.hexagonGutter * 4) + 'px';
            dom.wrapper.style.height = (option.hexagonHeight * 5) + (option.hexagonGutter * 4) + 'px';
            dom.wrapper.style.top = '50%';
            dom.wrapper.style.left = '50%';
            dom.wrapper.style.marginLeft = '-' + ((option.hexagonWidth * 5) + (option.hexagonGutter * 4)) / 2 + 'px';
            dom.wrapper.style.marginTop = '-' + ((option.hexagonHeight * 5) + (option.hexagonGutter * 4)) / 2 + 'px';

            dom.wrapper.style.padding = 0;

            document.body.appendChild(dom.wrapper);

//            tonecake.status.created = 'yes';

        }

        function setupCake(){

            dom.cake = document.createElement('div');
            dom.cake.className = 'cake';
            dom.cake.style.position = 'relative';
            dom.cake.style.display = 'block';
            dom.cake.style.width = option.hexagonWidth + 'px';
            dom.cake.style.height = option.hexagonHeight + 'px';
            dom.cake.style.top = '50%';
            dom.cake.style.margin = '0 auto';
            dom.cake.style.marginTop = '-' + option.hexagonHeight / 2 + 'px';

            dom.wrapper.appendChild(dom.cake);

        }

        function setupHexagons(){

            var harmony = Harmony.create({
                tone : tone,
                tonality : tonality
            });
            // NOTE : 조성(tonart)인자를 어떻게 전달할것인지 그 방법에 대하여 생각해볼만 하다.

            var i = null;
            for( i = 0; dom.hexagons.length > i; i += 1 ) {

                dom.hexagons[i].elem = document.createElement('div');
                dom.hexagons[i].elem.id = dom.hexagons[i].id;
                // 이곳에서 화성을 컨트롤하는 스위치를 켠다.
//                dom.hexagons[i].elem.setAttribute('onMousedown', 'tonecake.play("' + harmony.harmony[i].tonart + '","' + harmony.harmony[i].akkord.grund + '","' + harmony.harmony[i].akkord.terz + '","' + harmony.harmony[i].akkord.quinte + '","' + harmony.harmony[i].akkord.septime + '","' + dom.hexagons[i].id + '")');

                dom.hexagons[i].elem.setAttribute('onMousedown', 'tonecake.play("' + harmony.harmony[i].tonart + '","' + dom.hexagons[i].id + '")');
                dom.hexagons[i].elem.setAttribute('onMouseup','tonecake.stop("' + dom.hexagons[i].id + '")');

                dom.hexagons[i].elem.className = 'hexagon';
                dom.hexagons[i].elem.style.position = 'absolute';
                dom.hexagons[i].elem.style.top = dom.hexagons[i].top + 'px';
                dom.hexagons[i].elem.style.left = dom.hexagons[i].left + 'px';
                dom.hexagons[i].elem.style.display = 'block';
                dom.hexagons[i].elem.style.width = option.hexagonWidth + 'px';
                dom.hexagons[i].elem.style.height = option.hexagonHeight + 'px';

                dom.cake.appendChild(dom.hexagons[i].elem);

                // hexagons' content (wrapper)

                var content = document.createElement('div');
                content.style.position = 'absolute';
                content.style.color = '#' + option.fontColor;
                content.style.textAlign = 'center';
                content.style.lineHeight = 1.25;

                dom.hexagons[i].elem.appendChild(content);

                // (content)

                var name = document.createElement('div');
                name.style.fontSize = '2em';
                name.style.cursor= 'default';
                name.innerHTML = harmony.harmony[i].nameShort;

                content.appendChild(name);

                var description = document.createElement('div');
                description.style.fontSize = '1em';
                description.style.cursor= 'default';
                description.innerHTML = harmony.harmony[i].tonart;

                content.appendChild(description);

                // wrapper의 위치를 조정함

                content.style.top = '50%';
                content.style.left = '50%';
                content.style.marginTop = '-' + content.offsetHeight / 2 + 'px';
                content.style.marginLeft = '-' + content.offsetWidth / 2 + 'px';

            }

        }

    },
    response : function(){
    },
    animate : function (){
    }

}
