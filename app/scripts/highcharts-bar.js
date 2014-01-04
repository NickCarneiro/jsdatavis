$(function () {
    $.get('/data/salaries.json', drawBarChart);
});


function drawBarChart(data) {
    console.log(data);
    var categories = [];
    var dependentSeries = [];
    for (var i = 0; i < 10; i++) {
        categories.push(data[i][0]);
        dependentSeries.push(parseInt(data[i][1], 10));
    }
    var series = [{
        name: 'Salaries',
        data: dependentSeries
    }];
    console.log(dependentSeries);
    $('#bar-chart-container').highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Texas Public Employee Salaries'
        },
        subtitle: {
            text: 'Source: TexasTribune.org'
        },
        xAxis: {
            categories: categories
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Salary (USD)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>${point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Tokyo',
            data: dependentSeries

        }]
    });
}