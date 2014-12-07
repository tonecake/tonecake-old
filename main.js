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
