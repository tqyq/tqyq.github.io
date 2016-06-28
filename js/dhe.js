function DhEditor(container, cfg) {
    this.container = container;
    this.cfg = cfg || {};
    $(container).width(cfg.w || 800);
    $(container).height(cfg.h || 400);
    this.round = function round(n) {
        var grid = this.cfg.grid || 50;
        return Math.round(n / grid) * grid;
    }

    this.addWidget = function addWidget(sel, opt) {
        var dhe = this;
        var widget = null;
        opt = opt || {};
        $(sel).each(function (i, v) {
            if (!v.cloned) {
                widget = $(v).clone();
            }
        });
        widget.cloned = true;

        widget.show();
        widget.addClass("widget");
        widget.addClass("ui-widget-content");
        widget.appendTo(this.container);
        widget.css({
            'left': opt.x * this.cfg.grid || 0,
            'top': opt.y * this.cfg.grid || 0,
            'width': (opt.w || 2) * this.cfg.grid,
            'height': (opt.y || 2) * this.cfg.grid,
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
    }

    this.removeWidget = function removeWidget() {

    }

    this.load = function load() {

    }

    this.toJson = function toJson() {

    }
}
