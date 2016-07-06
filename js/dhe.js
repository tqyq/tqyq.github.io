function DhEditor(container, cfg) {
    this.widget_border = 2;
    this.container = container;
    cfg.w = cfg.w || 16;
    cfg.h = cfg.h || 8;
    cfg.grid = cfg.grid || 50;
    this.matrix = [];
    for (var i = 0; i < cfg.w; i++) {
        this.matrix[i] = [];
        for (var j = 0; j < cfg.h; j++) {
            this.matrix[i][j] = 0;
        }
    }
    this.cfg = cfg;
    $(container).width(cfg.w * this.cfg.grid);
    $(container).height(cfg.h * this.cfg.grid);
    $(container).addClass("dashboard-dark");
    this.round = function round(n) {
        return Math.round(n / this.cfg.grid) * this.cfg.grid;
    }
    this.rand = function (min, max) {
        var r = Math.round(Math.random() * max);
        if (r < min) {
            r = Math.round(min + Math.random() * (max - min));
        }
        return r;
    }
    this.fillMatrix = function (x, y, w, h) {
        var overlap = false;
        for (var i = x; i < w; i++) {
            for (var j = y; j < h; j++) {
                if (this.matrix[i][j] == 1) {
                    overlap = true;
                    break;
                }
                // this.matrix[i][j] = 1;
            }
        }
        if (!overlap) {
            for (var i = x; i < w; i++) {
                for (var j = y; j < h; j++) {
                    this.matrix[i][j] = 1;
                }
            }
        }
        console.log(overlap);
        return overlap;
    }
    this.toggleBg = function () {
        $(this.container).toggleClass("dashboard-active");
        $(this.container).toggleClass("dashboard-dark");
    }

    this.addWidget = function (sel, opt) {
        var dhe = this;
        var widget = null;
        opt = opt || {};
        opt.w = opt.w || 2;
        opt.h = opt.h || 2;
        opt.x = opt.x || 0;
        opt.y = opt.y || 0;
        dhe.fillMatrix(opt.x, opt.y, opt.w, opt.h);
        $(sel).each(function (i, v) {
            if (!v.cloned) {
                widget = $(v).clone();
            }
        });
        widget.cloned = true;
        // widget.attr("id", opt.id || null);
        widget.uniqueId();
        widget.show();
        widget.addClass("widget");
        widget.addClass("ui-widget-content");
        widget.appendTo(this.container);
        widget.attr('w', opt.w);
        widget.attr('h', opt.h);
        widget.css({
            'left': opt.x * this.cfg.grid,
            'top': opt.y * this.cfg.grid,
            'width': opt.w * this.cfg.grid - this.widget_border,
            'height': opt.h * this.cfg.grid - this.widget_border,
        });
        widget.draggable({
            containment: this.container,
            start: function () {
                dhe.toggleBg();
            },
            stop: function () {
                dhe.toggleBg();
                var pos = $(this).position();
                $(this).css({
                    'left': dhe.round(pos.left) + 'px',
                    'top': dhe.round(pos.top) + 'px'
                });
            }
        });
        widget.resizable({
            containment: this.container,
            start: function () {
                dhe.toggleBg();
            },
            stop: function () {
                dhe.toggleBg();
                var w = $(this).width();
                var h = $(this).height();
                $(this).width(dhe.round(w) - 2);
                $(this).height(dhe.round(h) - 2);
                widget.attr('w', dhe.round(w) / dhe.cfg.grid);
                widget.attr('h', dhe.round(h) / dhe.cfg.grid);
            }
        });
        widget.find(".clz_btn").on("click", function () {
            var id = $(this).parent().attr("id");
            dhe.removeWidget(id);
        });
        return widget;
    }

    this.removeWidget = function (sel) {
        console.log(sel)
        $('#' + sel).remove();
        // $(this.container).remove('#' + sel);
    }

    this.removeAll = function () {
        $('.widget').remove();
        // $(this.container).remove('#' + sel);
    }

    this.load = function (json) {
        this.removeAll();
        for (var i = 0; i < json.length; i++) {
            this.addWidget(".c", json[i]);
        }
    }

    this.toJson = function () {
        var json = [];
        var grid = this.cfg.grid;
        // var dhe = this;
        $(this.container).find('.widget').each(function (i, v) {
            v = $(v);
            var pos = v.position();
            var w = v.attr('w');
            var h = v.attr('h');
            json.push({x: pos.left / grid, y: pos.top / grid, w: w, h: h});
        });
        return json;
    }
}
