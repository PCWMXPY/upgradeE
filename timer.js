var timess = 0;
var stopcode;

function setTime() {
    var min = Math.floor(timess / 60);
    var sec = timess % 60;
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    var display = min + ":" + sec;
    timess += 1;
    document.getElementById("htmer_time").innerHTML = display;
}

function stopTime() {
    clearInterval(stopcode);
}
