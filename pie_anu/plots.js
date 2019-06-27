
results = {};
// var keys1 = []
// var values1 = []
d3.csv("final.csv", function( error, playerData){
    if (error) return console.warn(error);
console.log("hello" + playerData)
var country_name1 = playerData.map(data => data.country_name)
const unique_countries = country_name1.filter(distinct);
// bringing unique years
var birthYear1 = playerData.map(data => data.birthYear)
const unique_years = birthYear1.filter(distinct);

var result = country_name1.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
console.log(result);
// const keys1 = Object.keys(result)
// const values1 = Object.values(result)
// console.log(result);

// Plotly.newPlot("plots", data, layout);
const keys1 = Object.keys(result)
const values1 = Object.values(result)

console.log(keys1);
console.log(values1);
var piep = {
    type: 'pie',
    labels: keys1,
    values: values1
};

// slider part
var layout = {
    title: 'Time series with range slider and selectors',
    xaxis: {
        birthYear1: {}
    },
    yaxis: {
        fixedrange: true
    }
};
      
        
    var data = [piep];

var layout = {
      title: "'Baseball Players' Pie Chart Based on Countries' Chart",
    };
  
Plotly.newPlot("plots", data, layout);

});

function prepData(playerData) {
var x = [];


playerData.forEach(function(datum, i) {

    x.push(new Date(datum[keys1]));
    y.push(datum[values1]);
});

return [{
    mode: 'lines',
    x: x,
    y: y
}];
};
// console.log("Hey", results);


abcc = function convert(values1) {
    return{
        value: +values1.value
    };
}
const distinct = (value, index, self) => {
    return self.indexOf(value) === index;
};