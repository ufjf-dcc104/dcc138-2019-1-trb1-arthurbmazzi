
(function (){
    var a = document.querySelector('canvas');
    var b = a.getContext('2d');

    //Funções

    var sprites = [];
    var assetsToLoad = [];

    var img = new Image();
    img.addEventListener('load', loadHandler, false);
    img.src = "img";
    assetsToLoad.push(img);

    var loadedAssets = 0;
    

    //Variáveis
    var esq = 37, dir = 39, enter = 13, space = 32;
    var mesq = mdir = false;

    //Estados
    var loading = 0, jogando = 1, pause = 2, gg = 3;
    var padrao = loading;

    //Comandos de teclas
    window.addEventListener('keydown', function(e){
        var key = e.keyCode;
        switch(key){
            case esq:
                mesq = true;
                break;
            case dir:
                mdir = true;
                break;
        }
                
    }, false);
    window.addEventListener('keyup', function(e){
        var key = e.keyCode;
        switch(key){
            case esq:
                mesq = false;
                break;
            case dir:
                mdir = false;
                break;
            case enter:
                if(padrao !== jogando){
                    padrao = jogando;
                }
                else{
                    padrao = pause;
                }
        }               
    }, false);
}())

function loadHandler()
{
    loadedAssets++;
    if(loadedAssets === assetsToLoad.length){
        img.removeEventListener('load', loadHandler, false);
        padrao = pause;
    }
}
function loop(){
    requestAnimationFrame(loop, a);
    switch(padrao){
        case loading:
            console.log('Loading...');
            break;
        case jogando:
            update();
            break;
    }
    renderizar();
}

function update(){
    alert('update ok');
}
function renderizar(){

}
loop();