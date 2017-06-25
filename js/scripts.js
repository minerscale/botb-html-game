var fps = 20,
    width = 32,
    height = 32,
    samplenum = 0,
    bitrate = 44100,
    count = 0,
    mouseDown = 0,
    pixelSelector, currentColor = "white",
    lastLoop = new Date,
    audioContext;

function startGame() {
    musicProcessingNode.connect(audioContext.destination), musicProcessingNode.start;
    var e = 0,
        o = 0;
    for (o = height; o > 0; o--)
        for ($(".GameContainer").prepend("<br>"), e = width; e > 0; e--) $(
            ".GameContainer").prepend('<span data-x="' + e + '"data-y="' +
            o + '" class="pixel white">█</span>');
    setInterval(updateGame, 1e3 / fps)
}

function updateGame() {
    var e = new Date,
        o = 1e3 / (e - lastLoop);
    lastLoop = e
//    $("#fpscounter").html(o);
    
    $("*").mouseenter(function() {
        pixelSelector = $(this), $(this).hasClass("pixel") ? mouseDown ?
            $(this).attr("class", "pixel " + currentColor) : $(this).css(
                "color", currentColor) : mouseDown = 0
    }).mouseleave(function() {
        $(this).css("color", "")
    })
}

function changeColor(e) {
    currentColor = e
}

try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext,
        audioContext = new AudioContext
} catch (e) {
    alert("Web Audio API is not supported in this browser")
}
var bufferSize = 4096,
    musicProcessingNode = audioContext.createScriptProcessor(bufferSize, 1, 1);
musicProcessingNode.onaudioprocess = function(e) {
    for (var o = e.outputBuffer.getChannelData(0), t = 0; t < bufferSize; t++)
        o[t] = bytebeat(samplenum), samplenum += 1
}

document.body.onmousedown = function() {
    mouseDown = 1, $(pixelSelector).hasClass("pixel") && $(pixelSelector).attr(
        "class", "pixel " + currentColor)
}
document.body.onmouseup = function() {
    mouseDown = 0
};