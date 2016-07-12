define(function () {
    G2.Global.setTheme('dark');
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
        render: function (data) {
            var Stat = G2.Stat;
            var Frame = G2.Frame;
            var frame = new Frame(data);
            //frame = Frame.sort(frame, 'y'); // 将数据按照y 进行排序，由大到小
            var chart = new G2.Chart({
                id: container,
                width: width,
                height: height,
                plotCfg: {
                    // margin: [20, 60, 80, 120]
                }
            });
            chart.source(frame);
            chart.axis('y', {
                title: null,
                line: null,
                labels: null
            });
            chart.axis('x', {
                title: null,
                labels: {
                    label: {
                        'font-size': 20
                    }
                }
            });
            var pos = chart.interval().position('x*y');
            pos.opacity(1);
            //        chart.position('x*y').label('x',{label: {fill: '#F8AB60'}});
            pos.color('color', function (v) {
                return v;
            });
            chart.legend(false);

            // G2.Util.each(data, function (item, index) {
            //     var offset = 0.15;
            //     chart.guide().text([index - offset, item.y], '' + item.y, {
            //         fill: '#fff',
            //         'font-size': '20'
            //     });
            // });
            chart.render();
        }
    };
})
