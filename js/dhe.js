function DhEditor(container, cfg) {
    this.container = container;
    this.cfg = cfg || {};
    $(container).width(cfg.w || 800);
    $(container).height(cfg.h || 400);
    this.round = function round(n) {
        var grid = this.cfg.grid || 50;
        return Math.round(n / grid) * grid;
    }

    this.addWidget = function (sel, opt) {
        var dhe = this;
        var widget = null;
        opt = opt || {};
        $(sel).each(function (i, v) {
            if (!v.cloned) {
                widget = $(v).clone();
            }
        });
        widget.cloned = true;
        widget.attr("id", opt.id || null);
        widget.show();
        widget.addClass("widget");
        widget.addClass("ui-widget-content");
        widget.appendTo(this.container);
        widget.css({
            'left': opt.x * this.cfg.grid || 0,
            'top': opt.y * this.cfg.grid || 0,
            'width': (opt.w || 2) * this.cfg.grid,
            'height': (opt.h || 2) * this.cfg.grid,
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
                $(this).width(dhe.round(w));
                $(this).height(dhe.round(h));
            }
        });
        widget.find(".clz_btn").on("click", function () {
            var id = $(this).parent().attr("id");
            dhe.removeWidget(id);
        });
    }

    this.removeWidget = function (sel) {
        $('#' + sel).remove();
        // $(this.container).remove('#' + sel);
    }

    this.removeAll = function () {
        $('.widget').remove();
        // $(this.container).remove('#' + sel);
    }

    this.load = function (json) {
        this.removeAll();
        for(var i = 0; i < json.length; i++) {
            this.addWidget(".c", json[i]);
        }
    }

    this.toJson = function () {

    }
}
