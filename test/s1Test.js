/**
 * Created by daejin on 2016-02-05.
 */

QUnit.test( "randomID", function( assert ) {

    var test_id = s1.randomID(8);
    assert.ok( test_id.match(/[a-z0-9]{8}/), test_id );

    test_id = s1.randomID(15);
    assert.ok( test_id.match(/[a-z0-9]{15}/), test_id );

});


QUnit.test( "str2date", function( assert ) {

    var date1 = s1.str2Date('2016.02.01');
    var date2 = new Date('02/01/2016');
    assert.deepEqual( date1, date2, date1 );

    date1 = s1.str2Date('2016-02-07');
    date2 = new Date('02/07/2016');
    assert.deepEqual( date1, date2, date1 );

});


QUnit.test( "betweenDays", function( assert ) {

    var date1 = "2016.02.01";
    var date2 = "2016.03.01";

    assert.equal( s1.betweenDays( date1, date2), 29);

    date1 = "2014.01.01";
    date2 = "2016.05.24";

    assert.equal( s1.betweenDays( date1, date2), 874);
});


QUnit.test( "isInclude", function( assert ) {

    var old_pw_list = ['daejin', 'hana'];

    assert.ok(s1.isInclude("daejin", old_pw_list));
    assert.ok(s1.isInclude("hana", old_pw_list));
    assert.notOk(s1.isInclude("hana2", old_pw_list));

});

QUnit.test( "isDeepInclude", function( assert ) {

    var pinfo_list = ['daejin', 'hana'];

    assert.ok( s1.isDeepInclude('daejihana', pinfo_list));
    assert.ok( s1.isDeepInclude('hana123123', pinfo_list));
    assert.notOk( s1.isDeepInclude('daejha', pinfo_list));

});

QUnit.test( "isNum3Seq", function( assert ) {
    assert.notOk(s1.isNum3Seq("1"));
    assert.notOk(s1.isNum3Seq("12"));
    assert.ok(s1.isNum3Seq("123"));
    assert.ok(s1.isNum3Seq("1234"));
    assert.notOk(s1.isNum3Seq("1243"));
    assert.ok(s1.isNum3Seq("124345"));
    assert.ok(s1.isNum3Seq("124347345"));
    assert.notOk(s1.isNum3Seq("1243473145"));
});

QUnit.test( "isAbc3Seq", function( assert ) {
    assert.notOk(s1.isAbc3Seq("a"));
    assert.notOk(s1.isAbc3Seq("ab"));
    assert.ok(s1.isAbc3Seq("abc"));
    assert.ok(s1.isAbc3Seq("abcd"));
    assert.notOk(s1.isAbc3Seq("abdc"));
    assert.ok(s1.isAbc3Seq("abdcde"));
    assert.ok(s1.isAbc3Seq("abdcfcDe"));
    assert.notOk(s1.isAbc3Seq("abdcdgcaef"));
});

QUnit.test( "isInclude_num3Seq", function( assert ) {
    assert.notOk(s1.isInclude_num3Seq("1"));
    assert.notOk(s1.isInclude_num3Seq("12"));
    assert.ok(s1.isInclude_num3Seq("123"));
    assert.ok(s1.isInclude_num3Seq("1234"));
    assert.notOk(s1.isInclude_num3Seq("1243"));
    assert.ok(s1.isInclude_num3Seq("124345"));
    assert.ok(s1.isInclude_num3Seq("124347345"));
    assert.notOk(s1.isInclude_num3Seq("1243473145"));

    assert.notOk(s1.isInclude_num3Seq("ab1"));
    assert.notOk(s1.isInclude_num3Seq("12bc"));
    assert.ok(s1.isInclude_num3Seq("ab123c"));
    assert.ok(s1.isInclude_num3Seq("aaccc1234"));
    assert.notOk(s1.isInclude_num3Seq("1243"));
    assert.ok(s1.isInclude_num3Seq("abc12abc4aa345ccc"));
    assert.ok(s1.isInclude_num3Seq("124347cccdd345aaaaa"));
    assert.notOk(s1.isInclude_num3Seq("1243473145"));

    assert.notOk(s1.isInclude_num3Seq("1"));
    assert.notOk(s1.isInclude_num3Seq("1a2"));
    assert.notOk(s1.isInclude_num3Seq("1a23"));
    assert.notOk(s1.isInclude_num3Seq("12bc34"));
    assert.notOk(s1.isInclude_num3Seq("12ad43"));
    assert.notOk(s1.isInclude_num3Seq("1243aaaa45"));
    assert.notOk(s1.isInclude_num3Seq("1243473aaa45"));
    assert.notOk(s1.isInclude_num3Seq("1aaaa24347aaa3bb14bb5"));
});

