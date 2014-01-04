
$.get('/data/aapl.json', function(data) {
    function priceData() {
        return [

            {
                "key" : "Price" ,
                "values" : data
            }
        ].map(function(series) {
                series.values = series.values.map(function(d) { return {x: d[0], y: d[1] } });
                return series;
            });
    }

    nv.addGraph(function() {
        var testdata = priceData(),
            chart = nv.models.lineChart()
                .margin({top: 30, right: 60, bottom: 50, left: 70})
                .x(function(d,i) { return i })
                .color(d3.scale.category10().range());

        chart.xAxis.tickFormat(function(d) {
            var dx = testdata[0].values[d] && testdata[0].values[d].x || 0;
            return d3.time.format('%x')(new Date(dx))
        });

        chart.yAxis
                 .tickFormat(d3.format('d'));


        d3.select('#line-chart-container svg')
            .datum(priceData())
            .transition().duration(500).call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });

});


