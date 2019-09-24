const { ccclass, property } = cc._decorator;
declare function unescape(s: string): string;
import { GlobalUnit } from '../scripts/GlobalUint';
@ccclass
export class Utils {
    //获得查询字符串
    public static getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    }

    //连接对象
    public static obj_contact(obj) {
        var s = "";
        for (var k in obj) {
            let v = obj[k];
            if (s.length == 0) {
                s += "?" + k + "=" + v;
            } else {
                s += "&" + k + "=" + v;
            }
        }
        return s;
    }

    //clone对象
    public static cloneobj(obj) {
        var a = JSON.stringify(obj)
        return JSON.parse(a)
    }

    //拼接对象
    public static mergeobj(obj1, obj2) {
        if (obj1 == null) {
            var a = JSON.stringify(obj2);
            return JSON.parse(a);
        }
        var a = JSON.stringify(obj2);
        var obj2 = JSON.parse(a);
        for (var k in obj1) {
            var d = obj2[k];
            if (d != null) {
                obj1[k] = d;
            }
        }

        for (var k in obj2) {
            obj1[k] = obj2[k];
        }
    }

    //随机
    public static rand(a: number, b: number): number {
        var diff: number = b - a - 1;
        var r: number = Math.random() * diff;
        return Math.round(r) + a;
    }
    ////yzj
    //  static portlist = [8084,8084]
    //  static hostlist = ["tian.ue4y.cn:8084/lua/web_socket","di.ue4y.cn:8084/lua/web_socket"]
    //  static gatehostlist = ['http://tian.ue4y.cn:8084','http://di.ue4y.cn:8084']

    static portlist = [80, 80]
    static hostlist = ["120.78.136.129/lua/web_socket", "120.78.136.129/lua/web_socket"]
    static gatehostlist = ['http://120.78.136.129', 'http://120.78.136.129']



    public  static getGateHost(): string {
        let self = this
        return GlobalUnit.gatehost
    }


    //获得当前的
    public static getLocalhost(): string {
        //return location.host;
        if (CC_DEBUG) {
            if (!cc.sys.isNative) {
                return location.host;
            } else {
                if (cc.sys.os.toLowerCase() == 'android') {
                    return "http://www.9dianb.com";
                } else if (cc.sys.os.toLowerCase() == 'ios') {
                    // return "http://127.0.0.1:19000";
                    return "http://www.9dianb.com";
                }
            }
        } else {
            if (!cc.sys.isNative) {
                return location.host;
            } else {
                if (cc.sys.os.toLowerCase() == 'android') {
                    return "http://127.0.0.1:19000";
                } else if (cc.sys.os.toLowerCase() == 'ios') {
                    // return "http://127.0.0.1:19000";
                    return "http://www.9dianb.com";
                }
            }
        }
    }

    public static startsWith(source: string, str: string, ignoreCase: boolean = false): boolean {
        if (!source)
            return false;
        else if (source.length < str.length)
            return false;
        else {
            source = source.substring(0, str.length);
            if (!ignoreCase)
                return source == str;
            else
                return source.toLowerCase() == str.toLowerCase();
        }
    }

    public static endsWith(source: string, str: string, ignoreCase: boolean = false): boolean {
        if (!source)
            return false;
        else if (source.length < str.length)
            return false;
        else {
            source = source.substring(source.length - str.length);
            if (!ignoreCase)
                return source == str;
            else
                return source.toLowerCase() == str.toLowerCase();
        }
    }

    public static trim(targetString: string): string {
        return Utils.trimLeft(Utils.trimRight(targetString));
    }

    private static EARTH_RADIUS = 6378.137;
    private static rad(d) {
        return d * Math.PI / 180.0;
    }

    public static GetDistance(lat1, lng1, lat2, lng2) {
        var radLat1 = Utils.rad(lat1);
        var radLat2 = Utils.rad(lat2);
        var a = radLat1 - radLat2;
        var b = Utils.rad(lng1) - Utils.rad(lng2);
        var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) +
            Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
        s = s * Utils.EARTH_RADIUS;
        s = Math.round(s * 10000) / 10000;
        return Math.floor(s * 1000);
    }

    public static trimRight(targetString: string): string {
        var tempChar: string = "";
        for (var i: number = targetString.length - 1; i >= 0; i--) {
            tempChar = targetString.charAt(i);
            if (tempChar != " " && tempChar != "\n" && tempChar != "\r") {
                break;
            }
        }
        return targetString.substring(0, i + 1);
    }

    public static trimLeft(targetString: string): string {
        var tempChar: string = "";
        for (var i: number = 0; i < targetString.length; i++) {
            tempChar = targetString.charAt(i);
            if (tempChar != " " && tempChar != "\n" && tempChar != "\r") {
                break;
            }
        }
        return targetString.substr(i);
    }

    public static base64encode(str) {
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
        var out, i, len;
        var c1, c2, c3;
        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt((c1 & 0x3) << 4);
                out += "==";
                break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
                out += base64EncodeChars.charAt(c1 >> 2);
                out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
                out += base64EncodeChars.charAt((c2 & 0xF) << 2);
                out += "=";
                break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
        }
        return out;
    }

    public static base64edecode(str) {
        var c1, c2, c3, c4;
        var i, len, out;
        var base64DecodeChars = new Array(
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
            52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
            -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
            15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
            -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

        len = str.length;
        i = 0;
        out = "";
        while (i < len) {
            /* c1 */
            do {
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1)
                break;

            /* c2 */
            do {
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1)
                break;

            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));

            /* c3 */
            do {
                c3 = str.charCodeAt(i++) & 0xff;
                if (c3 == 61)
                    return out;
                c3 = base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1)
                break;

            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));

            /* c4 */
            do {
                c4 = str.charCodeAt(i++) & 0xff;
                if (c4 == 61)
                    return out;
                c4 = base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1)
                break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
        }
        return out;
    }
}
