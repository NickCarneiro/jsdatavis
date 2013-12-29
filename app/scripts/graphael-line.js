/* global Raphael */
'use strict';

$(function() {
    var r = new Raphael('line-chart-container'),
        txtattr = { font: '12px sans-serif' };

    function hoverIn() {
        this.tags = r.set();

        for (var i = 0, ii = this.y.length; i < ii; i++) {
            this.tags.push(r.tag(this.x, this.y[i], this.values[i], 160, 10).insertBefore(this).attr([{ fill: '#fff' }, { fill: this.symbols[i].attr('fill') }]));
        }
    }

    function hoverOut() {
        if (this.tags) {
            this.tags.remove();
        }
    }

    function drawLineGraph(priceData) {
        // the input data format is an array of 1-dimensional arrays.
        var independentSeries = [];
        var dependentSeries = [];

        for (var i = 0; i < priceData.length; i++) {
            var xValue = priceData[i][0];
            var date = new Date(xValue)
            independentSeries.push(date);

            var yValue = priceData[i][1];
            dependentSeries.push(yValue);
        }

        r.text(300, 10, 'AAPL daily close').attr(txtattr);
        // if you want to add more lines, append to these arrays
        var horizontalData = [independentSeries];
        var verticalData = [dependentSeries];
        var lines = r.linechart(20, 10, 600, 320,
            horizontalData,
            verticalData,
            { nostroke: false,
                axis: '0 0 1 1',
                symbol: 'circle',
                smooth: false
            }).hoverColumn(hoverIn, hoverOut);


        lines.symbols.attr({ r: 6 });
    }

    $.get('data/aapl.json', function(priceData) {
        drawLineGraph(priceData);
    });
});