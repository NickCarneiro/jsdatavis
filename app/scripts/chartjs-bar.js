/* global Chart */
'use strict';
function drawBarGraph(dataArray) {
    // the draw function takes a "data" object of a particular format.
    // we need an array of X values and separate arrays for every other dependent series
    // in this example we have a CSV with two columns, date and price.
    var horizontalAxisLabels = [];
    var dependentValues = [];
    for (var i = 0; i < 10; i++) {
        horizontalAxisLabels.push(dataArray[i][0]);
        dependentValues.push(dataArray[i][1]);
    }

    var data = {
        labels : horizontalAxisLabels,
        datasets : [
            {
                fillColor : 'rgba(220,220,220,0.5)',
                strokeColor : 'rgba(220,220,220,1)',
                pointColor : 'rgba(220,220,220,1)',
                pointStrokeColor : '#fff',
                data : dependentValues
            }
        ]
    };
    var ctx = document.getElementById('bar-chart-canvas').getContext('2d');
    var options = {};
    new Chart(ctx).Bar(data, options);
}

$(function() {
    var url = '/data/salaries.json';
    var options = {
        success: drawBarGraph
    };
    $.ajax(url, options);
});




