//cmd = tasklist
//process.platform = win32
// var cmd = process.platform == 'win32' ? 'tasklist' : 'ps aux';
var cmd = 'tasklist';
var exec = require('child_process').exec;
// var qqname = 'qq';
// exec(cmd, function (err, stdout, stderr) {
//     if (err) {
//         return console.log(err);
//     }
//     stdout.split('\n').filter(function (line) {
//         var p = line.trim().split(/\s+/),
//             pname = p[0],
//             pid = p[1];
//         if (pname.toLowerCase().indexOf(qqname) >= 0 && parseInt(pid)) {
//             console.log(pname, pid);
//         }
//     });
// });
/*
err = null
stdout = 
stderr = 
*/
// exec(cmd, function (err, stdout, stderr) {

//     console.log(stdout.split('\n').filter());
// });
// console.log(process.platform);

// if (true == true && parseInt('dsada')) {
//     console.log(true);
// } else {
//     console.log(false);
// }
setInterval(function () {
    exec(cmd, function (err, stdout, stderr) {
        if (err) {
            console.log(err);
        }
        const re = (stdout.split('\n').filter(function (line) {
            return line.trim().split(/\s+/)[0].toLowerCase() == 'leagueclient.exe';
        }));
        if (re.length > 0) {
            for (let i in re) {
                const p = re[i].trim().split(/\s+/);
                console.log(p[0], p[1]);
            }
        } else {
            console.log('notfound');
        }
        console.log(process.memoryUsage());
    });
}, 100);