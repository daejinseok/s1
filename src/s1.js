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

    // 1. 6개월간 동일하지 않은 패스워드
    s1.include = function( pw, old_pw_list ){
        return old_pw_list.indexOf(pw) === -1;
    };

    // 2. 개인정보 포함여부
    s1.deepInclude = function( pw, pinfo_list ){

        for (var idx in pinfo_list ) {
            if ( pw.indexOf(pinfo_list[idx]) !== -1 ) return false;
        }

        return true;
    };

    // 숫자배열에서 연속된 숫자인지 확인
    s1.isSeq = function( arr, parseFn, limit_size ){

        // limit_size는 적어도 2이상이어야 함.
        if ( limit_size < 2 ) return true;

        // limit_size보다 작으면 ok
        if ( arr.length < limit_size ) return true;

        var seq_size = 1;
        // idx 0은 시작시 사용함.
        for( var idx = 1; idx < arr.length; idx++ ) {

            var num1 = parseFn(arr[idx-1]);
            var num2 = parseFn(arr[idx]);

            if ( (num1+1) == num2 ) seq_size += 1;
            else                    seq_size  = 1;

            if ( seq_size >= limit_size ) return false;
        }

        return true;
    };

    s1.isNum3Seq = function( str_num ){
        return s1.isSeq(str_num.split(''), function(s){return parseInt(s, 10)}, 3);
    };

    s1.abc2Idx = function( abc ){
        return "abcdefghijklmnopqrstuvwxyz".indexOf(abc);
    };

    s1.isAbc3Seq = function( str_char ){
        return s1.isSeq(str_char.toLowerCase().split(''), s1.abc2Idx, 3);
    };





    // 특수문자, 숫자, 문자가 포함여부를 확인하는 함수
    function make_isIncludeChar( include_regexp ){
        return function(pw){
            return pw.search(include_regexp) !== -1
        };
    }

    s1.isIncludeSpecialChar = make_isIncludeChar(/[~!\#$^&*\=+|:;?"<,.>']/);
    s1.isIncludeNumberChar  = make_isIncludeChar(/[\d]/);
    s1.isIncludeAbcChar     = make_isIncludeChar(/[a-zA-Z]/);



// 3. 사전은 "2"와 동일함.


// 4. 3자리 이상 연속된 숫자 또는 문자 제한
    function is_way4( pw ){

        var seq_size = 3;

        var num_list = pw.match(/\d\d\d*/g);

        for(var idx in num_list){
            if ( !is_way4_1(num_list[idx], seq_size) ) return false;
        }

        return true;

    }

// 4.1 연속된 숫자인지 확인
//
//
// word : 숫자문자열 ex 123
// max_seq_size : 연속된는 길이


// acd... 숫자 배열로 변경한다.
    function abc_to_idx( w ){

        var _map = "abcdefghijklmnopqrstuvwxyz";
        var low = w.toLowerCase();

        var rst = [];


        for ( var idx in low ) {
            rst.push(_map.indexOf(low[idx]));
        }

        return rst;
    }

// 4.1 연속된 숫자인지 확인
//
//
// word : 숫자문자열 ex 123
// max_seq_size : 연속된는 길이
    function is_way4_2( word, seq_size ){

        // max_seq_size는 적어도 2이상이어야 함.
        if ( seq_size < 2 ) return true;

        // max_seq_size보다 작으면 ok
        if ( word.length < seq_size ) return true;

        var cur_seq = 1;

        var idx_list = abc_to_idx(word);

        // idx 0은 시작시 사용함.
        for( var idx = 1; idx < idx_list.length; idx++ ) {

            var num1 = idx_list[idx-1];
            var num2 = idx_list[idx];

            if ( (num1+1) == num2 ) cur_seq += 1;
            else                    cur_seq  = 1;

            if ( cur_seq >= seq_size ) return false;
        }

        return true;
    }


// 특수문자, 숫자, 문자가 포함여부를 확인하는 함수
    function make_is_include_char( include_regexp ){
        return function(pw){
            return pw.search(include_regexp) !== -1
        };
    }

    var is_include_special_char = make_is_include_char(/[~!\#$^&*\=+|:;?"<,.>']/);
    var is_include_number_char  = make_is_include_char(/[\d]/);
    var is_include_abc_char     = make_is_include_char(/[a-zA-Z]/);


// 5. 문자, 숫자, 특수문자 조합


})();
