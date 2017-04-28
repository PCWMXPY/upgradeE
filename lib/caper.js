(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 * Main Module
 * @version Alpha 0.3.32
 * Caper Module
 * @version Alpha 0.3.10
 * Ajax Module
 * @varsion Beta 1.0.14(Combined to Caper module)
 * File Module
 * @version 1.0.2
 * @CHANGELOG
 */
var Cp$ = {
    /**
     * @param {target of Vuejs} target 
     * @param {data of Caper} data 
     */
    Typing: function (target, data) {
        let capersettings = {
            contect: []
        };
        for (var i in data) capersettings[i] = data[i];
        return this.typing(target, capersettings);
    },
    Caper: function (target, data) {
        var capersettings = {
            frame: 'Vue',
            elem: 'test',
            data: {
                start: null,
                end: null
            },
            content: [],
            duration: 500,
            mode: 'animate'
        };
        for (var i in data) capersettings[i] = data[i];
        return this.varify(target, capersettings);
    },
    typingjs: {},
    caperjs: {
        animate: function (target, data) {
            return setInterval(() => {
                target[data.elem] = data.content[Cp$.globol.randoms(data.content.length)];
            }, data.duration);
        },
        iter: function (target, data) {
            let value = data.data.start;
            let end = data.data.end;
            if (end.length != value.length) value = caperfun.random.string(end.length);
            let count = 0;
            let dur = Math.max(data.duration, 50);
            let safeword = setInterval(() => {
                value = howmuchsame(end, value);
                target[data.elem] = value;
                if (value != end) {
                    count++;
                } else {
                    clearInterval(safeword);
                    console.log('DONE -> Time: ' + count);
                }
            }, dur);

            function howmuchsame(tar, val) {
                var diff = tar.length;
                for (var i = 0; i < tar.length; i++) {
                    if (val.charAt(i) != tar.charAt(i)) {
                        var ran = caperfun.random.instring(diff, tar.charAt(i))
                        val = val.substring(0, i) + ran + val.substring(i + 1, val.length);
                    } else {
                        diff--;
                    }
                }
                return val;
            }
            return data.data.start;
        },
        //todo
        countup: function (elem, data) {
            var startVal = data.start;
            var endVal = data.end;
            var decimal = data.decimal;
            var duration = data.duration;
            var value;

            function startCount(time) {
                //after one run, requestAnimationFrame will applay timestamp to s
                value = startVal + (endVal - startVal) * (time / duration);
                value = Math.min(endVal, value);
                elem.innerHTML = value.toFixed(decimal);
                if (time < duration) requestAnimationFrame(startCount);
            }
            requestAnimationFrame(startCount)
        },
        countdown: function (elem, data, mode) {
            var startVal = data.start;
            var endVal = data.end;
            var decimal = data.decimal;
            var duration = data.duration;
            var value = startVal;
            //normal count
            function startCount(time) {
                //after one run, requestAnimationFrame will applay timestamp to s
                value = startVal - (startVal - endVal) * (time / duration);
                value = Math.max(endVal, value);
                elem.innerHTML = value.toFixed(decimal);
                if (time < duration) requestAnimationFrame(startCount);
            }
            //sec count
            function secCount() {
                //Count as timer
                value = value - 1;
                if (value < endVal) {
                    data.endfunction();
                    return;
                } else {
                    elem.innerHTML = value.toFixed(decimal);
                    setTimeout(secCount, 1000);
                }
            }
            //switch of modes
            switch (mode) {
                case 'normal':
                    requestAnimationFrame(startCount);
                    break;
                case 'sec':
                    setTimeout(secCount, 100);
                    break;
                default:
                    requestAnimationFrame(startCount);
            }
        }
    },
    varify: function (target, data) {
        switch (data.mode) {
            case 'animate':
                return this.caperjs.animate(target, data);
            case 'iter':
                return this.caperjs.iter(target, data);
            default:
                console.log('No Mode Noticed');
                return 0;
        }
    },
    globol: {
        randoms: function (limit) {
            return Math.floor(Math.random() * 10000) % limit;
        }
    }
}
var Co$ = {
    caperjs: {
        //uneffect function will delete after few paths
        caper: {
            //count down
            /**
             * 
             * 
             * @param {target} elem 
             * @param {data} data 
             * @param {mode} mode 
             */

            //new way to count down by sec
            countdownorder: function (elem, data) {
                var startVal = data.start;
                var endVal = data.end;
                var decimal = data.decimal;
                var value = startVal;
                var timer = countdowntimer * 1000;
                if (data.elem == 'Vue') {
                    var target = elem;
                } else {
                    var target = elem.innerHTML;
                }
                target = startVal.toFixed(decimal);

                function countdowns() {
                    data.startfunction();
                    countdown();
                }

                function countdown() {
                    value--;
                    if (value < endVal) {
                        //call endfunction
                        data.endfunction();
                        return;
                    } else {
                        target = value.toFixed(decimal);
                        data.midfunction();
                        setTimeout(secCount, timer);
                    }
                }
                setInterval(countdowns, timer);

            },
            //old method of iter
            iter: function (elem, data) {
                var startstring = data.startstring;
                var endstring = data.endstring;
                var duration = data.duration;
                var frame = 6;
                console.log(frame);
                requestAnimationFrame(startCount);

                function startCount(time) {
                    //after one run, requestAnimationFrame will applay timestamp to s
                    if (frame < 6) {
                        frame++;
                        requestAnimationFrame(startCount);
                        console.log(frame);
                    } else {
                        value = Cp$.caperjs.random.string(15);
                        elem.innerHTML = value;
                        if (time < duration) requestAnimationFrame(startCount);
                        frame = 0;
                        console.log(frame);
                    }
                }

            },
            //faster version of iter
        },
        verify: {
            mode: function (elem, data) {
                if (data.hasOwnProperty('mode')) {
                    switch (data.mode) {
                        case 'select':
                            Cp$.caperjs.caper.report(elem, 'MODE');
                            Cp$.caperjs.caper.countup(elem, data);
                            break;
                        case 'down':
                        case 'countdownnormal':
                        case 'countdown':
                            Cp$.caperjs.caper.countdown(elem, data, 'normal');
                            break;
                        case 'curvecountup':
                        case 'ccountup':
                            Cp$.caperjs.caper.curvecountup(elem, data);
                            break;
                        case 'curvecountdown':
                        case 'ccountdownnormal':
                        case 'ccountdown':
                            Cp$.caperjs.caper.curvecountdown(elem, data);
                            break;
                        case 'newcountdown':
                            Cp$.caperjs.caper.countdownorder(elem, data);
                            break;
                        case 'countdownsec':
                        case 'sec':
                            Cp$.caperjs.caper.countdown(elem, data, 'sec');
                            break;
                        case 'jp':
                            Cp$.Typing.other(elem, data);
                            break;
                        case 'gen':
                            Cp$.caperjs.caper.iternew(elem, data);
                            break;
                        case 'iter':
                            Cp$.caperjs.caper.iterfaster(elem, data);
                            break;
                        default:
                            Cp$.caperjs.caper.countup(elem, data);
                    }
                } else {
                    Cp$.caperjs.caper.countup(elem, data);
                }
                return data;
            },
            string: function (data) {
                if (data.hasOwnProperty('start')) {
                    return data.start;
                }
                return Cp$.caperjs.random.string(10);
            },
            stringend: function (data) {
                if (data.hasOwnProperty('end')) {
                    return data.end;
                }
                return Cp$.caperjs.random.string(10);
            }
        }
    },
    Typing: {
        //update elem calling method

        chinses: function (elem, data) {
            console.log('Release soon');
        },
        other: function (elem, data) {
            console.log('Release soon');
        }
    },
    devidechinese: {
        /**
         * @param {string} sentence 
         * @returns array of seprated words
         */
        devide: function (sentence) {
            var letters = [];
            var length = sentence.length;
            for (var i = 0; i < length; i++) {
                letters.push({
                    content: sentence[i],
                    mult: 0
                });
                if (i != length - 1) {
                    letters[i].next = sentence[i + 1];

                } else {
                    letters[i].next = '$n';
                }
                if (i != 0 && i != length - 1) {
                    for (var j = i - 1; j < i; j++) {
                        if (letters[j].content == sentence[i] && letters[j].next == sentence[i + 1]) {
                            letters[i].mult++;
                        }
                    }
                }
            }
            for (var i = 0; i < length - 1; i++) {
                if (letters[i].mult != 0) {
                    letters[i + 1].content += letters[i].content;
                    letters[i].content = '$f';
                    letters[i].next = '$f';
                }
            }
            return letters;
        }
    },
    //ajax module, not updating
    ajax: {
        /**
         * 
         * 
         * @param {data of index} inin 
         * @returns code of function run
         */
        post: function (inin) {
            console.log('use Ca$.post perfer');
            Ca$.post(inin);
        },
        get: function (inin) {
            console.log('use Ca$.get perfer');
            Ca$.get(inin);
        },
        caperajax: function (inin) {
            console.log('use Ca$.post() and Ca$.get() requied', 'ajax function in no longer supported');
        }
    }
}
var Cd$ = {
    duplicate: function (string) {
        //todo
        return string;
    },
    chineseify: function (num, mode) {
        num = parseInt(num);
        const chinum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '百', '整', '数据超出限制范围'];
        if (num == 0) {
            return chinum[0];
        }
        const hundrands = parseInt(num / 100);
        let result = '';
        if (hundrands > 0) {
            if (hundrands < 10) {
                result += chinum[hundrands] + chinum[11];
            } else {
                result = chinum[13];
                return result;
            }
        }
        const tens = parseInt((num - hundrands * 100) / 10);
        if (tens > 0) {
            if (tens == 1) {
                result += chinum[10];
            } else {
                result += chinum[tens] + chinum[10];
            }
        }
        const singles = parseInt((num - hundrands * 100) - tens * 10);
        if (singles > 0) {
            if (tens == 0 && hundrands > 0) result += chinum[0];
            result += chinum[singles];
        } else {
            if (mode == 0) result += chinum[12];
        }
        return result;
    },
    englishify: function (num) {
        //todo build englishify
        return num;
    }
}
var Ca$ = {
    img: function (inin) {
        //default
        var ajaxsettings = {
            target: 'default',
            url: './main.php',
            data: '',
            async: true,
            //default cache
            cache: true,
            //default 40s timeout
            //not really support yet
            timeout: 40000,
            //default IE 6
            IEborwser: 'Microsoft.XMLHTTP',
            //default form
            contentType: 'application/x-www-form-urlencoded',
            //default consolelog
            success: function (data) {
                console.log(data);
            },
            //default consolelog
            //updated to alert
            error: function (error) {
                console.log(error);
                alert(error);
            }
        };
        //inin method
        for (var i in inin) {
            ajaxsettings[i] = inin[i];
        }
        //create object
        //convert object to string
        if (typeof ajaxsettings.data === 'object') {
            var str = '';
            var value = '';
            for (var key in ajaxsettings.data) {
                value = ajaxsettings.data[key];
                //replace & in url
                if (ajaxsettings.data[key].indexOf('&') !== -1) value = ajaxsettings.data[key].replace(/&/g, escape('&'));
                //replace & in key
                if (key.indexOf('&') !== -1) {
                    key = key.replace(/&/g, escape('&'));
                }
                str += key + '=' + value + '&';
            }
            ajaxsettings.data = str.substring(0, str.length - 1);
        }
        //cache
        var cache = null;
        if (ajaxsettings.cache) {
            cache = '';
        } else {
            cache = '&' + new Date().getTime();
        }
        //for old browser
        var ajaxobject = null;
        if (window.XMLHttpRequest) {
            //for Human Browser
            ajaxobject = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            //for non-human Browser
            ajaxobject = new ActiveXObject(ajaxsettings.IEborwser);
        } else {
            //for Borwser not support ajax
            console.log('Not supported, im done');
        }
        //shake with server
        ajaxobject.open(ajaxsettings.method, ajaxsettings.url, ajaxsettings.async);
        //send request
        ajaxobject.setRequestHeader("Content-type", ajaxsettings.contentType);
        ajaxobject.send(ajaxsettings.data);
        //waiting for response
        ajaxobject.onreadystatechange = function () {
            if (ajaxobject.readyState === 4) {
                if (ajaxobject.status === 200)
                    ajaxsettings.success.call(ajaxobject, ajaxobject.responseText);
                else {
                    ajaxsettings.error();
                }
            }
        };
    },
    get: function (inin) {
        //default
        var ajaxsettings = {
            //default link
            target: 'default',
            url: './main.php',
            //default No data sended
            data: '',
            //default async
            //true for ajax, false for delay
            async: true,
            //default cache
            cache: true,
            //default 40s timeout
            //not really support yet
            timeout: 40000,
            //default call back json
            callback: 'json',
            encode: false,
            //default IE 6
            IEborwser: 'Microsoft.XMLHTTP',
            //default form
            contentType: 'application/x-www-form-urlencoded',
            //default consolelog
            success: function (data) {
                console.log(data);
            },
            //default consolelog
            //updated to alert
            error: function (error) {
                console.log(error);
                alert(error);
            }
        };
        //inin method
        for (var i in inin) {
            ajaxsettings[i] = inin[i];
        }
        if (ajaxsettings.encode == true) {
            let stringfy = JSON.stringify(ajaxsettings.data);
            stringfy = stringfy.replace(/\\+/g, "%2B");
            stringfy = stringfy.replace(/\\&/g, "%26");
            ajaxsettings.data = JSON.parse(stringfy);
        }
        //create object
        //convert object to string
        if (typeof ajaxsettings.data === 'object') {
            var str = '';
            var value = '';
            for (var key in ajaxsettings.data) {
                value = ajaxsettings.data[key];
                //replace & in url
                if (ajaxsettings.data[key].indexOf('&') !== -1) value = ajaxsettings.data[key].replace(/&/g, escape('&'));
                //replace & in key
                if (key.indexOf('&') !== -1) {
                    key = key.replace(/&/g, escape('&'));
                }
                str += key + '=' + value + '&';
            }
            ajaxsettings.data = str.substring(0, str.length - 1);
        }
        var cache = '';
        if (ajaxsettings.cache) {
            cache = '';
        } else {
            cache = '&' + new Date().getTime();
        }
        //chche url
        ajaxsettings.url += '?' + ajaxsettings.data + cache;
        //for old browser
        var ajaxobject = null;
        if (window.XMLHttpRequest) {
            //for Human Browser
            ajaxobject = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            //for non-human Browser
            ajaxobject = new ActiveXObject(ajaxsettings.IEborwser);
        } else {
            //for Borwser not support ajax
            console.log('Not supported, im done');
        }
        //shake with server
        ajaxobject.open('GET', ajaxsettings.url, ajaxsettings.async);
        //send request
        ajaxobject.send(null);
        //waiting for response
        ajaxobject.onreadystatechange = function () {
            if (ajaxobject.readyState === 4) {
                if (ajaxobject.status === 200)
                    ajaxsettings.success.call(ajaxobject, ajaxobject.responseText);
                else {
                    ajaxsettings.error();
                }
            }
        };
    },
    post: function (inin) {
        //default
        var ajaxsettings = {
            target: 'default',
            url: './main.php',
            data: '',
            //default async
            //true for ajax, false for delay
            async: true,
            //default cache
            cache: true,
            //default 40s timeout
            //not really support yet
            timeout: 40000,
            //default call back json
            callback: 'json',
            //default IE 6
            IEborwser: 'Microsoft.XMLHTTP',
            //default form
            contentType: 'application/x-www-form-urlencoded',
            encode: false,
            //default consolelog
            success: function (data) {
                console.log(data);
            },
            //default consolelog
            //updated to alert
            error: function (error) {
                console.log(error);
                alert(error);
            }
        };
        //inin method
        for (var i in inin) {
            ajaxsettings[i] = inin[i];
        }
        if (ajaxsettings.encode == true) {
            let stringfy = JSON.stringify(ajaxsettings.data);
            stringfy = stringfy.replace(/\\+/g, "%2B");
            stringfy = stringfy.replace(/\\&/g, "%26");
            ajaxsettings.data = JSON.parse(stringfy);
        }
        //create object
        //convert object to string
        if (typeof ajaxsettings.data === 'object') {
            var str = '';
            var value = '';
            for (var key in ajaxsettings.data) {
                value = ajaxsettings.data[key];
                //replace & in url
                if (ajaxsettings.data[key].indexOf('&') !== -1) {
                    value = ajaxsettings.data[key].replace(/&/g, escape('&'));
                }
                //replace & in key
                if (key.indexOf('&') !== -1) {
                    key = key.replace(/&/g, escape('&'));
                }
                str += key + '=' + value + '&';
            }
            ajaxsettings.data = str.substring(0, str.length - 1);
        }
        //cache
        var cache = null;
        if (ajaxsettings.cache) {
            cache = '';
        } else {
            cache = '&' + new Date().getTime();
        }
        //for old browser
        var ajaxobject = null;
        if (window.XMLHttpRequest) {
            //for Human Browser
            ajaxobject = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            //for non-human Browser
            ajaxobject = new ActiveXObject(ajaxsettings.IEborwser);
        } else {
            //for Borwser not support ajax
            console.log('Not supported, im done');
        }
        //shake with server
        ajaxobject.open('POST', ajaxsettings.url, ajaxsettings.async);
        //send request
        ajaxobject.setRequestHeader("Content-type", ajaxsettings.contentType);
        ajaxobject.send(ajaxsettings.data);
        //waiting for response
        ajaxobject.onreadystatechange = function () {
            if (ajaxobject.readyState === 4) {
                if (ajaxobject.status === 200)
                    ajaxsettings.success.call(ajaxobject, ajaxobject.responseText);
                else {
                    ajaxsettings.error();
                }
            }
        };
    }
}
const Cr$ = {
    ran: limit => {
        const r = Math.floor(Math.random() * 10000);
        return r % limit;
    }
}
var Cf$ = {
    read: function (inin, endfunction) {
        let defaultinin = {
            mode: 'content',
            file: ''
        }
        for (var i in inin) {
            defaultinin[i] = inin[i];
        }
        if (defaultinin.file.length < 1) return;
        let reader = new FileReader();
        reader.onloadend = function () {
            endfunction(reader.result);
        };
        switch (inin.mode) {
            case 'URL':
            case 'url':
                reader.readAsDataURL(inin.file);
                break;
            case 'Text':
            case 'test':
                reader.readAsText(inin.file);
                break;
            case 'BinaryString':
                reader.readAsBinaryString(inin.file);
                break;
            default:
                console.log('mode is not supported');
        }
    },
    download: function (file, filename) {
        const a = document.createElement('a');
        const url = window.URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }
};
caperfun = {
    random: {
        //random a length length string
        string: function (length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ,.!@#$%^&*()";
            length = Math.max(0, length);
            for (var i = 0; i < length; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        },
        //random a int
        //need to imporve feature
        int: function (length) {
            return Math.random(length);
        },
        //random with little
        instring: function (length, little) {
            length = Math.max(0, length);
            var thisposs = little + this.string(length);
            return thisposs.charAt(Math.floor(Math.random() * thisposs.length));
        }
    }
}