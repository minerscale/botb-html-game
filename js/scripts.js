var fps = 50;
var width = 32;
var height = 32;
var dt = 0;
var samplenum = 0;
var bitrate = 44100;
var count = 0;

var lastLoop = new Date;

var audioContext;
try {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  audioContext = new AudioContext();
} catch(e) {
  alert('Web Audio API is not supported in this browser');
}

var bufferSize = 4096;
var musicProcessingNode = audioContext.createScriptProcessor(bufferSize, 1, 1);
musicProcessingNode.onaudioprocess = function(e) {
    var output = e.outputBuffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
        // Generate and copy over PCM samples.
        output[i] = bytebeat(samplenum)
        samplenum += 1
    }
}

function startGame(){
    musicProcessingNode.connect(audioContext.destination);
    musicProcessingNode.start;

    var drawx = 0;
    var drawy = 0;

    for (drawy = height; drawy > 0; drawy--){
        $(".GameContainer").prepend('<br>');
        for (drawx = width; drawx > 0; drawx--){
            $(".GameContainer").prepend('<span data-x="'+drawx+'"data-y="'+drawy+'" class="pixel blue">█</span>');
        }
    }
    setInterval(GameLoop,1000/fps)
}

function GameLoop()
{
    var thisLoop = new Date;
    var framerate = 1000 / (thisLoop - lastLoop);
        lastLoop = thisLoop;
    $("#fps").html("fps: " + Math.round(framerate))
}

function SetColor(x,y,color)
{
    $('[data-x="'+x+'"][data-y="'+y+'"]').attr("class","pixel "+color)
}

