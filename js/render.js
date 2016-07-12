define(function(){
    var container;
    return {
        render: function (cid, opt) {
            opt = opt || {};
            opt.grid = opt.grid || 50;
            opt.width = opt.width || 8;
            opt.height = opt.height || 4;
            require(["jquery", opt.chart], function ($, chart) {
                container = $(cid);
                $.get(opt.url, function (data) {
                    for (var a in data) {
                        data[a].c = a % 2 == 0 ? "新客" : "老客";
                        data[a].color = a % 2 == 0 ? "blue" : "white";
                    }
                    var chartDiv = $("<div>");
                    chartDiv.attr("id", opt._id);
                    chartDiv.css({
                        position: "absolute",
                        width: opt.width * opt.grid,
                        height: opt.height * opt.grid,
                        left: opt.x * opt.grid,
                        top: opt.y * opt.grid,
                    });
                    container.append(chartDiv);
                    chart.setDim(opt.width * opt.grid, opt.height * opt.grid);
                    console.log(opt.width * opt.grid, opt.height * opt.grid);
                    chart.setContainer(opt._id);
                    chart.render(data);
                });
            });
        }
    }
})
