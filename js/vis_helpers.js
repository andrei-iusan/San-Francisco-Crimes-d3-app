var DEBUG = false; // This affects performance!

var dataset = [];
var _dataset_ = []; // same dataset, but padded with 2 extra values
                    // using those values I can fill the area under the line.
var dataset_theft = []; //at the moment I have theft data in a different dataset
var xScale;
var yScale;
var chart_w = 720;
var chart_h = 480;
var padding_top = 65;
var padding_bottom = 40;
var padding_left = 55;
var padding_right = 10;
var titles = [];
var average_period = 30;
var normalized_btn = false;

// line helper functions

// renders line of total number of crimes
var lineTotal = d3.svg.line()
  .x(function(d) {
    return xScale(new Date(d['Date']));
    })
  .y(function(d) {
    index = parseInt(d['i'])-1;
    average = smoothing(dataset, index, average_period, function(d){
      return parseInt(d["Solved"]) + parseInt(d["Not Solved"]);
    });
    DEBUG ? console.log("average point for "+ d['Date'] + ": "+average) : null;
    return yScale(average);
    })
  .interpolate('linear');

// renders line of number of solved crimes
var lineSolved = d3.svg.line()
  .x(function(d) {
    return xScale(new Date(d['Date']));
    })
  .y(function(d) {
    DEBUG ? console.log(d) : null;
    index = parseInt(d['i'])-1;
    if (d['i']==0 || d['i']==dataset.length+1){
      return yScale(0);
    }
    average = smoothing(dataset, index, average_period, function(d){
      return parseInt(d["Solved"]);
    });
    DEBUG ? console.log("average point for "+ d['Date'] + ": "+average) : null;
    return yScale(average);
    })
  .interpolate('linear');

// renders line of percentage of total number of crimes (100%)
var lineTotalPerc = d3.svg.line()
  .x(function(d) {
    return xScale(new Date(d['Date']));
    })
  .y(function(d) {
    return yScale(100);
    })
  .interpolate('linear');

// renders line of percentage of solved crimes
var lineSolvedPerc = d3.svg.line()
  .x(function(d) {
    return xScale(new Date(d['Date']));
    })
  .y(function(d) {
    index = parseInt(d['i'])-1;
    if (d['i']==0 || d['i']==dataset.length+1){
      return yScale(0);
    }
    average = smoothing(dataset, index, average_period, function(d){
      
      return 100*parseFloat(d["Solved"])/(parseFloat(d["Solved"]) + parseFloat(d["Not Solved"]));
    });
    DEBUG ? console.log("average point for "+ d['Date'] + ": "+average) : null;
    return yScale(average);
    })
  .interpolate('linear');


function smoothing(dataset, index, average_period, formula){
  // returns the average of "average_period" elements around dataset[index]
  // it also takes a formula, such that the average can be performed on some 
  // combination of the variables in the dataset, since dataset[index] is 
  // an object, containing multiple variables
  sum=0;
  cnt=0;
  for (i=index-parseInt(average_period/2); i<index-parseInt(average_period/2) + average_period; i++){
    if(i<0){
      sum += formula(dataset[-i]);
    } else if(i>=dataset.length){
      sum += formula(dataset[2*dataset.length-i-1]);
    } else {
      sum += formula(dataset[i]);
    }
    cnt++;
  }
  return parseFloat(sum)/average_period;
}

// visualization svg window
var load_vis_page = function(page){
  if (page == 0){
    // hide svg
    d3.select(".visualization").attr("style", "display:none;").select(".plot_area").selectAll("*").remove();
    d3.select("#normalize-btn").attr("style", "background-color:white;");
    normalized_btn = false;
    loadData(function(){
      loadPage(page);
    });
  } else {
  // update title, assume descriptions file is loaded
    loadPage(page);
    //show visualization
    d3.select(".visualization").attr("style", "display:block;");
  }
};

function normalizeBtnClick(){
  // apply changes when the "normalize" button is pressed
  normalized_btn = !normalized_btn;
  if (normalized_btn){
    d3.select("#normalize-btn").attr("style", "background-color:#B6E7A8;");
  }
  else {
    d3.select("#normalize-btn").attr("style", "background-color:white;");
  }
  mutateChart(); 
}

function loadData(callback){
  d3.json("titles.json", function(error, data) {
    if (error) {  //If error is not null, something went wrong.
      DEBUG ? console.log(error) : null;  //Log the error.
    } else {      //If no error, the file loaded correctly. Yay!
      // descriptions = data["descriptions"];
      titles = data;
      callback();
    }
  });
  d3.csv("data/LARCENY_THEFT.csv", function(error, data) {
    if (error) {  //If error is not null, something went wrong.
      DEBUG ? console.log(error) : null;  //Log the error.
    } else {      //If no error, the file loaded correctly. Yay!
      dataset = data;
      _dataset_ = [{'i':0,'Date':dataset[0]['Date']}]
                          .concat(dataset)
                          .concat([{'i':dataset.length+1,'Date':dataset[dataset.length-1]['Date']}]);
          drawChart();
    }
  });
}

  // render the visualization
