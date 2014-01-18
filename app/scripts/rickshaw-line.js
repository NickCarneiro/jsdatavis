function drawLineGraph(data) {
    var priceSeries = [];
    for (var i = 0; i < data.length; i++) {
        var date = new Date(data[i][0]).getTime() / 1000;
        var price = parseFloat(data[i][1]);
        priceSeries.push({x: date, y: price});
    }
    var graph = new Rickshaw.Graph( {
        element: document.querySelector("#line-chart"),
        width: 540,
        height: 240,
        series: [ {
            data: priceSeries,
            color: 'steelblue'
        } ]
    } );


    var x_axis = new Rickshaw.Graph.Axis.Time( { graph: graph } );

    var y_axis = new Rickshaw.Graph.Axis.Y( {
        graph: graph,
        orientation: 'left',
        tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
        element: document.getElementById('line-y-axis'),
    } );

    graph.render();
}

$.get('/data/aapl.json', drawLineGraph);
// The page also contains this css:
//#line-chart-container {
//    position: relative;
//    font-family: Arial, Helvetica, sans-serif;
//}
//#chart {
//    position: relative;
//    left: 40px;
//}
//#y-axis {
//    position: absolute;
//    top: 0;
//    bottom: 0;
//    width: 40px;
//}