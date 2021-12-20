// noinspection ES6ConvertVarToLetConst

/**
 * 常用工具集
 */

export default {
    //获取下一个月日期
    getNextMonth(date) {
        var arr = date.split('-');
        var year = arr[0]; //获取当前日期的年份
        var month = arr[1]; //获取当前日期的月份
        var day = arr[2]; //获取当前日期的日
        var year2 = year;
        var month2 = parseInt(month) + 1;
        if (month2 == 13) {
            year2 = parseInt(year2) + 1;
            month2 = 1;
        }
        var day2 = day;
        var days2 = new Date(year2, month2, 0);
        days2 = days2.getDate();
        if (day2 > days2) {
            day2 = days2;
        }
        if (month2 < 10) {
            month2 = '0' + month2;
        }

        var t2 = year2 + '-' + month2 + '-' + day2
        return t2;
    },
    // 时间戳
    timeStamp(t, s) {
        let timeS = 0
        if (s) { // 返回秒
            timeS = parseInt(new Date(t).getTime() / 1000)
        } else { // 返回毫秒
            timeS = parseInt(new Date(t).getTime())
        }
        return timeS
    },
    //判断是否存在字体
    isSupportFontFamily(f) {
        if (typeof f != "string") {
            return false
        }
        var h = "Arial";
        if (f.toLowerCase() == h.toLowerCase()) {
            return true
        }
        var e = "a";
        var d = 100;
        var a = 100,
            i = 100;
        var c = document.createElement("canvas");
        var b = c.getContext("2d");
        c.width = a;
        c.height = i;
        b.textAlign = "center";
        b.fillStyle = "black";
        b.textBaseline = "middle";
        var g = function (j) {
            b.clearRect(0, 0, a, i);
            b.font = d + "px " + j + ", " + h;
            b.fillText(e, a / 2, i / 2);
            var k = b.getImageData(0, 0, a, i).data;
            return [].slice.call(k).filter(function (l) {
                return l != 0
            })
        };
        return g(h).join("") !== g(f).join("")
    },

    loadFont(name, url) {
        //name 字体名称
        //url  字体链接
        let style = document.createElement('style');
        style.type = 'text/css';
        style.innerText = '@font-face {font-family:' + name + ';src:url(' + url + ')};font-display: swap';
        document.getElementsByTagName('head')[0].appendChild(style);
    },

    //判断字符串中是否含有某个字符
    strIsHaveKey(str, key) {
        let s = str;
        return s.indexOf(key) != -1
    },

    getCookie(name) {
        // console.log(name)
        // console.log(document.cookie)
        if (document.cookie.length > 0) {
            let cStart = document.cookie.indexOf(name + "=");

            if (cStart != -1) {
                cStart = cStart + name.length + 1;
                let cEnd = document.cookie.indexOf(";", cStart);
                if (cEnd == -1) cEnd = document.cookie.length;

                return decodeURIComponent(document.cookie.substring(cStart, cEnd));
            }
        }
        return "";
    },
    setCookie(name, value, day) {
        // console.log('setCookie')
        let Days = day || 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
    },
    delCookie(name) {
        this.setCookie(name, ' ', -1);
    },


    // 通过cookie取baseUrl的值，如果没设置的话就使用默认的
    getBaseUrl() {
        // let baseUrl = this.getCookie('localBaseUrl')
        // // console.log('localBaseUrl', baseUrl)
        // if (baseUrl) {
        //     return baseUrl
        // } else {
        return process.env.VUE_APP_SERVER
        // }
    },

    //获取URL上的参数
    getQueryVariable(variable) {
        var query = window.location.href.split("?")[1];
        // console.log(window.location)
        if (query) {
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == variable) {
                    return pair[1];
                }
            }
            return false;
        } else {
            return false
        }
    },

    //将JSON数据备份到一个新的JSON对象里面
    copyJson(obj) {
        return JSON.parse(JSON.stringify(obj))
    },

    arraySort(data) {
        let map = {}; // 处理过后的数据对象
        let temps = []; // 临时变量
        // 按字母分组
        for (let key in data) {
            if (data[key].pinyin) {
                let ekey = data[key].pinyin.charAt(0)
                    .toUpperCase(); // 根据名称拼音的第一个字母分组，并且转换成大写
                temps = map[ekey] || []; // 如果map里面有这个key了，就取，没有就是空数组
                temps.push(data[key]);
                map[ekey] = temps;
            }
        }
        let list = [];
        for (let gkey in map) {
            list.push({
                gkey: gkey,
                users: map[gkey]
            });
        }
        // 排序
        list = list.sort((li1, li2) => li1.gkey.charCodeAt(0) - li2.gkey.charCodeAt(0));

        return list;
    },

    /** 判断是否是函数 */
    isFunction(fn) {
        return (fn && typeof fn === 'function');
    },

    /** 拷贝属性 */
    copyAttr(src, target) {
        if (src && target) {
            for (let key in src) {
                let value = src[key];
                if (value) {
                    if (typeof value === 'object') {
                        target[key] = Object.assign({}, value);
                    } else {
                        target[key] = value;
                    }
                }
            }
        }
    },

    /** 将对象变成 json字符串 */
    toJsonStr(obj) {
        return JSON.stringify(obj);
    },

    /** 解析 json */
    parserJson(strJSON) {
        return JSON.parse(strJSON);
    },

    /** 生成一个随机id */
    randomId() {
        const len = Math.round(Math.random() * 20);
        const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';
        const maxPos = chars.length;
        let str = '';
        for (let i = 0; i < len; i++) {
            str += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return str;
    },

    /**
     * 用逗号分隔显示数字,保留两位小数点
     * @param value:int 要格式的值
     * @param toFixed2:boolean  是否保留2位小数
     */
    numFormat(value, toFixed2) {
        if (!value) {
            if (toFixed2) {
                return '0.00';
            } else {
                return 0;
            }
        }

        const intPart = Number(value)
            .toFixed(0); // 获取整数部分
        const intPartFormat = intPart.toString()
            .replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断

        let floatPart = '';
        if (toFixed2) {
            floatPart = '.' + parseInt(value * 100 % 100); // 小数位保留2位
            if (floatPart.length === 2) {
                // 如果加上小数点才2为长度，就补一个0在后面
                floatPart += '0';
            }
        }

        return intPartFormat + floatPart;
    },

    /** unix时间 到年月日时间格式 */
    timeFormat(time, fmt) {
        const date = new Date(time);
        return this.dateFormat(date, fmt);
    },

    /**
     * 格式时间
     * - Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423
     * - Format('yyyy-M-d h:m:s.S')      ==> 2006-7-2 8:9:4.18
     * @param date Date对象
     * @param fmt 格式字符串
     * @returns {string}
     */
    dateFormat(date, fmt) {
        if (!date) {
            return '';
        }

        const o = {
            'M+': date.getMonth() + 1, // 月份
            'd+': date.getDate(), // 日
            'h+': date.getHours(), // 小时
            'm+': date.getMinutes(), // 分
            's+': date.getSeconds(), // 秒
            'q+': Math.floor((date.getMonth() + 3) / 3), // 季度,
            'S': date.getMilliseconds(), // 毫秒
        };
        let res = '';

        if (!this.isEmpty(fmt)) {
            res = fmt;

            if (/(y+)/.test(fmt)) {
                res = res.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
            }

            for (let k in o) {
                if (new RegExp('(' + k + ')').test(res)) {
                    res = res.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
                }
            }
        }
        return res;
    },

    /** 判断字符串是否为空 */
    isEmpty(str) {
        if (str === null || str === undefined) {
            return true;
        } else {
            let strValue = str.trim();
            return (strValue === '');
        }
    },

    /** 将字符串型的颜色转为 rgba数组 */
    colorHexToRgba(sColor, alpha) {
        // 十六进制颜色值的正则表达式
        let reg = /^#([0-9a-fA-F]{6})$/;
        // 如果是16进制颜色
        if (sColor && reg.test(sColor)) {
            // 处理六位的颜色值
            let sColorChange = [];
            for (let i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
            }

            sColorChange.push(alpha);

            return 'rgba(' + sColorChange.join(',') + ')';
        }
        return sColor;
    },

    /** 友好的硬盘大小字符串, 用 K M G 表示 */
    toSizeStr(size) {
        let k = size / 1024;
        if (k > 1024) {
            let m = k / 1024;
            if (m > 1024) {
                return (m / 1024).toFixed(2) + 'G';
            } else {
                return m.toFixed(2) + 'M';
            }
        } else {
            return k.toFixed(2) + 'K';
        }
    },

    /***
     * 将formBody参数转化为formQuery
     * @param queryForm
     * @returns {string}
     */
    setQueryForm(queryForm) {
        let temp = [];
        for (let prop in queryForm) {
            if (queryForm[prop] instanceof Object) {
                for (let subProp in queryForm[prop]) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (queryForm[prop].hasOwnProperty(subProp)) {
                        temp.push(subProp + '=' + queryForm[prop][subProp]);
                    }
                }
            } else {
                // eslint-disable-next-line no-prototype-builtins
                if (queryForm.hasOwnProperty(prop)) {
                    temp.push(prop + '=' + queryForm[prop]);
                }
            }
        }
        return temp.join('&');
    },
    // 对象映射
    oMap(TSource, TDist) {
        for (let key in TDist) {
            // eslint-disable-next-line no-prototype-builtins
            if (TSource.hasOwnProperty(key)) {
                TSource[key] = TDist[key];
            }
        }
        return TSource;
    },
    /***
     * 静态调整列表的顺序 这个处理一般在后端更新排序成功后处理
     * @param arr 需要更换元素位置的源/集合
     * @param obj1 需要调整的目标对象
     * @param tag 调整的方式 up向上移动  bottom向下移动 top置顶
     * @returns {[]} 返回调整后的源/集合
     */
    changElementIndex(arr, obj1, tag, k) {
        if (!(arr instanceof Array)) {
            throw 'arr must be array';
        }
        let tmp = [];
        if (tag === 'up') {
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][k] === obj1[k]) {
                    let current = tmp[i - 1];
                    tmp[i - 1] = arr[i];
                    tmp[i] = current;
                } else {
                    tmp.push(arr[i]);
                }
            }
        } else if (tag === 'bottom') {
            let isCurrent = false;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][k] === obj1[k]) {
                    let current = arr[i + 1];
                    tmp.push(current);
                    isCurrent = true;
                } else {
                    if (isCurrent) {
                        tmp.push(arr[i - 1]);
                        isCurrent = false;
                    } else {
                        tmp.push(arr[i]);
                    }
                }
            }
        } else if (tag === 'top') {
            let topCurrent = null;
            for (let i = 0; i < arr.length; i++) {
                if (arr[i][k] === obj1[k]) {
                    topCurrent = arr[i];
                } else {
                    tmp.push(arr[i]);
                }
            }
            tmp.unshift(topCurrent);
        }
        return tmp;
    },
    /**
     * 浏览器本地下载文件
     * @param data 文件流数据
     * @param name 文件名称（必须对应文件格式）
     */
    saveFile(data, name) {
        // 构造一个blob对象来处理数据
        // const blob = new Blob([data])
        const blob = new Blob([data])
        // 支持a标签download的浏览器
        if ('download' in document.createElement('a')) {
            // 创建a标签
            const link = document.createElement('a')
            // a标签添加属性
            link.download = name
            link.style.display = 'none'
            link.href = window.URL.createObjectURL(blob)
            document.body.appendChild(link)
            // 执行下载
            link.click()
            // 释放url
            URL.revokeObjectURL(link.href)
            // 释放标签
            document.body.removeChild(link)
        }
    },
    /***
     * 比较时间大小
     * @param dateTime1
     * @param dateTime2
     * @returns {boolean}
     */
    compareDate(dateTime1, dateTime2) {
        let formatDate1 = new Date(dateTime1)
        let formatDate2 = new Date(dateTime2)
        if (formatDate1 <= formatDate2) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 通过当前节点查找所有的父级节点
     * @param arr1
     * @param id
     * @returns {{node: *, activity: *}}
     */
    familyTree(arr1, id) {
        let temp = []
        let indexArr = []
        let forFn = function (arr, id) {
            for (let i = 0; i < arr.length; i++) {
                let item = arr[i]
                if (item.id === id) {
                    temp.unshift(item)
                    indexArr.unshift(i);
                    forFn(arr1, item.parent_ID)
                    break
                } else {
                    if (item.children) {
                        forFn(item.children, id)
                    }
                }
            }
        }
        forFn(arr1, id)
        return {node: temp, index: indexArr}
    },

    //更新来文单位历史数据
    fromDeptUpDate(fromDept) {
        let fromDeptStr = localStorage.getItem('fromDeptArr')
        // console.log('fromDeptStr',fromDeptStr)
        let fromDeptArr = JSON.parse(fromDeptStr) ? JSON.parse(fromDeptStr) : []
        // console.log('fromDeptArr',fromDeptArr)
        let isHas = false;
        if (fromDeptArr) {
            for (let i = 0; i < fromDeptArr.length; i++) {
                if (fromDeptArr[i] == fromDept) {
                    isHas = true;
                    break
                }
            }
        }

        if (!isHas) {
            if (fromDeptArr.length && fromDeptArr.length > 5) {
                fromDeptArr.pop()
                fromDeptArr.unshift(fromDept)
            } else {
                fromDeptArr.unshift(fromDept)
            }
        }
        // console.log('fromDeptArr2',fromDeptArr)
        fromDeptStr = JSON.stringify(fromDeptArr)
        // console.log('fromDeptStr2',fromDeptStr)

        localStorage.setItem('fromDeptArr', fromDeptStr)
    },
    /**
     * 开发阶段用的测试工具
     * @param pageSize
     */
    createTableData(pageSize) {
        let result = [];
        for (let i = 0; i < pageSize; i++) {
            result.push({
                p1: this.randomId(),
                p2: this.randomId(),
                p3: this.randomId(),
                p4: this.randomId(),
                p5: this.randomId(),
                p6: this.randomId(),
                p7: this.randomId(),
                p8: this.randomId(),
                p9: this.randomId(),

                p11: Math.round(Math.random()),
                p12: Math.round(Math.random() * 10),
                p13: Math.round(Math.random() * 100),
                p14: Math.round(Math.random() * 1000),
                p15: Math.round(Math.random() * 10000),
                p16: Math.round(Math.random() * 100000000),
                p17: Math.round(Math.random()),
                p18: Math.round(Math.random()),
                p19: Math.round(Math.random()) + Math.round(Math.random()),

                p21: new Date().toLocaleDateString(),
                p22: new Date().toLocaleDateString(),
                p23: new Date().toLocaleDateString(),
                p24: new Date().toLocaleDateString(),
                p25: new Date().toLocaleDateString(),
                p26: new Date().toLocaleDateString(),
                p27: new Date().getHours().toFixed(2),
                p28: new Date().toLocaleTimeString(),
                p29: new Date().toLocaleTimeString(),

                p40: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
                p41: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
                p42: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
                p43: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
                p44: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],

                p51: ['第一天', '第二天', '第三天', '第四天', '第五天', '第六天', '第七天'][Math.round(Math.random() * 6)],
                p52: ['一等奖', '二等奖', '三等奖', '好运奖'][Math.round(Math.random() * 3)],

                p61: Math.round(Math.random() * 3),
                p62: Math.round(Math.random() * 4),
                p63: Math.round(Math.random() * 5),
                p64: Math.round(Math.random() * 6),
                p65: Math.round(Math.random() * 7),
            })
        }
        return result;
    },
    /**
     * 取指定下标集合的集合
     * @param source
     * @param indexArr
     * @returns {*[]}
     */
    getCircleArray(source, indexArr) {
        let tar = []
        if (source && source instanceof Array) {
            console.log(1)
            source.forEach((x, i) => {
                if (indexArr.findIndex(y => y === i) !== -1) {
                    tar.push(x)
                }
            })
        }
        return tar;
    },
    /**
     * 小时倒计时
     * @param endTime
     * @returns {{s: number, h: number, m: number}|*}
     */
    countTime(endTime) {
        //获取当前时间
        var date = new Date();
        var now = date.getTime();
        //设置截止时间
        var endDate = new Date(endTime);
        var end = endDate.getTime();
        //获取截止时间和当前时间的时间差
        var leftTime = end - now;
        //定义变量 h,m,s分别保存小时，分钟，秒
        if (leftTime > 0) {
            var h, m, s;
            //判断剩余天数，时，分，秒
            if (leftTime >= 0) {
                h = Math.floor(leftTime / 1000 / 60 / 60 % 24);
                m = Math.floor(leftTime / 1000 / 60 % 60);
                s = Math.floor(leftTime / 1000 % 60);
            }
            return {
                h: h < 10 ? '0' + h : h.toString(),
                m: m < 10 ? '0' + m : m.toString(),
                s: s < 10 ? '0' + s : s.toString(),
            }
        } else {
            return {h: '00', m: '00', s: '00'}
        }
    }
};