function drawChart(){
  // scales
  xScale = d3.time.scale()
       .domain([new Date(dataset[0]['Date']),
        new Date(dataset[dataset.length-1]['Date'])])
       .range([padding_left, chart_w-padding_right]);
  yScale = d3.scale.linear()
       .domain([0, 120])
       .range([chart_h-padding_bottom, padding_top]);
  var vis = d3.select(".plot_area");
  
  // line of total thefts
  vis.append('svg:path')
  .attr('d', lineTotal(dataset))
  .attr('class','lineplot total_crimes');

  // line of solved thefts
  vis.append('svg:path')
  .attr('d', lineSolved(_dataset_))
  .attr('class','lineplot solved_crimes');

  // axes
  var xAxis = d3.svg.axis()
    .scale(xScale)
    .orient("bottom");
  vis.append("g")
  .attr("class", "axis x")
  .attr("transform", "translate(0," + (chart_h - padding_bottom) + ")")
  .call(xAxis);

  var yAxis = d3.svg.axis()
    .scale(yScale)
    .orient("left")
    .ticks(10);
  vis.append("g")
    .attr("class", "axis y")
    .attr("transform", "translate(" + padding_left + ",0)")
    .call(yAxis);
  
  // axes labels
  vis.append("text")
    .attr("class","chart_ylabel")
    .attr("text-anchor","middle")
    .attr("x",25)
    .attr("y",chart_h/2)
    .attr("width",chart_h)
    .attr("height",25)
    .attr("transform", "rotate(-90 "+ 20 +" "+ chart_h/2 +")")
    .text("Number of thefts");

  vis.append("text")
    .attr("class","chart_xlabel")
    .attr("text-anchor","middle")
    .attr("x",chart_w/2)
    .attr("y",chart_h-5)
    .attr("width",chart_w)
    .attr("height",25)
    .text("Time");

  // display legend
  vis.append("g")
    .attr("class", "legend")
    .attr("x",10)
    .attr("y",10)
    .attr("width",100)
    .attr("height",padding_top-10)
    .attr("transform", "translate(" + (chart_w-150) + "," + 5 + ")");

  var legend = vis.select(".legend");
  legend.append("g")
    .attr("class", "total_crimes")
    .attr("height", 10)
    .attr("transform", "translate(" + 0 + "," + 0 + ")");
  legend.select(".total_crimes")
    .append("svg:path")
    .attr("d", "M 0 5 H 10")
    .attr("class", "lineplot total_crimes");
  legend.select(".total_crimes")
    .append("text")
    .attr("x", 15)
    .attr("y", 10)
    .text("all thefts");
  legend.append("g")
    .attr("class", "solved_crimes")
    .attr("height", 10)
    .attr("transform", "translate(" + 0 + "," + 15 + ")");;
  legend.select(".solved_crimes")
    .append("svg:path")
    .attr("d", "M 0 5 H 10")
    .attr("class", "lineplot solved_crimes");
  legend.select(".solved_crimes")
    .append("text")
    .attr("x", 15)
    .attr("y", 10)
    .text("solved thefts");
}

function mutateChart(){
  // transition between 2 line charts
  var svg = d3.select(".plot_area").transition().duration(500);
  var lineTotalPlot = svg.select(".lineplot.total_crimes");
  var lineSolvedPlot = svg.select(".lineplot.solved_crimes");

  if (normalized_btn){
    yScale = d3.scale.linear()
         .domain([0, 20])
         .range([chart_h-padding_bottom, padding_top]);
    var yAxis = d3.svg.axis()
      .scale(yScale)
      .ticks(5)
      .orient("left");
    d3.select(".axis.y").transition().duration(500)
    .call(yAxis);
    lineTotalPlot.attr('d', lineTotalPerc(dataset));
    lineSolvedPlot.attr('d', lineSolvedPerc(_dataset_));
    d3.select(".chart_ylabel").transition().duration(500).text("Percent of solved thefts");
    
  } else {
    yScale = d3.scale.linear()
         .domain([0, 120])
         .range([chart_h-padding_bottom, padding_top]);
    var yAxis = d3.svg.axis()
      .scale(yScale)
      .ticks(12)
      .orient("left");
    d3.select(".axis.y").transition().duration(500)
    .call(yAxis);
    lineTotalPlot.attr('d', lineTotal(dataset));
    lineSolvedPlot.attr('d', lineSolved(_dataset_));
    d3.select(".chart_ylabel").transition().duration(500).text("Number of thefts");
  }
}

function loadPage(page){
  DEBUG ? console.log("Adding title") : null;
  d3.select("#subtitle")
  .text(titles[page]);
  // update description
  d3.select(".page"+page).attr("style","display:block;");
}

