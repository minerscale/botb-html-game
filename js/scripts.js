var fps = 600;
var width = 32;
var height = 32;
var hi = 0;
var dt = 0;

var lastLoop = new Date;


function startGame(){

    var drawx = 0;
    var drawy = 0;

    for (drawy = height; drawy > 0; drawy--){
        for (drawx = width; drawx > 0; drawx--){
            $(".GameContainer").prepend('<span data-x="'+drawx+'" data-y="'+drawy+'" class="blue">█</span>');
        }
        $(".GameContainer").prepend('<div></div>');
    }

    setInterval(GameLoop,1000/fps)
}

function GameLoop()
{
    var ih = Math.floor(hi)
    var thisLoop = new Date;
    var framerate = 1000 / (thisLoop - lastLoop);
    lastLoop = thisLoop;
    $("#fps").html("fps: " + Math.round(framerate))
    dt = 1/framerate
    $("#dt").html("dt: " + dt)

    var color
    if (ih % (width*height*2) >= width*height){
        color = "black"
    }
    else{
        color = "green"
    }

    SetColor((ih%width)+1,(Math.floor(ih/width)%height)+1,color)
    hi += dt*9000;
}

function SetColor(x,y,color)
{
    $('[data-x="'+x+'"][data-y="'+y+'"]').attr("class",color)
}

startGame()