/* global Raphael */

$(function() {
    $.get('/data/salaries.json', drawBarGraph);
});

function drawBarGraph(data) {
    var independentSeries = [];
    var dependentSeries = [];

    for (var i = 0; i < 10; i++) {
        var xValue = data[i][0];
        independentSeries.push(xValue);

        var yValue = data[i][1];
        dependentSeries.push(yValue);
    }
    var r = Raphael('bar-chart-container');
    var txtattr = { font: "12px sans-serif" };

    r.text(160, 10, "Single Series Chart").attr(txtattr);

    var barChart = r.barchart(10, 10, 600, 320, [dependentSeries], 0,
        {
            type: 'sharp',
            axis: '0 0 1 1'
        });
    // bar chart labels have been broken for over a year
    // https://github.com/DmitryBaranovskiy/g.raphael/issues/129
    // They are supposed to work like this:
    //barChart.label(independentSeries);

}