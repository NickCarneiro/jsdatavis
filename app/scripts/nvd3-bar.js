
$.get('data/tenSalaries.json', function(data) {
    function exampleData() {
        return  [
            {
                key: "Salaries",
                values: data
            }
        ]

    }

    nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
            .x(function(d) { return d[0] })
            .y(function(d) { return d[1] })
            .staggerLabels(true)
            .tooltips(false)
            .showValues(true)

        d3.select('#bar-chart-container svg')
            .datum(exampleData())
            .transition().duration(500)
            .call(chart);

        nv.utils.windowResize(chart.update);

        return chart;
    });
});


