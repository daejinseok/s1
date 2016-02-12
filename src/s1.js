/**
 * Created by daejin on 2016-02-05.
 */

(function(){

    // Establish the root object, `window` (`self`) in the browser, `global`
    // on the server, or `this` in some virtual machines. We use `self`
    // instead of `window` for `WebWorker` support.
    var root = typeof self == 'object' && self.self === self && self ||
        typeof global == 'object' && global.global === global && global ||
        this;

    var s1 = function(obj) {
        if (obj instanceof s1) return obj;
        if (!(this instanceof s1)) return new s1(obj);
        //this._wrapped = obj;
    };

    // Export the Underscore object for **Node.js**, with
    // backwards-compatibility for their old module API. If we're in
    // the browser, add `_` as a global object.
    // (`nodeType` is checked to ensure that `module`
    // and `exports` are not HTML elements.)
    if (typeof exports != 'undefined' && !exports.nodeType) {
        if (typeof module != 'undefined' && !module.nodeType && module.exports) {
            exports = module.exports = s1;
        }
        exports.s1 = s1;
    } else {
        root.s1 = s1;
    }



    s1.randomID = function ( id_size ){

        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";

        var id = "";
        for( var i=0; i < id_size; i++ )
            id += possible.charAt(Math.floor(Math.random() * possible.length));

        return id;
    };

    s1.str2Date = function( str_date ){

        var dot_regex  =/\d{4}\.\d{2}.\d{2}/,
            dash_regex =/\d{4}\-\d{2}-\d{2}/,
            dateSp;


        if ( dot_regex.test(str_date) ){
            dateSp = str_date.split('.');
            return new Date(dateSp[1] + '/' + dateSp[2] + '/' + dateSp[0]);
        }

        if ( dash_regex.test(str_date) ){
            dateSp = str_date.split('-');
            return new Date(dateSp[1] + '/' + dateSp[2] + '/' + dateSp[0]);
        }

        return new Date(str_date);
    };


    s1.betweenDays = function(a, b){

        var _MS_PER_DAY = 1000 * 60 * 60 * 24;

        var da = s1.str2Date(a);
        var db = s1.str2Date(b);

        // Discard the time and time-zone information.
        var utc1 = Date.UTC(da.getFullYear(), da.getMonth(), da.getDate());
        var utc2 = Date.UTC(db.getFullYear(), db.getMonth(), db.getDate());

        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    };


    /*
     1. 6개월간 동일하지 않은 패스워드
     2. 개인정보 포함여부
     3. 사전 단어 포함여부
     4. 3자리 이상 연속된 숫자 또는 문자 제한
     5. 문자, 숫자, 특수문자 조합
     */

    // 1. 6개월간 동일한 패스워드이면
    s1.include = function( pw, old_pw_list ){
        return old_pw_list.indexOf(pw) !== -1;
    };

    // 2. 개인정보 포함여부
    s1.deepInclude = function( pw, pinfo_list ){

        for (var idx in pinfo_list ) {
            if ( pw.indexOf(pinfo_list[idx]) !== -1 ) return true;
        }

        return false;
    };

    // 숫자배열에서 연속된 숫자인지 확인
    var isSeq = function( arr, parseFn, limit_size ){

        // limit_size는 적어도 2이상이어야 함.
        if ( limit_size < 2 ) return false;

        // limit_size보다 작으면 ok
        if ( arr.length < limit_size ) return false;

        var seq_size = 1;
        // idx 0은 시작시 사용함.
        for( var idx = 1; idx < arr.length; idx++ ) {

            var num1 = parseFn(arr[idx-1]);
            var num2 = parseFn(arr[idx]);

            if ( (num1+1) == num2 ) seq_size += 1;
            else                    seq_size  = 1;

            if ( seq_size >= limit_size ) return true;
        }

        return false;
    };

    var abc2Idx = function( abc ){
        return "abcdefghijklmnopqrstuvwxyz".indexOf(abc);
    };

    s1.isNum3Seq = function( str_num ){
        return isSeq(str_num.split(''), function(s){return parseInt(s, 10)}, 3);
    };

    s1.isAbc3Seq = function( str_char ){
        return isSeq(str_char.toLowerCase().split(''), abc2Idx, 3);
    };



    var make_isIncludeSeq = function( regexp, isSeqFunction ){
        return function( pw ){
            var seqList = pw.match(regexp);

            for(var idx in seqList){
                if ( isSeqFunction(seqList[idx]) ) return true;
            }

            return false;
        };
    };

    // pw에 3자리 이상 연속된 숫자가 포함되면 true
    // pw에 3자리 이상 연속된 문자가 포함되면 true
    s1.isInclude_num3Seq = make_isIncludeSeq(/\d\d+/g,             s1.isNum3Seq );
    s1.isInclude_abc3Seq = make_isIncludeSeq(/[a-zA-Z][a-zA-Z]+/g, s1.isAbc3Seq );


    // 특수문자, 숫자, 문자가 포함여부를 확인하는 함수
    var make_isIncludeChar = function( include_regexp ){
        return function(pw){
            return pw.search(include_regexp) !== -1
        };
    };

    s1.isIncludeSpecialChar = make_isIncludeChar(/[~!\#$^&*\=+|:;?"<,.>']/);
    s1.isIncludeNumberChar  = make_isIncludeChar(/[\d]/);
    s1.isIncludeAbcChar     = make_isIncludeChar(/[a-zA-Z]/);


    /*
     1. 6개월간 동일하지 않은 패스워드
     2. 개인정보 포함여부
     3. 사전 단어 포함여부
     4. 3자리 이상 연속된 숫자 또는 문자 제한
     5. 문자, 숫자, 특수문자 조합
     */

    s1.ERR_OLD_PW = 1;
    s1.ERR_INCLIDE_PERSONAL = 2;
    s1.ERR_INCLIDE_DICT = 3;
    s1.ERR_NOT_INCLUDE_SPCHAR = 4;
    s1.ERR_NOT_INCLUDE_NUMBER = 4;

    s1.isGoodPW = function( pw, info ){

        if ( s1.include( pw, info.old_pw_list ) ) {
            return s1.ERR_OLD_PW;
        }

        if ( s1.deepInclude(pw, info.p_list) ){
            return s1.ERR_INCLIDE_PERSONAL;
        }

        if ( s1.deepInclude(pw, info.dict) ){
            return s1.ERR_INCLIDE_DICT;
        }
    };

})();
