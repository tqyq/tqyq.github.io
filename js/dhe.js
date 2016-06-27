function DhEditor(container) {
    this.container = container;
    this.round = function round(n) {
        return Math.round(n / 50) * 50;
    }

    this.addWidget = function addWidget(sel, opt) {
        var dhe = this;
        var widget = $(sel).clone();
        widget.show();
        widget.appendTo(this.container);
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
