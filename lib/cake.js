// javascript document by Franziskus Changhyun Cho

var Cake = {

    create : function(option){

//        var option = {
//            harmony : {Object},
//            cakeColor : HEX_COLOR,
//            fontColor : HEX_COLOR,
//            hexagonWidth : num_px
//            hexagonHeight : num_px,
//            hexagonGutter : num_px,
//            hexagonRatio : num_ >1
//        };

        var dom = {
            wrapper : null,
            cake : null,
            hexagons : [
                {elem : null, id : "hex0", top : 0, left : 0},
                {elem : null, id : "hex1", top : (option.hexagonHeight + option.hexagonGutter) * -1, left : 0},
                {elem : null, id : "hex2", top : ((option.hexagonHeight / 2) + (option.hexagonGutter / 2)) * -1, left : (option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)},
                {elem : null, id : "hex3", top : (option.hexagonHeight / 2) + (option.hexagonGutter / 2), left : (option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)},
                {elem : null, id : "hex4", top : option.hexagonHeight + option.hexagonGutter, left: 0},
                {elem : null, id : "hex5", top : (option.hexagonHeight / 2) + (option.hexagonGutter / 2), left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * -1},
                {elem : null, id : "hex6", top : ((option.hexagonHeight / 2) + (option.hexagonGutter / 2)) * -1, left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * -1},
                // hexagon on outside
                {elem : null, id : "hex7", top : ((option.hexagonHeight * 2) + (option.hexagonGutter * 2)) * -1, left : 0},
                {elem : null, id : "hex8", top : ((option.hexagonHeight / 2) + option.hexagonHeight + (option.hexagonGutter / 2) + option.hexagonGutter) * -1, left : (option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)},
                {elem : null, id : "hex9", top : (option.hexagonHeight + option.hexagonGutter) * -1, left : ((option.hexagonWidth * option.hexagonRatio) * 2) + (option.hexagonGutter * 2)},
                {elem : null, id : "hex10", top : 0, left : ((option.hexagonWidth * option.hexagonRatio) * 2) + (option.hexagonGutter * 2)},
                {elem : null, id : "hex11", top : (option.hexagonHeight + option.hexagonGutter), left : ((option.hexagonWidth * option.hexagonRatio) * 2) + (option.hexagonGutter * 2)},
                {elem : null, id : "hex12", top : ((option.hexagonHeight / 2) + option.hexagonHeight + (option.hexagonGutter / 2) + option.hexagonGutter), left : (option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)},
                {elem : null, id : "hex13", top : ((option.hexagonHeight * 2) + (option.hexagonGutter * 2)), left : 0},
                {elem : null, id : "hex14", top : ((option.hexagonHeight / 2) + option.hexagonHeight + (option.hexagonGutter / 2) + option.hexagonGutter), left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * -1},
                {elem : null, id : "hex15", top : (option.hexagonHeight + option.hexagonGutter), left : (((option.hexagonWidth * option.hexagonRatio) * 2) + (option.hexagonGutter * 2)) * -1},
                {elem : null, id : "hex16", top : 0, left : (((option.hexagonWidth * option.hexagonRatio) * 2) + (option.hexagonGutter * 2)) * -1},
                {elem : null, id : "hex17", top : (option.hexagonHeight + option.hexagonGutter) * -1, left : (((option.hexagonWidth * option.hexagonRatio) * 2) + (option.hexagonGutter * 2)) * -1},
                {elem : null, id : "hex18", top : ((option.hexagonHeight / 2) + option.hexagonHeight + (option.hexagonGutter / 2) + option.hexagonGutter) * -1, left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * -1},
                //
                {elem : null, id : "hex19", top : ((option.hexagonHeight * 3) + (option.hexagonGutter * 3)) * -1, left : 0},
                {elem : null, id : "hex20", top : ((option.hexagonHeight / 2) + (option.hexagonHeight * 2) + (option.hexagonGutter / 2) + (option.hexagonGutter * 2)) * -1, left : (option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)},
                {elem : null, id : "hex21", top : ((option.hexagonHeight / 1) + (option.hexagonHeight * 1) + (option.hexagonGutter / 1) + (option.hexagonGutter * 1)) * -1, left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * 2},
                {elem : null, id : "hex22", top : ((option.hexagonHeight / 2) + option.hexagonHeight + (option.hexagonGutter / 2) + option.hexagonGutter) * -1, left : ((option.hexagonWidth * option.hexagonRatio) * 3) + (option.hexagonGutter * 3)},
                {elem : null, id : "hex23", top : ((option.hexagonHeight / 2) + (option.hexagonHeight * -1) + (option.hexagonGutter / 2) + (option.hexagonGutter * -1)) * 1, left : ((option.hexagonWidth * option.hexagonRatio) * 3) + (option.hexagonGutter * 3)},
                {elem : null, id : "hex24", top : ((option.hexagonHeight / 2) + (option.hexagonHeight * -1) + (option.hexagonGutter / 2) + (option.hexagonGutter * -1)) * -1, left : ((option.hexagonWidth * option.hexagonRatio) * 3) + (option.hexagonGutter * 3)},
                {elem : null, id : "hex25", top : ((option.hexagonHeight / 2) + option.hexagonHeight + (option.hexagonGutter / 2) + option.hexagonGutter) * 1, left : ((option.hexagonWidth * option.hexagonRatio) * 3) + (option.hexagonGutter * 3)},
                {elem : null, id : "hex26", top : ((option.hexagonHeight / 2) + (option.hexagonHeight * 2) + (option.hexagonGutter / 2) + (option.hexagonGutter * 2)) * 1, left : (option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)},
                {elem : null, id : "hex27", top : ((option.hexagonHeight / 1) + (option.hexagonHeight * 1) + (option.hexagonGutter / 1) + (option.hexagonGutter * 1)) * 1, left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * 2},
                {elem : null, id : "hex28", top : ((option.hexagonHeight * 3) + (option.hexagonGutter * 3)) * 1, left : 0},
                {elem : null, id : "hex29", top : ((option.hexagonHeight / 1) + (option.hexagonHeight * 1) + (option.hexagonGutter / 1) + (option.hexagonGutter * 1)) * 1, left : (((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * 2) * -1},
                {elem : null, id : "hex30", top : ((option.hexagonHeight / 2) + (option.hexagonHeight * 2) + (option.hexagonGutter / 2) + (option.hexagonGutter * 2)) * 1, left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * -1},
                {elem : null, id : "hex31", top : ((option.hexagonHeight / 2) + option.hexagonHeight + (option.hexagonGutter / 2) + option.hexagonGutter) * 1, left : (((option.hexagonWidth * option.hexagonRatio) * 3) + (option.hexagonGutter * 3)) * -1},
                {elem : null, id : "hex32", top : ((option.hexagonHeight / 2) + (option.hexagonHeight * -1) + (option.hexagonGutter / 2) + (option.hexagonGutter * -1)) * -1, left : (((option.hexagonWidth * option.hexagonRatio) * 3) + (option.hexagonGutter * 3)) * -1},
                {elem : null, id : "hex33", top : ((option.hexagonHeight / 2) + (option.hexagonHeight * -1) + (option.hexagonGutter / 2) + (option.hexagonGutter * -1)) * 1, left : (((option.hexagonWidth * option.hexagonRatio) * 3) + (option.hexagonGutter * 3)) * -1},
                {elem : null, id : "hex34", top : ((option.hexagonHeight / 2) + option.hexagonHeight + (option.hexagonGutter / 2) + option.hexagonGutter) * -1, left : (((option.hexagonWidth * option.hexagonRatio) * 3) + (option.hexagonGutter * 3)) * -1},
                {elem : null, id : "hex35", top : ((option.hexagonHeight / 1) + (option.hexagonHeight * 1) + (option.hexagonGutter / 1) + (option.hexagonGutter * 1)) * -1, left : (((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * 2) * -1},
                {elem : null, id : "hex36", top : ((option.hexagonHeight / 2) + (option.hexagonHeight * 2) + (option.hexagonGutter / 2) + (option.hexagonGutter * 2)) * -1, left : ((option.hexagonWidth * option.hexagonRatio) + (option.hexagonGutter)) * -1},
            ]
        };

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
            dom.wrapper.style.width = (option.hexagonWidth * 3) + (option.hexagonGutter * 2) + 'px';
            dom.wrapper.style.height = (option.hexagonHeight * 3) + (option.hexagonGutter * 2) + 'px';
            dom.wrapper.style.top = '50%';
            dom.wrapper.style.left = '50%';
            dom.wrapper.style.marginLeft = '-' + ((option.hexagonWidth * 3) + (option.hexagonGutter * 2)) / 2 + 'px';
            dom.wrapper.style.marginTop = '-' + ((option.hexagonHeight * 3) + (option.hexagonGutter * 2)) / 2 + 'px';

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

            var harmony = option.harmony;

            // 모든 헥사곤을 출력하려면 dom.hexagon.length를 대입하나, 일단 7개만 출력하기위해 아래의 컨디션에 7을 대입한다.
            for( var i=0; i<7; i++ ) {

                var nameContent,
                    descContent;

                // 정의된 화성보다 많은 헥사곤을 생성할 경우에 대비하여 만든 구절.
                if( i < harmony.harmony.length){
                    nameContent = harmony.harmony[i].nameTone;
                    descContent = harmony.harmony[i].nameTonality;
                } else {
                    nameContent = '';
                    descContent = dom.hexagons[i].id;
                }

                dom.hexagons[i].elem = document.createElement('div');
                dom.hexagons[i].elem.id = dom.hexagons[i].id;
                dom.hexagons[i].elem.className = 'hexagon';
                dom.hexagons[i].elem.style.position = 'absolute';
                dom.hexagons[i].elem.style.top = dom.hexagons[i].top + 'px';
                dom.hexagons[i].elem.style.left = dom.hexagons[i].left + 'px';
                dom.hexagons[i].elem.style.display = 'block';
                dom.hexagons[i].elem.style.width = option.hexagonWidth + 'px';
                dom.hexagons[i].elem.style.height = option.hexagonHeight + 'px';

                dom.cake.appendChild(dom.hexagons[i].elem);

                // hexagons' content (wrapper)

                var coating = document.createElement('div');
                coating.style.position = 'absolute';
                coating.style.width = '100%';
                coating.style.height = '100%';
                coating.style.display = 'block';

                dom.hexagons[i].elem.appendChild(coating);

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
                name.innerHTML = nameContent;

                content.appendChild(name);

                var description = document.createElement('div');
                description.style.fontSize = '1em';
                description.style.cursor= 'default';
                description.innerHTML = descContent;

                content.appendChild(description);

                // wrapper의 위치를 조정함

                content.style.top = '50%';
                content.style.left = '50%';
                content.style.marginTop = '-' + content.offsetHeight / 2 + 'px';
                content.style.marginLeft = '-' + content.offsetWidth / 2 + 'px';

            }

        }

    }

}
