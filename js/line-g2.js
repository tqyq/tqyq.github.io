define(function () {
    var data = [];
    for (var i = 0; i < 12; i++) {
        var str;
        var time = i + 8;
        if (time > 9) {
            str = time + ':00';
        } else {
            str = '0' + time + ':00';
        }
        data.push({"x": str, "y": Math.random() * 10 + 5, "c": "新客", "color": "blue"});
        data.push({"x": str, "y": Math.random() * 10 + 10, "c": "老客", "color": "white"});
    }
    var chart = new G2.Chart({
        id: 'c1',
        width: 1000,
        height: 500
    });
    var defs = {
        'x': {
            alias: '时间',
        },
        'y': {
            alias: '占比'
        },
        'c': {
            alias: '新老客'
        }
    };
    chart.source(data, defs);
    chart.line().position('x*y').color('color', function (v) {
        return v;
    }).shape('smooth').size(20);
    chart.point().position('x*y').color('color', function (v) {
        return v;
    }).shape('c', ['circle']).size(4);
    chart.axis('x', {title: null});
    chart.axis('y', {title: null});
    chart.render();
})
