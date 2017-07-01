class soundSystem{
    constructor(musicTickRate,patternLen,songLen,patterns){
        this.musicTickRate = musicTickRate
        this.patternLen = patternLen
        this.musicTick=0
        this.songLen = songLen

        this.patterns = patterns
        this.curPattern = 0

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
        this.volume = this.audioContext.createGain()

        this.volume.gain.value = 0.1
        this.volume.connect(this.audioContext.destination)

        this.repeat = setInterval(()=>{this.bytebeat()},1000/this.musicTickRate)
    }


    bytebeat() {
        this.curPattern = Math.floor(this.musicTick/this.patternLen)
        if (this.curPattern == this.songLen){
            this.curPattern = 0
            this.musicTick = 0
        }
        for (var i=0;i<this.patterns.length;i++){
            if (this.patterns[i].when[this.curPattern] == 1){
                this.playPattern(this.patterns[i])
            }
        }
        this.musicTick += 1
    }

    playPattern(pattern){
        if (pattern.index[0] >= pattern.notes.length){
            pattern.index[0] = 0
        }
        if (pattern.index[1] == 0){
            pattern.index[1] = pattern.len[pattern.index[0]]-1
            this.newNote(pattern.notes[pattern.index[0]],pattern.instrument,pattern.volume[pattern.index[0]],pattern.attack,pattern.decay,pattern.notelen[pattern.index[0]])
            pattern.index[0] += 1
        }else{
            pattern.index[1] -= 1
        }
    }

    newNote(note,type,vol,attack,decay,notelen){
        // Oscilator -> Envelope -> Master Volume -> Destination
        var noteval = {
            oscillator:this.audioContext.createOscillator(),
            envelope:this.audioContext.createGain(),
        }

        if (isFinite(note)){
            noteval.oscillator.connect(noteval.envelope)
            noteval.envelope.connect(this.volume)
            noteval.oscillator.type = type
            noteval.oscillator.frequency.value = (440*(2**((note-9)/12)))
            noteval.envelope.gain.value = 0
            try{
                noteval.envelope.gain.setTargetAtTime(vol, this.audioContext.currentTime, attack)
            }catch(err){
                $("#error").html(err)
            }
            noteval.oscillator.start()
        }
        setTimeout(()=>{
            noteval.envelope.gain.setTargetAtTime(0, this.audioContext.currentTime, decay)
        },1000*(notelen/this.musicTickRate))
    }
}
//-----------------------------------------------------------------------------

function updateSong(){
    try {
        audio.audioContext.close()
        clearInterval(audio.repeat)
        console.log("destroyed Context")
    }
    catch(err){

    }
    var patternData = []
    $("#error").html("")

    try{
        for (i=1;i<=patternNo;i++){
        patternData.push({
            notes:      eval("["+$(".notes."+i).val()+"]"),
            len:        eval("["+$(".length."+i).val()+"]"),
            notelen:    eval("["+$(".notelen."+i).val()+"]"),
            volume:     eval("["+$(".volume."+i).val()+"]"),
            when:       eval("["+$(".when."+i).val()+"]"),
            attack:     eval($(".attack."+i).val()),
            decay:      eval($(".decay."+i).val()),
            instrument: $(".instrument."+i).val(),
            index: [0,0]})
        }
    }catch(err){
        $("#error").html(err)
    }
    window.audio = new soundSystem(8,$("#patternLen").val(),$("#songLen").val(),patternData)
}

var patternNo = 0

function addPattern(){
    patternNo += 1
    $("#container").append('\
        <div id="'+patternNo+'">\
        <h3>Pattern #'+patternNo+':</h3>\
        <button id="p'+patternNo+'" onclick="hidePattern('+patternNo+')">Hide Pattern</button><br>\
        <div id="b'+patternNo+'">\
        \
        <p>Note Values: </p><input type="text" class="notes '+patternNo+'" value="0,4,7"><br>\
        <p>Ticks to next note: </p><input type="text" class="length '+patternNo+'" value="1,1,1"><br>\
        <p>Note Length: </p><input type="text" class="notelen '+patternNo+'" value="1,1,1"><br>\
        <p>Note Volume: </p><input type="text" class="volume '+patternNo+'" value="1,1,1"><br>\
        <p>When To Play: </p><input type="text" class="when '+patternNo+'" value="1,1"><br>\
        \
        <p>Attack: </p><input type="number" class="attack '+patternNo+'" value=0.015 step=0.001><br>\
        <p>Decay: </p><input type="number" class="decay '+patternNo+'" value=0.015 step=0.001><br>\
        \
        <p>Instrument: </p>\
        <select class="instrument '+patternNo+'">\
            <option value="sine">Sine</option>\
            <option value="square">Square</option>\
            <option value="sawtooth">Sawtooth</option>\
            <option value="triangle">Triangle</option>\
        </select><br>\
        </div>')

    hidePattern(patternNo)
}

function removePattern(){
    if(patternNo > 0){
        $("#"+patternNo).remove()
        patternNo -= 1
    }
}

function stopSong(){
    try {
        audio.audioContext.close()
        clearInterval(audio.repeat)
        console.log("destroyed Context")
        audio = undefined;
    }
    catch(err){

    }
}

function hidePattern(pattern){
    var p = $("#p"+pattern)
    var x = $("#b"+pattern)
    if (x.css("display") === 'none') {
        x.css("display","block")
        p.html("Hide Pattern")
    } else {
        x.css("display","none")
        p.html("Show Pattern")
    }
}

function saveSong(){
    $("input").each(function(){
        $(this).attr("value",$(this).val())
    })
    $(".instrument").each(function(){
        $(this).children().attr("selected",false)
        $(this).children("[value="+$(this).val()+"]").attr("selected",true)
    })

    $("#globals").attr("data-pattern",patternNo)

    var output = btoa(btoa($("#container").html()))
    localStorage.setItem("saved",output)

    $("#globals").html(output)
    copyToClipboard($('#globals')[0])
}

function loadSong(input){
    $("#container").html(atob(atob(input)))
    patternNo = parseInt($("#globals").attr("data-pattern"))
}

function copyToClipboard(elem) {
      // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = elem.textContent;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
          succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}

addPattern()
