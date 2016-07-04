function DhEditor(container, cfg) {
    this.widget_border = 2;
    this.container = container;
    this.cfg = cfg || {};
    this.cfg.grid = this.cfg.grid || 50;
    $(container).width(cfg.w * this.cfg.grid || 16 * this.cfg.grid);
    $(container).height(cfg.h * this.cfg.grid || 8 * this.cfg.grid);
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

    this.addWidget = function (sel, opt) {
        var dhe = this;
        var widget = null;
        opt = opt || {};
        opt.w = opt.w || 2;
        opt.h = opt.h || 2;
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
            'left': opt.x * this.cfg.grid || 0,
            'top': opt.y * this.cfg.grid || 0,
            'width': opt.w * this.cfg.grid - this.widget_border,
            'height': opt.h * this.cfg.grid - this.widget_border,
        });
        widget.draggable({
            containment: this.container,
            stop: function () {
                var pos = $(this).position();
                $(this).css({
                    'left': dhe.round(pos.left) + 'px',
                    'top': dhe.round(pos.top) + 'px'
                });
            }
        });
        widget.resizable({
            containment: this.container,
            stop: function () {
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
