// results = {};
// // var keys1 = []
// // var values1 = []
// d3.csv("final.csv", function( error, playerData){
//     if (error) return console.warn(error);
// console.log("hello" + playerData)
//     var country_name1 = playerData.map(data => data.birthCountry)
//     const unique_countries = country_name1.filter(distinct);
//     var result = country_name1.reduce((a, c) => (a[c] = (a[c] || 0) + 1, a), Object.create(null));
//     console.log(result);

// const keys1 = Object.keys(result)
// const values1 = Object.values(result)

// });


// d3.csv('final4.csv', function (err, data) {
//   // Create a lookup table to sort and regroup the columns of data,
//   // first by year, then by continent:
//   var lookup = {};
//   function getData(birthYear, birthCountry) {
//     var byYear, trace;
//     if (!(byYear = lookup[birthYear])) {;
//       byYear = lookup[birthYear] = {};
//     }
// 	 // If a container for this year + continent doesn't exist yet,
// 	 // then create one:
//     if (!(trace = byYear[birthCountry])) {
//       trace = byYear[birthCountry] = {
//         x: [],
//         y: [],
//         id: [],
//         text: [],
//         marker: {size: []}
//       };
//     }
//     return trace;
//   }

//   // Go through each row, get the right trace, and append the data:
//   for (var i = 0; i < data.length; i++) {
//     var datum = data[i];
//     var trace = getData(datum.year, datum.country);
//     trace.text.push(datum.country);
//     trace.id.push(datum.country);
//     trace.x.push(datum.height);
//     trace.y.push(datum.weight);
//     trace.marker.size.push(datum.count);
//     console.log(trace);
//   }

//   // Get the group names:
//   var years = Object.keys(lookup);
//   // In this case, every year includes every continent, so we
//   // can just infer the continents from the *first* year:
//   var firstYear = lookup[years[0]];
//   var continents = Object.keys(firstYear);

//   // Create the main traces, one for each continent:
//   var traces = [];
//   for (i = 0; i < continents.length; i++) {
//     var data = firstYear[continents[i]];
// 	 // One small note. We're creating a single trace here, to which
// 	 // the frames will pass data for the different years. It's
// 	 // subtle, but to avoid data reference problems, we'll slice
// 	 // the arrays to ensure we never write any new data into our
// 	 // lookup table:
//     traces.push({
//       name: continents[i],
//       x: data.x.slice(),
//       y: data.y.slice(),
//       id: data.id.slice(),
//       text: data.text.slice(),
//       mode: 'markers',
//       marker: {
//         size: data.marker.size.slice(),
//         sizemode: 'area',
//         sizeref: 200000
//       }
//     });
//   }

//   // Create a frame for each year. Frames are effectively just
//   // traces, except they don't need to contain the *full* trace
//   // definition (for example, appearance). The frames just need
//   // the parts the traces that change (here, the data).
//   var frames = [];
//   for (i = 0; i < years.length; i++) {
//     frames.push({
//       name: years[i],
//       data: continents.map(function (country) {
//         return getData(years[i], country);
//       })
//     })
//   }

//   // Now create slider steps, one for each frame. The slider
//   // executes a plotly.js API command (here, Plotly.animate).
//   // In this example, we'll animate to one of the named frames
//   // created in the above loop.
//   var sliderSteps = [];
//   for (i = 0; i < years.length; i++) {
//     sliderSteps.push({
//       method: 'animate',
//       label: years[i],
//       args: [[years[i]], {
//         mode: 'immediate',
//         transition: {duration: 300},
//         frame: {duration: 300, redraw: false},
//       }]
//     });
//   }

//   var layout = {
//     xaxis: {
//       title: 'Countries',
//       range: [30, 85]
//     },
//     yaxis: {
//       title: 'Players from per country',
//       type: 'log'
//     },
//     hovermode: 'closest',
// 	 // We'll use updatemenus (whose functionality includes menus as
// 	 // well as buttons) to create a play button and a pause button.
// 	 // The play button works by passing `null`, which indicates that
// 	 // Plotly should animate all frames. The pause button works by
// 	 // passing `[null]`, which indicates we'd like to interrupt any
// 	 // currently running animations with a new list of frames. Here
// 	 // The new list of frames is empty, so it halts the animation.
//     updatemenus: [{
//       x: 0,
//       y: 0,
//       yanchor: 'top',
//       xanchor: 'left',
//       showactive: false,
//       direction: 'left',
//       type: 'buttons',
//       pad: {t: 87, r: 10},
//       buttons: [{
//         method: 'animate',
//         args: [null, {
//           mode: 'immediate',
//           fromcurrent: true,
//           transition: {duration: 300},
//           frame: {duration: 500, redraw: false}
//         }],
//         label: 'Play'
//       }, {
//         method: 'animate',
//         args: [[null], {
//           mode: 'immediate',
//           transition: {duration: 0},
//           frame: {duration: 0, redraw: false}
//         }],
//         label: 'Pause'
//       }]
//     }],
// 	 // Finally, add the slider and use `pad` to position it
// 	 // nicely next to the buttons.
//     sliders: [{
//       pad: {l: 130, t: 55},
//       currentvalue: {
//         visible: true,
//         prefix: 'Year:',
//         xanchor: 'right',
//         font: {size: 20, color: '#666'}
//       },
//       steps: sliderSteps
//     }]
//   };

