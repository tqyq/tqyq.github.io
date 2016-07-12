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
            var chart = new G2.Chart({
                id: container,
                width: width,
                height: height,
            });
            chart.source(data);
            // 重要：绘制饼图时，必须声明 theta 坐标系
            chart.coord('theta', {
                radius: 0.8 // 设置饼图的大小
            });
            chart.legend('bottom');
            chart.intervalStack()
                .position(Stat.summary.percent('value'))
                .color('name')
                .label('name*..percent',function(name, percent){
                    percent = (percent * 100).toFixed(2) + '%';
                    return name + ' ' + percent;
                });
            chart.render();
        }
    };
})
