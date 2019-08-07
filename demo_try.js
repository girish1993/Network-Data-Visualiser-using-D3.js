var data_values = [10,20,30,40,50,5,2,12,70,26];
//create rectangles


d3.select("body").append("svg")
        .attr({"width":500,"height":500})

        
var bars = svg.selectAll("rect")
 .data(data_values)
 .enter()
 .append("rect")
 .attr("width","25px")
 .attr("height", function(d){ return d; });