function bytebeat(t) {
    SAMP_RATE = 44100,
    BPM = 140,
    beat = BPM * (t / SAMP_RATE) / 60,
    tick = Math.floor(beat * 48) % 3072,
    
    C = 261.63,
    Db = 277.18,
    D = 293.66,
    Eb = 311.13,
    EE = 329.63,
    F = 349.23,
    Gb = 369.99,
    G = 392.00,
    Ab = 415.30,
    A = 440.00,
    Bb = 466.16,
    B = 493.88,
    
    window.data = 
      (t > 10 && window.data) ? window.data : 
    {
      channels: [
        { //DRUMS AUX
          ndx: 0, 
          amp: 24,
          pulse: function(tick) { return 50; },
          delay: 0,
          notes: [ 
          { start: 0, end: 2, note: C/2 }, 
          { start: 48, end: 50, note: G/2 }, 
          { start: 72, end: 74, note: C/2 }, 
          { start: 96, end: 98, note: C/2 }, 
          { start: 120, end: 122, note: G/2 }, 
          { start: 168, end: 170, note: C/2 }, 
          { start: 192, end: 194, note: C/2 }, 
          { start: 240, end: 242, note: G/2 }, 
          { start: 264, end: 266, note: C/2 }, 
          { start: 288, end: 290, note: C/2 }, 
          { start: 312, end: 314, note: G/2 }, 
          { start: 360, end: 362, note: C/2 }, 
          { start: 384, end: 386, note: C/2 }, 
          { start: 432, end: 434, note: G/2 }, 
          { start: 456, end: 458, note: C/2 }, 
          { start: 480, end: 482, note: C/2 }, 
          { start: 504, end: 506, note: G/2 }, 
          { start: 552, end: 554, note: C/2 }, 
          { start: 576, end: 578, note: C/2 }, 
          { start: 624, end: 626, note: G/2 }, 
          { start: 648, end: 650, note: C/2 }, 
          { start: 672, end: 674, note: C/2 }, 
          { start: 696, end: 698, note: G/2 }, 
          { start: 744, end: 746, note: G/2 },  //pattern 0
          { start: 768, end: 770, note: C/2 }, 
          { start: 816, end: 818, note: G/2 }, 
          { start: 840, end: 842, note: C/2 }, 
          { start: 864, end: 866, note: C/2 }, 
          { start: 888, end: 890, note: G/2 }, 
          { start: 936, end: 938, note: C/2 }, 
          { start: 960, end: 962, note: C/2 }, 
          { start: 1008, end: 1010, note: G/2 }, 
          { start: 1032, end: 1034, note: C/2 }, 
          { start: 1056, end: 1058, note: C/2 }, 
          { start: 1080, end: 1082, note: G/2 }, 
          { start: 1128, end: 1130, note: C/2 }, 
          { start: 1152, end: 1154, note: C/2 }, 
          { start: 1200, end: 1202, note: G/2 }, 
          { start: 1224, end: 1226, note: C/2 }, 
          { start: 1248, end: 1250, note: C/2 }, 
          { start: 1272, end: 1274, note: G/2 }, 
          { start: 1320, end: 1322, note: C/2 }, 
          { start: 1344, end: 1346, note: C/2 }, 
          { start: 1392, end: 1394, note: G/2 }, 
          { start: 1416, end: 1418, note: C/2 }, 
          { start: 1440, end: 1442, note: C/2 }, 
          { start: 1464, end: 1466, note: G/2 }, 
          { start: 1512, end: 1514, note: G/2 }, 
          { start: 1524, end: 1526, note: G/2 },  //pattern 1
          { start: 1536, end: 1538, note: C/2 }, 
          { start: 1584, end: 1586, note: G/2 }, 
          { start: 1608, end: 1610, note: C/2 }, 
          { start: 1632, end: 1634, note: C/2 }, 
          { start: 1656, end: 1658, note: G/2 }, 
          { start: 1704, end: 1706, note: C/2 }, 
          { start: 1728, end: 1730, note: C/2 }, 
          { start: 1776, end: 1778, note: G/2 }, 
          { start: 1800, end: 1802, note: C/2 }, 
          { start: 1824, end: 1826, note: C/2 }, 
          { start: 1848, end: 1850, note: G/2 }, 
          { start: 1896, end: 1898, note: C/2 }, 
          { start: 1920, end: 1922, note: C/2 }, 
          { start: 1968, end: 1970, note: G/2 }, 
          { start: 1992, end: 1994, note: C/2 }, 
          { start: 2016, end: 2018, note: C/2 }, 
          { start: 2040, end: 2042, note: G/2 }, 
          { start: 2088, end: 2090, note: C/2 }, 
          { start: 2112, end: 2114, note: C/2 }, 
          { start: 2160, end: 2162, note: G/2 }, 
          { start: 2184, end: 2186, note: C/2 }, 
          { start: 2208, end: 2210, note: C/2 }, 
          { start: 2232, end: 2234, note: G/2 }, 
          { start: 2280, end: 2282, note: G/2 }, //pattern 2
          { start: 2304, end: 2306, note: C/2 }, 
          { start: 2352, end: 2354, note: G/2 }, 
          { start: 2376, end: 2378, note: C/2 }, 
          { start: 2400, end: 2402, note: C/2 }, 
          { start: 2424, end: 2426, note: G/2 }, 
          { start: 2472, end: 2474, note: C/2 }, 
          { start: 2496, end: 2498, note: C/2 }, 
          { start: 2544, end: 2546, note: G/2 }, 
          { start: 2568, end: 2570, note: C/2 }, 
          { start: 2592, end: 2594, note: C/2 }, 
          { start: 2616, end: 2618, note: G/2 }, 
          { start: 2664, end: 2666, note: C/2 }, 
          { start: 2688, end: 2690, note: C/2 }, 
          { start: 2736, end: 2738, note: G/2 }, 
          { start: 2760, end: 2762, note: C/2 }, 
          { start: 2784, end: 2786, note: C/2 }, 
          { start: 2808, end: 2810, note: G/2 }, 
          { start: 2856, end: 2858, note: C/2 }, 
          { start: 2880, end: 2882, note: C/2 }, 
          { start: 2928, end: 2930, note: G/2 }, 
          { start: 2952, end: 2954, note: C/2 }, 
          { start: 2976, end: 2978, note: C/2 }, 
          { start: 3000, end: 3002, note: G/2 }, 
          { start: 3024, end: 3026, note: G/2 }, 
          { start: 3048, end: 3050, note: G/2 }, 
          { start: 3060, end: 3062, note: G/2 }, //pattern 3
          ],
        },
        { // SAW BASS
          ndx: 0,
          amp: 20,
          pulse: function(tick) { return 1; },
          delay: 0,
          notes: [ 
              { start: 0, end: 60, note: C/4 }, 
          { start: 72, end: 84, note: C/2 }, 
          { start: 96, end: 108, note: C/2 }, 
          { start: 120, end: 144, note: G/8 }, 
          { start: 144, end: 168, note: B/8 }, 
          { start: 168, end: 210, note: C/4 }, 
          { start: 216, end: 258, note: C/4 }, 
          { start: 264, end: 276, note: C/4 }, 
          { start: 288, end: 330, note: C/2 }, 
          { start: 336, end: 372, note: C/4 }, 
          { start: 384, end: 444, note: B/8 }, 
          { start: 456, end: 468, note: B/4 }, 
          { start: 480, end: 492, note: B/4 }, 
          { start: 504, end: 528, note: B/8 }, 
          { start: 528, end: 552, note: D/4 }, 
          { start: 552, end: 594, note: EE/4 }, 
          { start: 600, end: 642, note: EE/4 }, 
          { start: 648, end: 660, note: EE/4 }, 
          { start: 672, end: 714, note: EE/2 }, 
          { start: 720, end: 756, note: EE/4 }, //pattern 0
          { start: 768, end: 828, note: C/4 }, 
          { start: 840, end: 852, note: C/2 }, 
          { start: 864, end: 876, note: C/2 }, 
          { start: 888, end: 912, note: G/8 }, 
          { start: 912, end: 936, note: B/8 }, 
          { start: 936, end: 978, note: C/4 }, 
          { start: 984, end: 1026, note: C/4 }, 
          { start: 1032, end: 1044, note: C/4 }, 
          { start: 1056, end: 1098, note: C/2 }, 
          { start: 1104, end: 1140, note: C/4 }, 
          { start: 1152, end: 1212, note: B/8 }, 
          { start: 1224, end: 1236, note: B/4 }, 
          { start: 1248, end: 1260, note: B/4 }, 
          { start: 1272, end: 1296, note: B/8 }, 
          { start: 1296, end: 1320, note: D/4 }, 
          { start: 1320, end: 1362, note: EE/4 }, 
          { start: 1368, end: 1410, note: EE/4 }, 
          { start: 1416, end: 1428, note: EE/4 }, 
          { start: 1440, end: 1482, note: EE/2 }, 
          { start: 1488, end: 1524, note: EE/4 }, //pattern 1
          { start: 1536, end: 1596, note: C/4 }, 
          { start: 1608, end: 1620, note: C/2 }, 
          { start: 1632, end: 1644, note: C/2 }, 
          { start: 1656, end: 1680, note: G/8 }, 
          { start: 1680, end: 1704, note: B/8 }, 
          { start: 1704, end: 1746, note: C/4 }, 
          { start: 1752, end: 1794, note: C/4 }, 
          { start: 1800, end: 1812, note: C/4 }, 
          { start: 1824, end: 1866, note: C/2 }, 
          { start: 1872, end: 1908, note: C/4 }, 
          { start: 1920, end: 1980, note: B/8 }, 
          { start: 1992, end: 2004, note: B/4 }, 
          { start: 2016, end: 2028, note: B/4 }, 
          { start: 2040, end: 2064, note: B/8 }, 
          { start: 2064, end: 2088, note: D/4 }, 
          { start: 2088, end: 2130, note: EE/4 }, 
          { start: 2136, end: 2178, note: EE/4 }, 
          { start: 2184, end: 2196, note: EE/4 }, 
          { start: 2208, end: 2250, note: EE/2 }, 
          { start: 2256, end: 2292, note: EE/4 }, //pattern 2
          { start: 2304, end: 2364, note: A/8 }, 
          { start: 2376, end: 2388, note: A/4 }, 
          { start: 2400, end: 2412, note: A/4 }, 
          { start: 2424, end: 2448, note: A/8 }, 
          { start: 2448, end: 2472, note: B/8 }, 
          { start: 2472, end: 2514, note: C/4 }, 
          { start: 2520, end: 2562, note: C/4 }, 
          { start: 2568, end: 2580, note: C/4 }, 
          { start: 2592, end: 2634, note: C/2 }, 
          { start: 2640, end: 2676, note: C/4 }, 
          { start: 2688, end: 2748, note: G/8 }, 
          { start: 2760, end: 2772, note: G/4 }, 
          { start: 2784, end: 2796, note: G/4 }, 
          { start: 2808, end: 2832, note: D/8 }, 
          { start: 2832, end: 2856, note: Gb/8 }, 
          { start: 2856, end: 2898, note: G/8 }, 
          { start: 2904, end: 2946, note: G/8 }, 
          { start: 2952, end: 2964, note: G/8 }, 
          { start: 2976, end: 3018, note: G/4 }, 
          { start: 3024, end: 3060, note: G/8 }, //pattern 3
          ],
        },
        {
          ndx: 0, //CHORDS 1/3
          amp: 8,
          pulse: function(tick) { return 50; },
          delay: 0,
          notes: [ 
          { start: 48, end: 72, note: EE }, 
          { start: 120, end: 144, note: EE }, 
          { start: 216, end: 240, note: Eb }, 
          { start: 288, end: 312, note: Eb }, 
          { start: 336, end: 360, note: Eb }, 
          { start: 432, end: 456, note: D }, 
          { start: 504, end: 528, note: D }, 
          { start: 600, end: 624, note: B/2 }, 
          { start: 672, end: 696, note: B/2 }, 
          { start: 720, end: 744, note: B/2 }, 
          { start: 816, end: 840, note: EE }, 
          { start: 888, end: 912, note: EE }, 
          { start: 984, end: 1008, note: Eb }, 
          { start: 1056, end: 1080, note: Eb }, 
          { start: 1104, end: 1128, note: Eb }, 
          { start: 1200, end: 1224, note: D }, 
          { start: 1272, end: 1296, note: D }, 
          { start: 1368, end: 1392, note: B/2 }, 
          { start: 1440, end: 1464, note: B/2 }, 
          { start: 1488, end: 1512, note: B/2 }, 
          { start: 1584, end: 1608, note: EE }, 
          { start: 1656, end: 1680, note: EE }, 
          { start: 1752, end: 1776, note: Eb }, 
          { start: 1824, end: 1848, note: Eb }, 
          { start: 1872, end: 1896, note: Eb }, 
          { start: 1968, end: 1992, note: D }, 
          { start: 2040, end: 2064, note: D }, 
          { start: 2136, end: 2160, note: B/2 }, 
          { start: 2208, end: 2232, note: B/2 }, 
          { start: 2256, end: 2280, note: B/2 }, 
          { start: 2352, end: 2376, note: EE }, 
          { start: 2424, end: 2448, note: EE }, 
          { start: 2520, end: 2544, note: Eb }, 
          { start: 2592, end: 2616, note: Eb }, 
          { start: 2640, end: 2664, note: Eb }, 
          { start: 2736, end: 2760, note: D }, 
          { start: 2808, end: 2832, note: D }, 
          { start: 2904, end: 2928, note: D }, 
          { start: 2976, end: 3000, note: D }, 
          { start: 3024, end: 3048, note: D }, 
          ],
        },
        {
          ndx: 0, //CHORDS 2/3
          amp: 8,
          pulse: function(tick) { return 50; },
          delay: 0,
          notes: [ 
          { start: 48, end: 72, note: G }, 
          { start: 120, end: 144, note: G }, 
          { start: 216, end: 240, note: G }, 
          { start: 288, end: 312, note: G }, 
          { start: 336, end: 360, note: G }, 
          { start: 432, end: 456, note: Gb }, 
          { start: 504, end: 528, note: Gb }, 
          { start: 600, end: 624, note: D }, 
          { start: 672, end: 696, note: D }, 
          { start: 720, end: 744, note: D }, 
          { start: 816, end: 840, note: G }, 
          { start: 888, end: 912, note: G }, 
          { start: 984, end: 1008, note: G }, 
          { start: 1056, end: 1080, note: G }, 
          { start: 1104, end: 1128, note: G }, 
          { start: 1200, end: 1224, note: Gb }, 
          { start: 1272, end: 1296, note: Gb }, 
          { start: 1368, end: 1392, note: D }, 
          { start: 1440, end: 1464, note: D }, 
          { start: 1488, end: 1512, note: D }, 
          { start: 1584, end: 1608, note: G }, 
          { start: 1656, end: 1680, note: G }, 
          { start: 1752, end: 1776, note: G }, 
          { start: 1824, end: 1848, note: G }, 
          { start: 1872, end: 1896, note: G }, 
          { start: 1968, end: 1992, note: Gb }, 
          { start: 2040, end: 2064, note: Gb }, 
          { start: 2136, end: 2160, note: D }, 
          { start: 2208, end: 2232, note: D }, 
          { start: 2256, end: 2280, note: D }, 
          { start: 2352, end: 2376, note: G }, 
          { start: 2424, end: 2448, note: G }, 
          { start: 2520, end: 2544, note: G }, 
          { start: 2592, end: 2616, note: G }, 
          { start: 2640, end: 2664, note: G }, 
          { start: 2736, end: 2760, note: Gb }, 
          { start: 2808, end: 2832, note: Gb }, 
          { start: 2904, end: 2928, note: Gb }, 
          { start: 2976, end: 3000, note: Gb }, 
          { start: 3024, end: 3048, note: Gb }, 
          ],
        },
        {
          ndx: 0, //CHORDS 3/3
          amp: 8,
          pulse: function(tick) { return 50; },
          delay: 0,
          notes: [ 
          { start: 48, end: 72, note: B }, 
          { start: 120, end: 144, note: B }, 
          { start: 216, end: 240, note: A }, 
          { start: 288, end: 312, note: A }, 
          { start: 336, end: 360, note: A }, 
          { start: 432, end: 456, note: A }, 
          { start: 504, end: 528, note: A }, 
          { start: 600, end: 624, note: G }, 
          { start: 672, end: 696, note: G }, 
          { start: 720, end: 744, note: G }, 
          { start: 816, end: 840, note: B }, 
          { start: 888, end: 912, note: B }, 
          { start: 984, end: 1008, note: A }, 
          { start: 1056, end: 1080, note: A }, 
          { start: 1104, end: 1128, note: A }, 
          { start: 1200, end: 1224, note: A }, 
          { start: 1272, end: 1296, note: A }, 
          { start: 1368, end: 1392, note: Ab }, 
          { start: 1440, end: 1464, note: Ab }, 
          { start: 1488, end: 1512, note: Ab }, 
          { start: 1584, end: 1608, note: B }, 
          { start: 1656, end: 1680, note: B }, 
          { start: 1752, end: 1776, note: A }, 
          { start: 1824, end: 1848, note: A }, 
          { start: 1872, end: 1896, note: A }, 
          { start: 1968, end: 1992, note: A }, 
          { start: 2040, end: 2064, note: A }, 
          { start: 2136, end: 2160, note: G }, 
          { start: 2208, end: 2232, note: G }, 
          { start: 2256, end: 2280, note: G }, 
          { start: 2352, end: 2376, note: B }, 
          { start: 2424, end: 2448, note: B }, 
          { start: 2520, end: 2544, note: Bb }, 
          { start: 2592, end: 2616, note: Bb }, 
          { start: 2640, end: 2664, note: Bb }, 
          { start: 2736, end: 2760, note: A }, 
          { start: 2808, end: 2832, note: A }, 
          { start: 2904, end: 2928, note: B }, 
          { start: 2976, end: 3000, note: B }, 
          { start: 3024, end: 3048, note: B }, 
          ],
        },
        {
          ndx: 0, //SAW PAD 1/4
          amp: 4,
          pulse: function(tick) { return 1; },
          delay: 0,
          notes: [ 
          { start: 0, end: 384, note: C }, 
          { start: 384, end: 768, note: B/2 }, 
          { start: 768, end: 1152, note: C }, 
          { start: 1152, end: 1536, note: B/2 }, 
          { start: 1536, end: 1920, note: C }, 
          { start: 1920, end: 2304, note: B/2 }, 
          { start: 2304, end: 2688, note: C }, 
          { start: 2688, end: 3071, note: B/2 }, 
          ],
        },
        {
          ndx: 0, //SAW PAD 2/4
          amp: 4,
          pulse: function(tick) { return 1; },
          delay: 0,
          notes: [ 
          { start: 0, end: 168, note: EE }, 
          { start: 168, end: 384, note: Eb }, 
          { start: 384, end: 768, note: D }, 
          { start: 768, end: 936, note: EE }, 
          { start: 936, end: 1152, note: Eb }, 
          { start: 1152, end: 1536, note: D }, 
          { start: 1536, end: 1704, note: EE }, 
          { start: 1704, end: 1920, note: Eb }, 
          { start: 1920, end: 2304, note: D }, 
          { start: 2304, end: 2472, note: EE }, 
          { start: 2472, end: 2688, note: Eb }, 
          { start: 2688, end: 3071, note: D }, 
          ],
        },
        {
          ndx: 0, //SAW PAD 3/4
          amp: 4,
          pulse: function(tick) { return 1; },
          delay: 0,
          notes: [ 
          { start: 0, end: 384, note: G }, 
          { start: 384, end: 552, note: Gb }, 
          { start: 552, end: 768, note: EE }, 
          { start: 768, end: 1152, note: G }, 
          { start: 1152, end: 1320, note: Gb }, 
          { start: 1320, end: 1536, note: EE }, 
          { start: 1536, end: 1920, note: G }, 
          { start: 1920, end: 2088, note: Gb }, 
          { start: 2088, end: 2304, note: EE }, 
          { start: 2304, end: 2472, note: A }, 
          { start: 2472, end: 2688, note: G }, 
          { start: 2688, end: 3071, note: Gb }, 
          ],
        },
        {
          ndx: 0, //SAW PAD 4/4
          amp: 4,
          pulse: function(tick) { return 1; },
          delay: 0,
          notes: [ 
          { start: 0, end: 168, note: B }, 
          { start: 168, end: 552, note: A }, 
          { start: 552, end: 768, note: G }, 
          { start: 768, end: 936, note: B }, 
          { start: 936, end: 1320, note: A }, 
          { start: 1320, end: 1536, note: Ab }, 
          { start: 1536, end: 1704, note: B }, 
          { start: 1704, end: 2088, note: A }, 
          { start: 2088, end: 2304, note: G }, 
          { start: 2304, end: 2472, note: B }, 
          { start: 2472, end: 2688, note: Bb }, 
          { start: 2688, end: 2856, note: A }, 
          { start: 2856, end: 3071, note: G }, 
          ],
        },
        {
          ndx: 0, //TRIANGLE LEAD
          amp: 28,
          pulse: function(tick) { return 50; },
          delay: 0,
          notes: [ 
          { start: 72, end: 84, note: EE }, 
          { start: 96, end: 102, note: A }, 
          { start: 102, end: 120, note: B }, 
          { start: 120, end: 132, note: A }, 
          { start: 144, end: 168, note: G }, 
          { start: 168, end: 216, note: A }, 
          { start: 216, end: 228, note: B }, 
          { start: 264, end: 270, note: G }, 
          { start: 270, end: 312, note: A }, 
          { start: 312, end: 324, note: Eb }, 
          { start: 336, end: 360, note: Gb }, 
          { start: 360, end: 372, note: G }, 
          { start: 384, end: 390, note: G }, 
          { start: 390, end: 406, note: A }, 
          { start: 408, end: 432, note: A }, 
          { start: 456, end: 462, note: G }, 
          { start: 462, end: 480, note: A }, 
          { start: 504, end: 510, note: Gb }, 
          { start: 510, end: 528, note: G }, 
          { start: 528, end: 540, note: Gb }, 
          { start: 552, end: 558, note: F }, 
          { start: 558, end: 600, note: Gb }, 
          { start: 600, end: 624, note: G }, 
          { start: 648, end: 654, note: Eb }, 
          { start: 654, end: 696, note: EE }, 
          { start: 696, end: 702, note: D }, 
          { start: 702, end: 708, note: C }, 
          { start: 708, end: 714, note: Bb/2 }, //pattern 0
          { start: 840, end: 852, note: EE }, 
          { start: 864, end: 870, note: A }, 
          { start: 870, end: 888, note: B }, 
          { start: 888, end: 900, note: A }, 
          { start: 912, end: 936, note: G }, 
          { start: 936, end: 984, note: A }, 
          { start: 984, end: 996, note: B }, 
          { start: 1032, end: 1038, note: G }, 
          { start: 1038, end: 1078, note: A }, 
          { start: 1080, end: 1092, note: A }, 
          { start: 1104, end: 1110, note: Bb }, 
          { start: 1110, end: 1128, note: B }, 
          { start: 1128, end: 1140, note: C*2 }, 
          { start: 1152, end: 1158, note: Db*2 }, 
          { start: 1158, end: 1174, note: D*2 }, 
          { start: 1176, end: 1200, note: D*2 }, 
          { start: 1224, end: 1230, note: Db*2 }, 
          { start: 1230, end: 1260, note: D*2 }, 
          { start: 1272, end: 1296, note: B }, 
          { start: 1296, end: 1308, note: D*2 }, 
          { start: 1320, end: 1326, note: F*2 }, 
          { start: 1326, end: 1368, note: Gb*2 }, 
          { start: 1368, end: 1392, note: G*2 }, 
          { start: 1392, end: 1404, note: Gb*2 }, 
          { start: 1416, end: 1422, note: Eb*2 }, 
          { start: 1422, end: 1464, note: EE*2 }, 
          { start: 1464, end: 1470, note: D*2 }, 
          { start: 1470, end: 1476, note: C*2 }, 
          { start: 1476, end: 1482, note: Bb }, //pattern 1
          { start: 1608, end: 1620, note: EE }, 
          { start: 1632, end: 1638, note: A }, 
          { start: 1638, end: 1656, note: B }, 
          { start: 1656, end: 1668, note: A }, 
          { start: 1680, end: 1704, note: G }, 
          { start: 1704, end: 1752, note: A }, 
          { start: 1752, end: 1764, note: B }, 
          { start: 1800, end: 1806, note: G }, 
          { start: 1806, end: 1848, note: A }, 
          { start: 1848, end: 1860, note: Eb }, 
          { start: 1872, end: 1896, note: Gb }, 
          { start: 1896, end: 1908, note: G }, 
          { start: 1920, end: 1926, note: G }, 
          { start: 1926, end: 1942, note: A }, 
          { start: 1944, end: 1968, note: A }, 
          { start: 1992, end: 1998, note: G }, 
          { start: 1998, end: 2016, note: A }, 
          { start: 2040, end: 2046, note: Gb }, 
          { start: 2046, end: 2064, note: G }, 
          { start: 2064, end: 2076, note: Gb }, 
          { start: 2088, end: 2094, note: F }, 
          { start: 2094, end: 2136, note: Gb }, 
          { start: 2136, end: 2160, note: G }, 
          { start: 2184, end: 2190, note: Eb }, 
          { start: 2190, end: 2232, note: EE }, 
          { start: 2232, end: 2256, note: Gb }, 
          { start: 2256, end: 2268, note: G }, 
          { start: 2280, end: 2286, note: Bb }, 
          { start: 2286, end: 2328, note: B }, //pattern 2
          { start: 2328, end: 2352, note: C*2 }, 
          { start: 2352, end: 2364, note: B }, 
          { start: 2376, end: 2382, note: Ab }, 
          { start: 2382, end: 2424, note: A }, 
          { start: 2424, end: 2430, note: G }, 
          { start: 2430, end: 2436, note: F }, 
          { start: 2436, end: 2442, note: Eb }, 
          { start: 2616, end: 2640, note: G }, 
          { start: 2640, end: 2652, note: Gb }, 
          { start: 2664, end: 2670, note: Gb }, 
          { start: 2670, end: 2808, note: G }, 
          { start: 2808, end: 2814, note: F }, 
          { start: 2814, end: 2820, note: Eb }, 
          { start: 2820, end: 2826, note: Db }, 
          { start: 2826, end: 2832, note: B/2 }, //pattern 3
          ],
        },
        {
          ndx: 0, //TRIANGLE ECHO
          amp: 7,
          pulse: function(tick) { return 50; },
          delay: 36,
          notes: [ 
          { start: 72, end: 84, note: EE }, 
          { start: 96, end: 102, note: A }, 
          { start: 102, end: 120, note: B }, 
          { start: 120, end: 132, note: A }, 
          { start: 144, end: 168, note: G }, 
          { start: 168, end: 216, note: A }, 
          { start: 216, end: 228, note: B }, 
          { start: 264, end: 270, note: G }, 
          { start: 270, end: 312, note: A }, 
          { start: 312, end: 324, note: Eb }, 
          { start: 336, end: 360, note: Gb }, 
          { start: 360, end: 372, note: G }, 
          { start: 384, end: 390, note: G }, 
          { start: 390, end: 406, note: A }, 
          { start: 408, end: 432, note: A }, 
          { start: 456, end: 462, note: G }, 
          { start: 462, end: 480, note: A }, 
          { start: 504, end: 510, note: Gb }, 
          { start: 510, end: 528, note: G }, 
          { start: 528, end: 540, note: Gb }, 
          { start: 552, end: 558, note: F }, 
          { start: 558, end: 600, note: Gb }, 
          { start: 600, end: 624, note: G }, 
          { start: 648, end: 654, note: Eb }, 
          { start: 654, end: 696, note: EE }, 
          { start: 696, end: 702, note: D }, 
          { start: 702, end: 708, note: C }, 
          { start: 708, end: 714, note: Bb/2 }, //pattern 0
          { start: 840, end: 852, note: EE }, 
          { start: 864, end: 870, note: A }, 
          { start: 870, end: 888, note: B }, 
          { start: 888, end: 900, note: A }, 
          { start: 912, end: 936, note: G }, 
          { start: 936, end: 984, note: A }, 
          { start: 984, end: 996, note: B }, 
          { start: 1032, end: 1038, note: G }, 
          { start: 1038, end: 1078, note: A }, 
          { start: 1080, end: 1092, note: A }, 
          { start: 1104, end: 1110, note: Bb }, 
          { start: 1110, end: 1128, note: B }, 
          { start: 1128, end: 1140, note: C*2 }, 
          { start: 1152, end: 1158, note: Db*2 }, 
          { start: 1158, end: 1174, note: D*2 }, 
          { start: 1176, end: 1200, note: D*2 }, 
          { start: 1224, end: 1230, note: Db*2 }, 
          { start: 1230, end: 1260, note: D*2 }, 
          { start: 1272, end: 1296, note: B }, 
          { start: 1296, end: 1308, note: D*2 }, 
          { start: 1320, end: 1326, note: F*2 }, 
          { start: 1326, end: 1368, note: Gb*2 }, 
          { start: 1368, end: 1392, note: G*2 }, 
          { start: 1392, end: 1404, note: Gb*2 }, 
          { start: 1416, end: 1422, note: Eb*2 }, 
          { start: 1422, end: 1464, note: EE*2 }, 
          { start: 1464, end: 1470, note: D*2 }, 
          { start: 1470, end: 1476, note: C*2 }, 
          { start: 1476, end: 1482, note: Bb }, //pattern 1
          { start: 1608, end: 1620, note: EE }, 
          { start: 1632, end: 1638, note: A }, 
          { start: 1638, end: 1656, note: B }, 
          { start: 1656, end: 1668, note: A }, 
          { start: 1680, end: 1704, note: G }, 
          { start: 1704, end: 1752, note: A }, 
          { start: 1752, end: 1764, note: B }, 
          { start: 1800, end: 1806, note: G }, 
          { start: 1806, end: 1848, note: A }, 
          { start: 1848, end: 1860, note: Eb }, 
          { start: 1872, end: 1896, note: Gb }, 
          { start: 1896, end: 1908, note: G }, 
          { start: 1920, end: 1926, note: G }, 
          { start: 1926, end: 1942, note: A }, 
          { start: 1944, end: 1968, note: A }, 
          { start: 1992, end: 1998, note: G }, 
          { start: 1998, end: 2016, note: A }, 
          { start: 2040, end: 2046, note: Gb }, 
          { start: 2046, end: 2064, note: G }, 
          { start: 2064, end: 2076, note: Gb }, 
          { start: 2088, end: 2094, note: F }, 
          { start: 2094, end: 2136, note: Gb }, 
          { start: 2136, end: 2160, note: G }, 
          { start: 2184, end: 2190, note: Eb }, 
          { start: 2190, end: 2232, note: EE }, 
          { start: 2232, end: 2256, note: Gb }, 
          { start: 2256, end: 2268, note: G }, 
          { start: 2280, end: 2286, note: Bb }, 
          { start: 2286, end: 2328, note: B }, //pattern 2
          { start: 2328, end: 2352, note: C*2 }, 
          { start: 2352, end: 2364, note: B }, 
          { start: 2376, end: 2382, note: Ab }, 
          { start: 2382, end: 2424, note: A }, 
          { start: 2424, end: 2430, note: G }, 
          { start: 2430, end: 2436, note: F }, 
          { start: 2436, end: 2442, note: Eb }, 
          { start: 2616, end: 2640, note: G }, 
          { start: 2640, end: 2652, note: Gb }, 
          { start: 2664, end: 2670, note: Gb }, 
          { start: 2670, end: 2808, note: G }, 
          { start: 2808, end: 2814, note: F }, 
          { start: 2814, end: 2820, note: Eb }, 
          { start: 2820, end: 2826, note: Db }, 
          { start: 2826, end: 2832, note: B/2 }, //pattern 3
          ],
        },
      ],
    },
    
    window.data.channels.forEach(function(channel) {
      var ndx = channel.ndx;
      var note = channel.notes[ndx];
      var localTick = tick - channel.delay;
      while (localTick >= note.end) {
        ++ndx;
        if (ndx >= channel.notes.length) {
          ndx = 0; 
          break;
        }
        note = channel.notes[ndx];
      }
      channel.ndx = ndx;
      note = channel.notes[ndx];
      channel.freq = localTick >= note.start && localTick < note.end ? note.note : 0;
    }),
    
    chan0_freq = A/3,
    // chan0_amp = (tick % 12 < 3) * 32 * (6 - ((tick / 12) % 4)) / 6,
    chan0_amp = (tick % 192 < 3) * 24 + ((tick+189) %192  < 3) * 12 +
    ((tick+168) % 192 < 3) * 12 + ((tick+165) %192 < 3) * 6 +
    ((tick+144) % 192 < 3) * 24 + ((tick+141) %192 < 9) * 12 + ((tick+132) %192 < 12) * 6 +
    ((tick+120) % 192 < 3) * 12 + ((tick+117) %192 < 3) * 6 +
    ((tick+96) % 192 < 3) * 24 + ((tick+93) %192 < 3) * 12 +
    ((tick+72) % 192 < 3) * 24 + ((tick+69) %192 < 9) * 12 + ((tick+60) %192 < 12) * 6 +
    ((tick+48) % 192 < 3) * 12 + ((tick+45) %192 < 3) * 6 +
    ((tick+24) % 192 < 3) * 24 + ((tick+21) %192 < 9) * 12 + ((tick+12) %192 < 12) * 6,
    
    noiseFreq = Math.floor(t * (chan0_freq * 44100 / SAMP_RATE) / 440),
    
    chan1 = window.data.channels[0], //square 50%, drums aux
    chan2 = window.data.channels[1], //saw, bass
    chan3 = window.data.channels[2], //square 50%, chord1/3
    chan4 = window.data.channels[3], //square 50%, chord2/3
    chan5 = window.data.channels[4], //square 50%, chord3/3
    chan6 = window.data.channels[5], //saw, pad 1/4
    chan7 = window.data.channels[6], //saw, pad 2/4
    chan8 = window.data.channels[7], //saw, pad 3/4
    chan9 = window.data.channels[8], //saw, pad 4/4
    chanA = window.data.channels[9], //triangle, lead
    chanB = window.data.channels[10], //triangle, echo
    
    ret = 128 + chan1.amp * 2 * (Math.floor(chan1.freq * t / SAMP_RATE * 256) % 256 <= chan1.pulse(tick) * 256 / 100) - chan1.amp
    + (chan2.amp / 128) * (((255 * chan2.freq * t / SAMP_RATE) & 255) - 128)
    + chan3.amp * 2 * (Math.floor(chan3.freq * t / SAMP_RATE * 256) % 256 <= chan3.pulse(tick) * 256 / 100) - chan3.amp
    + chan4.amp * 2 * (Math.floor(chan4.freq * t / SAMP_RATE * 256) % 256 <= chan4.pulse(tick) * 256 / 100) - chan4.amp
    + chan5.amp * 2 * (Math.floor(chan5.freq * t / SAMP_RATE * 256) % 256 <= chan5.pulse(tick) * 256 / 100) - chan5.amp
    + (chan6.amp / 128) * (((255 * chan6.freq * t / SAMP_RATE) & 255) - 128)
    + (chan7.amp / 128) * (((255 * chan7.freq * t / SAMP_RATE) & 255) - 128)
    + (chan8.amp / 128) * (((255 * chan8.freq * t / SAMP_RATE) & 255) - 128)
    + (chan9.amp / 128) * (((255 * chan9.freq * t / SAMP_RATE) & 255) - 128)
    + 3 / 4 * (chanA.amp / 64) * (Math.abs(((255 * chanA.freq * t / SAMP_RATE + 128) & 255) - 128) - 64)
    + 3 / 4 * (chanB.amp / 64) * (Math.abs(((255 * chanB.freq*0.99 * t / SAMP_RATE + 128) & 255) - 128) - 64)
    + (chan0_amp / 128) * (Math.floor(65536 * Math.sin(noiseFreq*noiseFreq)) & 255) - chan0_amp
    return (ret%255)/255;  // HAHA I FIGURED OUT BYTEBEAT!
}

document.body.onmousedown = function() { 
    SetColor($(".pixel:hover").attr("data-x"),$(".pixel:hover").attr("data-y"),"green")
}

startGame()