QUnit.test( "isInclude_abc3Seq", function( assert ) {
    assert.notOk(s1.isInclude_abc3Seq("a"));
    assert.notOk(s1.isInclude_abc3Seq("ab"));
    assert.ok(s1.isInclude_abc3Seq("abc"));
    assert.ok(s1.isInclude_abc3Seq("abcd"));
    assert.notOk(s1.isInclude_abc3Seq("abdc"));
    assert.ok(s1.isInclude_abc3Seq("abdcde"));
    assert.ok(s1.isInclude_abc3Seq("abdcfcDe"));
    assert.notOk(s1.isInclude_abc3Seq("abdcdgcaef"));

    assert.notOk(s1.isInclude_abc3Seq("a1231234"));
    assert.notOk(s1.isInclude_abc3Seq("12341234ab"));
    assert.ok(s1.isInclude_abc3Seq("1234123abc1341234"));
    assert.ok(s1.isInclude_abc3Seq("123abc123d1234"));
    assert.notOk(s1.isInclude_abc3Seq("1abdc1"));
    assert.ok(s1.isInclude_abc3Seq("2abdcde2"));
    assert.ok(s1.isInclude_abc3Seq("34abdcfcDe123"));
    assert.notOk(s1.isInclude_abc3Seq("1234abdcdgcaef31234"));
});


QUnit.test( "isInclude_specialChar", function( assert ) {
    assert.notOk(s1.isInclude_specialChar("a"));
    assert.notOk(s1.isInclude_specialChar("ab"));
    assert.ok(s1.isInclude_specialChar("#"));
    assert.ok(s1.isInclude_specialChar("#abcd"));
    assert.ok(s1.isInclude_specialChar("ab#cd"));
    assert.ok(s1.isInclude_specialChar("abcd#"));
    assert.ok(s1.isInclude_specialChar("ab@dc"));
    assert.ok(s1.isInclude_specialChar("abd%cde"));
});

QUnit.test( "isInclude_number", function( assert ) {
    assert.notOk(s1.isInclude_number("a"));
    assert.notOk(s1.isInclude_number("ab"));
    assert.ok(s1.isInclude_number("1"));
    assert.ok(s1.isInclude_number("2abcd"));
    assert.ok(s1.isInclude_number("ab3cd"));
    assert.ok(s1.isInclude_number("abcd4"));
    assert.ok(s1.isInclude_number("ab5dc"));
    assert.ok(s1.isInclude_number("abd7cde"));
});

QUnit.test( "isInclude_abcChar", function( assert ) {
    assert.notOk(s1.isInclude_abcChar("1"));
    assert.notOk(s1.isInclude_abcChar("12"));
    assert.ok(s1.isInclude_abcChar("a"));
    assert.ok(s1.isInclude_abcChar("a12313#"));
    assert.ok(s1.isInclude_abcChar("12Z45345"));
    assert.ok(s1.isInclude_abcChar("43253452g"));
    assert.ok(s1.isInclude_abcChar("23452c3452345"));
});




QUnit.test( "isGoodPW", function( assert ) {


    /*
     * 6개월간 같지 않은 패스워드
     * 개인정보 포함 여부
     * 사전 단어 포함 여부
     * 문자, 숫자, 특수문자 조합
     * 3자리 이상 연속된 숫자 또는 문자 제한
     */

    // 지난 패스워드
    var old_password_list = [
        'daejin',
        'hana',
        'hajin',
        'jinwon'
    ];

    // 개인정보
    var personal_list = [
        '1234',
        '1004',
        'seok'
    ];

    // 사전단어
    var word_list = [
        'activity',
        'admiral',
        'adult',
        'advantage',
        'affair',
        'amount',
        'angel',
        'background'
    ];

    var info = {
        old_pw_list : old_password_list
        , p_list    : personal_list
        , dict      : word_list
    };

    assert.equal(s1.isGoodPW('daejin', info), s1.ERR_OLD_PW );
    assert.equal(s1.isGoodPW('dae1234jin', info), s1.ERR_INCLUDE_PERSONAL );
    assert.equal(s1.isGoodPW('daeangeljin', info), s1.ERR_INCLUDE_DICT );
    assert.equal(s1.isGoodPW('daeangejin', info), s1.ERR_NOT_INCLUDE_SPECIAL_CHAR );
    assert.equal(s1.isGoodPW('daeange#ljin', info), s1.ERR_NOT_INCLUDE_NUMBER );
    assert.equal(s1.isGoodPW('#1', info), s1.ERR_NOT_INCLUDE_ABC_CHAR );
    assert.equal(s1.isGoodPW('a#123', info), s1.ERR_INCLUDE_NUM3SEQ );
    assert.equal(s1.isGoodPW('abc#12', info), s1.ERR_INCLUDE_ABC3SEQ );
    assert.equal(s1.isGoodPW('daejin#1', info), s1.OK );

});