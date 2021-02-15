// SCATTER ============================================================================

// set the dimensions and margins for scatter graph

var margin = {top: 50, right: 90, bottom: 30, left: 50},
    width = 850 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg1 = d3.select("#scatter")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform","translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.json("/api/tStats").then(function(data) {
        console.log(data);
        
  // Add X axis
  var x = d3.scaleLinear()
    .domain([0, 90]) //wins
    .range([ 0, width ]);
  svg1.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));

  // Add X axis label:
  svg1.append("text")
    .attr("text-anchor", "end")
    .attr("x", width/2 + margin.bottom - 5)
    .attr("y", height + margin.top - 10)
    .text("Team Wins by Seasons");

  // Y axis label:
  svg1.append("text")
  .attr("text-anchor", "end")
  .attr("transform", "rotate(-90)")
  .attr("y", -margin.left + 75)
  .attr("x", -margin.top - height/2 + 90)
  .text("Teams Points Values")

  // Add Y axis
  var y = d3.scaleLinear()
    .domain([0, 9000])
    .range([ height, 0]);
  svg1.append("g")
    .call(d3.axisLeft(y));

  svg1.append("text")
    .attr("x", (width / 2))             
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")  
    .style("font-size", "16px") 
    .style("text-decoration", "underline")  
    .text("Team Points to Wins");


  // Color scale for selected seasons
  var color = d3.scaleOrdinal()
    .domain(["one", "two", "three", "four", "five"])
    .range([ "red", "orange", "green", "blue", "yellow"])

  
  // Highlight the season that is hovered
  var highlight = function(d){

    var selected_season = d.Seasons
    var colour_group;

    if (selected_season === 2014) {
      colour_group = "one"
    } else if (selected_season === 2015) {
      colour_group = "two"
    } else if (selected_season === 2016) {
      colour_group = "three"
    } else if (selected_season === 2017) {
      colour_group = "four"
    } else {
      colour_group = "five"
    }
    
    d3.selectAll(".dot")
      .transition()
      .duration(200)
      .style("fill", "grey")
      .attr("r", 3)

    d3.selectAll("." + colour_group)
      .transition()
      .duration(200)
      .style("fill", color(colour_group))
      .attr("r", 7)
  }

  // Highlight the season that is hovered
  var doNotHighlight = function(){
    d3.selectAll(".dot")
      .transition()
      .duration(200)
      .style("fill", "grey")
      .attr("r", 5 )      
  }

  // Add dots
  svg1.append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
      .attr("class", function (d) {

        var colour_group;
        
        if (d.Seasons === 2014) {
          colour_group = "one"
        } else if (d.Seasons === 2015) {
          colour_group = "two"
        } else if (d.Seasons === 2016) {
          colour_group = "three"
        } else if (d.Seasons === 2017) {
          colour_group = "four"
        } else {
          colour_group = "five"
        }        

        return "dot " + colour_group } )
      
      .attr("cx", function (d) { return x(d.Wins); } )
      .attr("cy", function (d) { return y(d.Points); } )
      .attr("r", 5)
      .style("fill", function (d) { 
  
        var colour_group;
        
        if (d.Seasons === 2014) {
          colour_group = "one"
        } else if (d.Seasons === 2015) {
          colour_group = "two"
        } else if (d.Seasons === 2016) {
          colour_group = "three"
        } else if (d.Seasons === 2017) {
          colour_group = "four"
        } else {
          colour_group = "five"
        }
        
        return color(colour_group) } )

    .on("mouseover", highlight)
    .on("mouseleave", doNotHighlight )
      .append('title') // Tooltip
        .text(function (d) { return d.TeamName +
                        '\nSeason: ' + (d['Seasons']) +
                        '\nPoints: ' + (d['Points']) +
                        '\nWins: ' + (d['Wins']) })
}).catch(function(error) {
  console.log(error);
});

// SCATTERLINE ========================================================================

// set the dimensions and margins for scatter line graph
var margin2 = {top: 50, right: 10, bottom: 30, left: 100},
    width = 700 - margin2.left - margin2.right,
    height = 400 - margin2.top - margin2.bottom;

// append the svg object to the body of the page
var svg2 = d3.select("#scatterLine")
  .append("svg")
    .attr("width", width + margin2.left + margin2.right)
    .attr("height", height + margin2.top + margin2.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin2.left + "," + margin2.top + ")");

//Read the data
 d3.json("/api/tStats2018").then(function(data) {
    console.log(data)
    // List of groups (here I have one group per column)
    var allGroup = ["Assists", "FieldGoals", "Points", "Rebounds"]

    // add the options to the button
    d3.select("#selectButton")
      .selectAll('myOptions')
     	.data(allGroup)
      .enter()
    	.append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button

    // Add X axis
    var x = d3.scaleLinear()
      .domain([0,30])
      .range([ 0, width ]);
    svg2.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));
    
      // Add Y1 axis
    var y = d3.scaleLinear()
      .domain( [0,4500])
      .range([ height, 0 ]);
    svg2.append("g")
      .call(d3.axisLeft(y));
  
    // Add X axis label:
    svg2.append("text")
      .attr("text-anchor", "end")
      .attr("x", width/2 + margin.bottom - 5)
      .attr("y", height + margin.top - 20)
      .text("Teams");

  // Y axis label:
    svg2.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left - 20)
      .attr("x", -margin.top - height + 250)
      .text("Teams Points Values")

    svg2.append("text")
      .attr("x", (width / 2))             
      .attr("y", 0 - (margin.top / 2))
      .attr("text-anchor", "middle")  
      .style("font-size", "16px") 
      .style("text-decoration", "underline")  
      .text("Team Stats");


    // Initialize line with group
    var line = svg2
      .append('g')
      .append("path")
        .datum(data)
        .attr("d", d3.line()
          .x(function(d) {return x(+d.ID) })
          .y(function(d) {return y(+d.Points) })
        )
        .attr("stroke", "black")
        .style("stroke-width", 4)
        .style("fill", "none")

    // Initialize dots with group a
    var dot = svg2
      .selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
        .attr("cx", function(d) {return x(+d.ID)})
        .attr("cy", function(d) {return y(+d.Points)})
        .attr("r", 7)
        .style("fill", "#69b3a2")
      // .append('title') // Tooltip
      //   .text(function (d) { return d.Team +
      //             '\nPoints: ' + (d['Points']) +
      //             '\nAssits: ' + (d['Assists']) +
      //             '\nField Goals: ' + (d['FieldGoals']) +
      //             '\nRebounds: ' + (d['Rebounds'])})

    // A function that update the chart
    function update(selectedGroup) {

      // Create new data with the selection?
      var dataFilter = data.map(function(d){return {ID: d.ID, value:d[selectedGroup]} })

      // Give these new data to update line
      line
          .datum(dataFilter)
          .transition()
          .duration(1000)
          .attr("d", d3.line()
            .x(function(d) {return x(+d.ID) })
            .y(function(d) { return y(+d.value)})
          )
      dot
        .data(dataFilter)
        .transition()
        .duration(1000)
          .attr("cx", function(d) { return x(+d.ID) })
          .attr("cy", function(d) { return y(+d.value) })
    }

    // When the button is changed, run the updateChart function
    d3.select("#selectButton").on("change", function(d) {
        // recover the option that has been chosen
        var selectedOption = d3.select(this).property("value")
        // run the updateChart function with this selected option
        update(selectedOption)

    })

}).catch(function(error) {
  console.log(error);
});