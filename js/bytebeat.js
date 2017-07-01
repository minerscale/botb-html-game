const C0=-48,Cs0=-47,D0=-46,Ds0=-45,E0=-44,F0=-43,Fs0=-42,G0=-41,Gs0=-40,A0=-39,As0=-38,B0=-37,C1=-36,Cs1=-35,D1=-34,Ds1=-33,E1=-32,F1=-31,Fs1=-30,G1=-29,Gs1=-28,A1=-27,As1=-26,B1=-25,C2=-24,Cs2=-23,D2=-22,Ds2=-21,E2=-20,F2=-19,Fs2=-18,G2=-17,Gs2=-16,A2=-15,As2=-14,B2=-13,C3=-12,Cs3=-11,D3=-10,Ds3=-9,E3=-8,F3=-7,Fs3=-6,G3=-5,Gs3=-4,A3=-3,As3=-2,B3=-1,C4=0,Cs4=1,D4=2,Ds4=3,E4=4,F4=5,Fs4=6,G4=7,Gs4=8,A4=9,As4=10,B4=11,C5=12,Cs5=13,D5=14,Ds5=15,E5=16,F5=17,Fs5=18,G5=19,Gs5=20,A5=21,As5=22,B5=23,C6=24,Cs6=25,D6=26,Ds6=27,E6=28,F6=29,Fs6=30,G6=31,Gs6=32,A6=33,As6=34,B6=35,C7=36,Cs7=37,D7=38,Ds7=39,E7=40,F7=41,Fs7=42,G7=43,Gs7=44,A7=45,As7=46,B7=47,C8=48,Cs8=49,D8=50,Ds8=51,E8=52,F8=53,Fs8=54,G8=55,Gs8=56,A8=57,As8=58,B8=59;class soundSystem{constructor(a,b,c,d){this.musicTickRate=a,this.patternLen=b,this.musicTick=0,this.songLen=c,this.patterns=d,this.curPattern=0,this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.volume=this.audioContext.createGain(),this.volume.gain.value=0.1,this.volume.connect(this.audioContext.destination),this.repeat=setInterval(()=>{this.bytebeat()},1e3/this.musicTickRate)}bytebeat(){this.curPattern=Math.floor(this.musicTick/this.patternLen),this.curPattern==this.songLen&&(this.curPattern=0,this.musicTick=0);for(var a=0;a<this.patterns.length;a++)1==this.patterns[a].when[this.curPattern]&&this.playPattern(this.patterns[a]);this.musicTick+=1}playPattern(a){a.index[0]>=a.notes.length&&(a.index[0]=0),0==a.index[1]?(a.index[1]=a.len[a.index[0]]-1,this.newNote(a.notes[a.index[0]],a.instrument,a.volume[a.index[0]],a.attack,a.decay,a.notelen[a.index[0]]),a.index[0]+=1):a.index[1]-=1}newNote(a,b,c,d,f,g){var h={oscillator:this.audioContext.createOscillator(),envelope:this.audioContext.createGain()};if(isFinite(a)){h.oscillator.connect(h.envelope),h.envelope.connect(this.volume),h.oscillator.type=b,h.oscillator.frequency.value=440*2**((a-9)/12),h.envelope.gain.value=0;try{h.envelope.gain.setTargetAtTime(c,this.audioContext.currentTime,d)}catch(j){throwError(j)}h.oscillator.start()}setTimeout(()=>{h.envelope.gain.setTargetAtTime(0,this.audioContext.currentTime,f)},1e3*(g/this.musicTickRate))}}function updateSong(){try{audio.audioContext.close(),clearInterval(audio.repeat),console.log("destroyed Context")}catch(a){}var patternData=[];try{for(i=1;i<=patternNo;i++)patternData.push({notes:eval("["+$(".notes."+i).val()+"]"),len:eval("["+$(".length."+i).val()+"]"),notelen:eval("["+$(".notelen."+i).val()+"]"),volume:eval("["+$(".volume."+i).val()+"]"),when:eval("["+$(".when."+i).val()+"]"),attack:eval($(".attack."+i).val()),decay:eval($(".decay."+i).val()),instrument:$(".instrument."+i).val(),index:[0,0]})}catch(a){throwError(a)}window.audio=new soundSystem($("#speed").val(),$("#patternLen").val(),$("#songLen").val(),patternData)}var patternNo=0;function addPattern(){patternNo+=1,$("#container").append("        <div id="+patternNo+>        <h3>Pattern #"+patternNo+":</h3>        <button id=p"+patternNo+ onclick=hidePattern("+patternNo+")>Hide Pattern</button><br>        <div id=b"+patternNo+>                <p>Note Values: </p><input type=text class=notes "+patternNo+ value=C4,E4,G4><br>        <p>Ticks to next note: </p><input type=text class=length "+patternNo+ value=1,1,1><br>        <p>Note Length: </p><input type=text class=notelen "+patternNo+ value=1,1,1><br>        <p>Note Volume: </p><input type=text class=volume "+patternNo+ value=1,1,1><br>        <p>When To Play: </p><input type=text class=when "+patternNo+ value=1,1><br>                <p>Attack: </p><input type=number class=attack "+patternNo+ value=0.015 step=0.001><br>        <p>Decay: </p><input type=number class=decay "+patternNo+ value=0.015 step=0.001><br>                <p>Instrument: </p>        <select class=instrument "+patternNo+>            <option value=sine>Sine</option>            <option value=square>Square</option>            <option value=sawtooth>Sawtooth</option>            <option value=triangle>Triangle</option>        </select><br>        </div>"),hidePattern(patternNo)}function removePattern(){0<patternNo&&($("#"+patternNo).remove(),patternNo-=1)}function stopSong(){try{audio.audioContext.close(),clearInterval(audio.repeat),console.log("destroyed Context"),audio=void 0}catch(a){}}function hidePattern(a){var b=$("#p"+a),c=$("#b"+a);"none"===c.css("display")?(c.css("display","block"),b.html("Hide Pattern")):(c.css("display","none"),b.html("Show Pattern"))}function saveSong(){$("input").each(function(){$(this).attr("value",$(this).val())}),$(".instrument").each(function(){$(this).children().attr("selected",!1),$(this).children("[value="+$(this).val()+"]").attr("selected",!0)}),$("#globals").attr("data-pattern",patternNo);var a=btoa(btoa($("#container").html()));localStorage.setItem("saved",a),$("#globals").html(a),copyToClipboard($("#globals")[0])}function loadSong(a){try{$("#container").html(atob(atob(a))),patternNo=parseInt($("#globals").attr("data-pattern"))}catch(b){throwError("That's not a valid save!")}}function copyToClipboard(a){var d,f,b="_hiddenCopyText_",c="INPUT"===a.tagName||"TEXTAREA"===a.tagName;if(c)g=a,d=a.selectionStart,f=a.selectionEnd;else{if(g=document.getElementById(b),!g){var g=document.createElement("textarea");g.style.position="absolute",g.style.left="-9999px",g.style.top="0",g.id=b,document.body.appendChild(g)}g.textContent=a.textContent}var h=document.activeElement;g.focus(),g.setSelectionRange(0,g.value.length);var j;try{j=document.execCommand("copy")}catch(k){j=!1}return h&&"function"==typeof h.focus&&h.focus(),c?a.setSelectionRange(d,f):g.textContent="",throwError("Saved to localStorage. Also Copied!"),j}var errors;function throwError(a){$("#error").html(a),clearTimeout(errors),errors=setTimeout(function(){$("#error").html("")},3e3)}addPattern(),hidePattern(1);