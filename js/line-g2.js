define(function () {
    G2.Global.setTheme('dark');
    var data;
    var container;
    var width, height;
    return {
        setContainer: function (c) {
            container = c;
        },
        setDim: function (w, h) {
            width = w;
            height = h;
        },
        setData: function (d) {
            data = d;
            this.render();
        },
        render: function () {
            var chart = new G2.Chart({
                id: container,
                width: width,
                height: height
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
            }).shape('smooth').size(2);
            chart.point().position('x*y').color('color', function (v) {
                return v;
            }).shape('c', ['circle']).size(4);
            chart.axis('x', {title: null});
            chart.axis('y', {title: null});
            chart.render();
        }
    };
})
