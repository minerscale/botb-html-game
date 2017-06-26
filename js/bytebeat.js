var musicTickRate=16
var musicTick=0;

var audioContext = new (window.AudioContext || window.webkitAudioContext)();;
var volume = audioContext.createGain()

volume.gain.value = 0.1
volume.connect(audioContext.destination)

var square1 = audioContext.createOscillator()
square1.type = 'square'
square1.connect(volume)
setNote(square1,0)
square1.start()

var square2 = audioContext.createOscillator()
square2.type = 'square'
setNote(square2,4)
square2.connect(volume)
square2.start()

var square3 = audioContext.createOscillator()
square3.type = 'square'
setNote(square3,7)
square3.connect(volume)
square3.start()


setInterval(function(){ bytebeat(); },1000/musicTickRate)

function bytebeat() {
    musicTick += 1;
    setNote(square1,musicTick>>5)
    setNote(square2,(musicTick>>5)+4)
    setNote(square3,(musicTick>>5)+7)
}

function setNote(osc,note){
    osc.frequency.value=(440*(2**((note-9)/12)))
}