//   // Create the plot:
//   Plotly.plot('graph', {
//     data: traces,
//     layout: layout,
//     frames: frames,
//   });
// });

// abcc = function convert(values1) {
//     return{
//         value: +values1.value
//     };
// }
// const distinct = (value, index, self) => {
//     return self.indexOf(value) === index;
// };


// Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/gapminderDataFiveYear.csv', function (err, data) {
//   // Create a lookup table to sort and regroup the columns of data,
//   // first by year, then by continent:
//   var lookup = {};
//   function getData(year, continent) {
//     var byYear, trace;
//     if (!(byYear = lookup[year])) {;
//       byYear = lookup[year] = {};
//     }
// 	 // If a container for this year + continent doesn't exist yet,
// 	 // then create one:
//     if (!(trace = byYear[continent])) {
//       trace = byYear[continent] = {
//         x: [],
//         y: [],
//         id: [],
//         text: [],
//         marker: {size: []}
//       };
//     }
//     return trace;
//   }

//   // Go through each row, get the right trace, and append the data:
//   for (var i = 0; i < data.length; i++) {
//     var datum = data[i];
//     var trace = getData(datum.year, datum.continent);
//     trace.text.push(datum.country);
//     trace.id.push(datum.country);
//     trace.x.push(datum.lifeExp);
//     trace.y.push(datum.gdpPercap);
//     trace.marker.size.push(datum.pop);
//   }

//   // Get the group names:
//   var years = Object.keys(lookup);
//   // In this case, every year includes every continent, so we
//   // can just infer the continents from the *first* year:
//   var firstYear = lookup[years[0]];
//   var continents = Object.keys(firstYear);

//   // Create the main traces, one for each continent:
//   var traces = [];
//   for (i = 0; i < continents.length; i++) {
//     var data = firstYear[continents[i]];
// 	 // One small note. We're creating a single trace here, to which
// 	 // the frames will pass data for the different years. It's
// 	 // subtle, but to avoid data reference problems, we'll slice
// 	 // the arrays to ensure we never write any new data into our
// 	 // lookup table:
//     traces.push({
//       name: continents[i],
//       x: data.x.slice(),
//       y: data.y.slice(),
//       id: data.id.slice(),
//       text: data.text.slice(),
//       mode: 'markers',
//       marker: {
//         size: data.marker.size.slice(),
//         sizemode: 'area',
//         sizeref: 200000
//       }
//     });
//   }
//   console.log(traces);

//   // Create a frame for each year. Frames are effectively just
//   // traces, except they don't need to contain the *full* trace
//   // definition (for example, appearance). The frames just need
//   // the parts the traces that change (here, the data).
//   var frames = [];
//   for (i = 0; i < years.length; i++) {
//     frames.push({
//       name: years[i],
//       data: continents.map(function (continent) {
//         return getData(years[i], continent);
//       })
//     })
//   }

//   // Now create slider steps, one for each frame. The slider
//   // executes a plotly.js API command (here, Plotly.animate).
//   // In this example, we'll animate to one of the named frames
//   // created in the above loop.
//   var sliderSteps = [];
//   for (i = 0; i < years.length; i++) {
//     sliderSteps.push({
//       method: 'animate',
//       label: years[i],
//       args: [[years[i]], {
//         mode: 'immediate',
//         transition: {duration: 300},
//         frame: {duration: 300, redraw: false},
//       }]
//     });
//   }

//   var layout = {
//     xaxis: {
//       title: 'Life Expectancy',
//       range: [30, 85]
//     },
//     yaxis: {
//       title: 'GDP per Capita',
//       type: 'log'
//     },
//     hovermode: 'closest',
// 	 // We'll use updatemenus (whose functionality includes menus as
// 	 // well as buttons) to create a play button and a pause button.
// 	 // The play button works by passing `null`, which indicates that
// 	 // Plotly should animate all frames. The pause button works by
// 	 // passing `[null]`, which indicates we'd like to interrupt any
// 	 // currently running animations with a new list of frames. Here
// 	 // The new list of frames is empty, so it halts the animation.
//     updatemenus: [{
//       x: 0,
//       y: 0,
//       yanchor: 'top',
//       xanchor: 'left',
//       showactive: false,
//       direction: 'left',
//       type: 'buttons',
//       pad: {t: 87, r: 10},
//       buttons: [{
//         method: 'animate',
//         args: [null, {
//           mode: 'immediate',
//           fromcurrent: true,
//           transition: {duration: 300},
//           frame: {duration: 500, redraw: false}
//         }],
//         label: 'Play'
//       }, {
//         method: 'animate',
//         args: [[null], {
//           mode: 'immediate',
//           transition: {duration: 0},
//           frame: {duration: 0, redraw: false}
//         }],
//         label: 'Pause'
//       }]
//     }],
// 	 // Finally, add the slider and use `pad` to position it
// 	 // nicely next to the buttons.
//     sliders: [{
//       pad: {l: 130, t: 55},
//       currentvalue: {
//         visible: true,
//         prefix: 'Year:',
//         xanchor: 'right',
//         font: {size: 20, color: '#666'}
//       },
//       steps: sliderSteps
//     }]
//   };

