
var json_data = new Object();

let drawchart = function(json_data,joined_data_arr){
    console.log("drawchart function called");
    console.log("json data in draw function is "+ json_data.nodes);
    var svgContainer = d3.select("#canvas_area").append("svg")
                                        .attr("width", 1000)
                                        .attr("height", 600)
                                        .style("border","solid");

    var div = d3.select("#canvas_area").append("div")	
        .attr("class", "tooltip")				
        .style("opacity", 0);

    

    var line = svgContainer.selectAll("line")
    .data(joined_data_arr)
    .enter()
    .append("line")
    
    
    var link = line
    .attr("x1", function(d){return d.x.x})     // x position of the first end of the line
    .attr("y1", function(d){return d.x.y})      // y position of the first end of the line
    .attr("x2", function(d){return d.y.x})     // x position of the second end of the line
    .attr("y2", function(d){return d.y.y})
    .attr("class","link")
    .attr("stroke-width", function(d) {return d.amount/80})
    .attr("stroke", "red");
    
    var circles = svgContainer.selectAll("circle")
                                .data(json_data.nodes)
                                .enter()
                                .append("circle");

    var node = circles
    .attr("class","node")
    .attr("cx", function (d) { return d.x; })
    .attr("cy", function (d) { return d.y; })
    .attr("r", function (d) { return cal_radius(d) })
    .style("fill", function(d) { return "blue"; })
    .on("mouseover", mouseOver(.2))
    .on("mouseout", mouseOut);

    var linkedByIndex = {};
    json_data.links.forEach(function(d) {
        linkedByIndex[d.node01 + "," + d.node02] = 1;
    });

    function cal_sum(d){
        var total_sum = 0
        json_data.links.forEach((p) => {
            if(p.node01 == d.id || p.node02 == d.id){
                total_sum = total_sum + p.amount;
            }
        })
        return total_sum;
        
    }

    function cal_links(d){
        var total_links = 0
        json_data.links.forEach((p) => {
            if(p.node01 == d.id || p.node02 == d.id){
                total_links = total_links + 1;
            }
        })
        return total_links;
    }

    function cal_radius(d){
        var total_sum = 0
        json_data.links.forEach((p) => {
            if(p.node01 == d.id || p.node02 == d.id){
                total_sum = total_sum + p.amount;
            }
        })
        return Math.sqrt(total_sum)/2;
    }

    // check the dictionary to see if nodes are linked
    function isConnected(a, b) {
        return linkedByIndex[a.id + "," + b.id] || linkedByIndex[b.id + "," + a.id] || a.id == b.id;
    }

    function mouseOver(opacity) {
        return function(d) {
            // check all other nodes to see if they're connected
            // to this one. if so, keep the opacity at 1, otherwise
            // fade
            div.transition()		
                .duration(200)		
                .style("opacity", .9);		
            div.html("<b>site id</b> : " +  d.id + "<br />" + "<b>total_trade</b> : "+cal_sum(d) + "<br />" + "<b>connected_locations</b> : " + cal_links(d))	
                .style("left", (d3.event.pageX) + "px")		
                .style("top", (d3.event.pageY - 28) + "px");

            node.style("stroke-opacity", function(o) {
                thisOpacity = isConnected(d, o) ? 1 : opacity;
                return thisOpacity;
            });
            node.style("fill-opacity", function(o) {
                thisOpacity = isConnected(d, o) ? 1 : opacity;
                return thisOpacity;
            });
            // also style link accordingly
            link.style("stroke-opacity", function(o) {
                return o.x === d || o.y === d ? 1 : opacity;
            });
            link.style("stroke", function(o){
                return o.x === d || o.y === d ? o.x.colour : "#ddd";
            });
        };
    }

    function mouseOut() {
        div.transition()		
            .duration(500)		
            .style("opacity", 0);
        node.style("stroke-opacity", 1);
        node.style("fill-opacity", 1);
        link.style("stroke-opacity", 1);
        link.style("stroke", "red");
    }
}


//Javascript functions
$(document).ready(function() {    
    $("#load_data").click(function() {
        $.get("load_data",function(data,status){
            recieved_data = JSON.parse(data);
            json_data.nodes = recieved_data.nodes;
            json_data.links = recieved_data.links;
            console.log("nodes data " + JSON.stringify(json_data.nodes));
            console.log("links data " + JSON.stringify(json_data.links));
            $("#msg_cnt").text("The File is loaded...");
            setTimeout(fade_out, 3000);
            function fade_out() {
                $("#msg_cnt").fadeOut().empty();
              }
        });
    });
});


$(document).ready(function() {    
    $("#start_btn").click(function() {
        window.location = "/canvas";
        
    });
});


$(document).ready(function() {    
    $("#nav_btn").click(function() {
        window.location = "/"; 
    });
});

$(document).ready(function() {    
    $("#chart_btn").click(function() {
        $.get("load_data",function(data,status){
            recieved_data = JSON.parse(data);
            json_data.nodes = recieved_data.nodes;
            json_data.links = recieved_data.links;
            let joined_data_arr = new Array();

            for (var element of json_data.links) {
                var count = 0;
                var joined_obj = new Object();
                for (var inner_element of json_data.nodes) {
                    if(element["node01"] == inner_element["id"]){
                        joined_obj.x = inner_element;
                        count = count + 1;
                    }
                    if(element["node02"] == inner_element["id"]){
                        joined_obj.y = inner_element;
                        count = count + 1;
                    }
                    if (count == 2){
                        joined_obj.amount = element["amount"];
                        joined_data_arr.push(joined_obj);
                        break;
                    } 
                }
            }
            console.log("joined data is " + JSON.stringify(joined_data_arr));
            drawchart(json_data,joined_data_arr);
        });            
    });
});