import { dropdownMenu } from './dropdownMenu.js';
import { barChart } from './barChart.js';

/*
d3.select('#menus')
    .call(dropdownMenu, {
        options: ['Cases - cumulative total', 
                    'Cases - cumulative total per 1 million population', 
                    'Cases - newly reported in last 7 days',
                    'Cases - newly reported in last 24 hours',
                    'Deaths - cumulative total',
                    'Deaths - cumulative total per 1 million population',
                    'Deaths - newly reported in last 7 days',
                    'Deaths - newly reported in last 24 hours',
                ],
        onOptionClicked: onXColumnClicked
});
*/

const width = 960;
const height = 500;
const svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

let data;
let xColumn;

const onXColumnClicked = column => {
    xColumn = column;
    data.sort(function(a,b) {
        return b[xColumn] - a[xColumn];
    });
    
    render();
};

const render = () => {

    d3.select('#menus')
        .call(dropdownMenu,{
            options: ['Cases - cumulative total', 
                        'Cases - cumulative total per 1 million population', 
                        'Cases - newly reported in last 7 days',
                        'Cases - newly reported in last 24 hours',
                        'Deaths - cumulative total',
                        'Deaths - cumulative total per 1 million population',
                        'Deaths - newly reported in last 7 days',
                        'Deaths - newly reported in last 24 hours',
                    ],
            onOptionClicked: onXColumnClicked
        });

    svg.call(barChart, {
        xValue: d => d[xColumn],
        yValue: d => d['Name'],
        margin: { top: 27, right: 20, bottom: 60, left: 170 },
        width,
        height,
        data
    });

    /*
    g.append('text')
        .attr('x', 200)
        .attr('y', -10)
        .text('Cases - newly reported in last 7 days');
    */


};

//d3.csv('assets/WHO-COVID-19-global-table-data.csv', function (error, csvData){
d3.csv('https://cors-anywhere.herokuapp.com/https://covid19.who.int/WHO-COVID-19-global-table-data.csv', function(error, csvData) {
    if (error) throw error;

    data = csvData;
    data.forEach(d => {
        d['Cases - cumulative total'] = +d['Cases - cumulative total'],
        d['Cases - cumulative total per 1 million population'] = +d['Cases - cumulative total per 1 million population'],
        d['Cases - newly reported in last 7 days'] = +d['Cases - newly reported in last 7 days'],
        d['Cases - newly reported in last 24 hours'] = +d['Cases - newly reported in last 24 hours'],
        d['Deaths - cumulative total'] = +d['Deaths - cumulative total'],
        d['Deaths - cumulative total per 1 million population'] = +d['Deaths - cumulative total per 1 million population'],
        d['Deaths - newly reported in last 7 days'] = +d['Deaths - newly reported in last 7 days'],
        d['Deaths - newly reported in last 24 hours'] = +d['Deaths - newly reported in last 24 hours']
    });
    
    //data = data.slice(1,13);
    xColumn = ['Cases - cumulative total'];
    render();

    //console.log(data);
});
