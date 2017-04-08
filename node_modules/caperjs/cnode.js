(function () {
    'use strict';
}());
/*
 * @author WMXPY
 * @contect wm@wmpcxpy.com
 * Main Module
 * @version Alpha 0.3.14
 * Caper Module
 * @version Alpha 0.3.7
 * Ajax Module
 * @varsion Beta 1.0.14(Combined to Caper module)
 * File Module
 * @version 1.0.2
 * @CHANGELOG
 */
var Cp$ = {
    Cd$: {
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
    },
    Ca$: {
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
            var cache = null;
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
}
module.exports = Cp$;