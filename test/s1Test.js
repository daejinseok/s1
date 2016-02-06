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

QUnit.test( "include", function( assert ) {

    var old_pw_list = ['daejin', 'hana'];

    assert.notOk(s1.include("daejin", old_pw_list));
    assert.notOk(s1.include("hana", old_pw_list));
    assert.ok(s1.include("hana2", old_pw_list));

});

QUnit.test( "deepInclude", function( assert ) {

    var pinfo_list = ['daejin', 'hana'];

    assert.notOk( s1.deepInclude('daejihana', pinfo_list));
    assert.notOk( s1.deepInclude('hana123123', pinfo_list));
    assert.ok( s1.deepInclude('daejha', pinfo_list));

});

QUnit.test( "isNum3Seq", function( assert ) {
    assert.ok(s1.isNum3Seq("1"));
    assert.ok(s1.isNum3Seq("12"));
    assert.notOk(s1.isNum3Seq("123"));
    assert.notOk(s1.isNum3Seq("1234"));
    assert.ok(s1.isNum3Seq("1243"));
    assert.notOk(s1.isNum3Seq("124345"));
    assert.notOk(s1.isNum3Seq("124347345"));
    assert.ok(s1.isNum3Seq("1243473145"));
});

QUnit.test( "abc2Idx", function( assert ) {
    assert.equal(s1.abc2Idx("a"), 0);
    assert.equal(s1.abc2Idx("d"), 3);
    assert.equal(s1.abc2Idx("z"), 25);
});

QUnit.test( "isAbc3Seq", function( assert ) {
    assert.ok(s1.isAbc3Seq("a"));
    assert.ok(s1.isAbc3Seq("ab"));
    assert.notOk(s1.isAbc3Seq("abc"));
    assert.notOk(s1.isAbc3Seq("abcd"));
    assert.ok(s1.isAbc3Seq("abdc"));
    assert.notOk(s1.isAbc3Seq("abdcde"));
    assert.notOk(s1.isAbc3Seq("abdcfcDe"));
    assert.ok(s1.isAbc3Seq("abdcdgcaef"));
});