//   // Create the plot:
//   Plotly.plot('graph', {
//     data: traces,
//     layout: layout,
//     frames: frames,
//   });
// });


Plotly.d3.csv('final6.csv', function (err, data) {
  // Create a lookup table to sort and regroup the columns of data,
  // first by year, then by continent:
  var lookup = {};
  function getData(year, continent) {
    var byYear, trace;
    if (!(byYear = lookup[year])) {;
      byYear = lookup[year] = {};
    }
	 // If a container for this year + continent doesn't exist yet,
	 // then create one:
    if (!(trace = byYear[continent])) {
      trace = byYear[continent] = {
        x: [],
        y: [],
        id: [],
        text: [],
        marker: {size: []}
      };
    }
    return trace;
  }

  // Go through each row, get the right trace, and append the data:
  for (var i = 0; i < data.length; i++) {
    var datum = data[i];
    var trace = getData(datum.year, datum.country);
    trace.text.push(datum.country);
    trace.id.push(datum.country);
    trace.x.push(datum.weight);
    trace.y.push(datum.height);
    trace.marker.size.push(datum.count * 11000);
  }

  // Get the group names:
  var years = Object.keys(lookup);
  // In this case, every year includes every continent, so we
  // can just infer the continents from the *first* year:
  var firstYear = lookup[years[0]];
  var continents = Object.keys(firstYear);

  // Create the main traces, one for each continent:
  var traces = [];
  for (i = 0; i < continents.length; i++) {
    var data = firstYear[continents[i]];
	 // One small note. We're creating a single trace here, to which
	 // the frames will pass data for the different years. It's
	 // subtle, but to avoid data reference problems, we'll slice
	 // the arrays to ensure we never write any new data into our
	 // lookup table:
    traces.push({
      name: continents[i],
      x: data.x.slice(),
      y: data.y.slice(),
      id: data.id.slice(),
      text: data.text.slice(),
      mode: 'markers',
      marker: {
        size: data.marker.size.slice(),
        sizemode: 'area',
        sizeref: 2000
      }
    });
  }
  console.log(traces);

  // Create a frame for each year. Frames are effectively just
  // traces, except they don't need to contain the *full* trace
  // definition (for example, appearance). The frames just need
  // the parts the traces that change (here, the data).
  var frames = [];
  for (i = 0; i < years.length; i++) {
    frames.push({
      name: years[i],
      data: continents.map(function (continent) {
        return getData(years[i], continent);
      })
    })
  }

  // Now create slider steps, one for each frame. The slider
  // executes a plotly.js API command (here, Plotly.animate).
  // In this example, we'll animate to one of the named frames
  // created in the above loop.
  var sliderSteps = [];
  for (i = 0; i < years.length; i++) {
    sliderSteps.push({
      method: 'animate',
      label: years[i],
      args: [[years[i]], {
        mode: 'immediate',
        transition: {duration: 300},
        frame: {duration: 300, redraw: false},
      }]
    });
  }

  var layout = {
    xaxis: {
      title: 'Weight',
      range: [30, 350]
    },
    yaxis: {
      title: 'Height',
      range: [0, 170],
    //   type: 'log'
    },
    hovermode: 'closest',
	 // We'll use updatemenus (whose functionality includes menus as
	 // well as buttons) to create a play button and a pause button.
	 // The play button works by passing `null`, which indicates that
	 // Plotly should animate all frames. The pause button works by
	 // passing `[null]`, which indicates we'd like to interrupt any
	 // currently running animations with a new list of frames. Here
	 // The new list of frames is empty, so it halts the animation.
    updatemenus: [{
      x: 0,
      y: 0,
      yanchor: 'top',
      xanchor: 'left',
      showactive: false,
      direction: 'left',
      type: 'buttons',
      pad: {t: 87, r: 10},
      buttons: [{
        method: 'animate',
        args: [null, {
          mode: 'immediate',
          fromcurrent: true,
          transition: {duration: 300},
          frame: {duration: 500, redraw: false}
        }],
        label: 'Play'
      }, {
        method: 'animate',
        args: [[null], {
          mode: 'immediate',
          transition: {duration: 0},
          frame: {duration: 0, redraw: false}
        }],
        label: 'Pause'
      }]
    }],
	 // Finally, add the slider and use `pad` to position it
	 // nicely next to the buttons.
    sliders: [{
      pad: {l: 130, t: 55},
      currentvalue: {
        visible: true,
        prefix: 'Year:',
        xanchor: 'right',
        font: {size: 20, color: '#666'}
      },
      steps: sliderSteps
    }]
  };

  // Create the plot:
  Plotly.plot('graph', {
    data: traces,
    layout: layout,
    frames: frames,
  });
});