
(function (){
    var a = document.querySelector("canvas");
    var b = a.getContext("2d");

    //Funções

    var sprites = [];
    var assetsToLoad = [];
    var tiros = [];

    var defender = new Sprite(0,0,35,40,0,330);
    sprites.push(defender);

    var img = new Image();
    img.addEventListener("load", loadHandler, false);
    img.src = "img/img.jpg";
    assetsToLoad.push(img);

    var loadedAssets = 0;
    
    //Variáveis
    var esq = 37, dir = 39, enter = 13, space = 32;
    var mesq = mdir = shoot = spaceisDown = false;


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
            case space:
                if(!spaceisDown)
                { 
                    shoot = true;
                    spaceisDown = true;
                }
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
                if(padrao != jogando){
                    padrao = jogando;
                }
                else{
                    padrao = pause;
                }
                break;
            case space:
                spaceisDown = false;
        }               
    }, false);

function loadHandler(){
    loadedAssets++;
    if(loadedAssets == assetsToLoad.length){
        img.removeEventListener("load", loadHandler, false);
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
    render();
}

function update(){
    if(mesq && !mdir)
    {
        defender.vx = -5;
    }
    if(mdir && !mesq)
    {
        defender.vx = 5
    }
    if(!mdir && !mesq)
    {
        defender.vx = 0;
    }
    if(shoot)
    {
        Fire();
        shoot = false;
    }
    defender.x = Math.max(0, Math.min(a.width - defender.width, defender.x + defender.vx));
    for(var i in tiros)
    {
        var tiro = tiros[i];
        tiro.y += tiro.vy;
    }

}
function Fire(){
    var tiro = new Sprite(500, 300, 8, 13, defender.centerX() - 4,
        defender.y - 13);
    tiro.vx = -8;
    sprites.push(tiro);
    tiros.push(tiro);
}

function render(){
    b.clearRect(0,0, a.width, a.height);
    if(sprites.length != 0){
        for(var i in sprites)
            var spr = sprites[i];
            b.drawImage(img, spr.sourceX, spr.sourceY, spr.width, spr.height, 
                        Math.floor(spr.x), Math.floor(spr.y), spr.width, spr.height);
    }
}
loop();


}())