# Network-Data-Visualiser-using-D3.js



<p>This application makes use of web server to serve the static data file that contains multiple datasets as json data objects. These json objects are used to visualise as a network of nodes and relationships. The nodes are sites and the relationship are the weights of trade between each of the sites. The size of the nodes are proportional to the trade amount and the width of the amount of trade. The visualisation is created purely using D3.js</p>

<hr>

<h3>This assignement is implement using D3 Javascript Library. The navigation of the webpage works on routing with clicking on end points</h3>

<b>The assignment makes use of third party Javascript libraries like : Jquery, bootstrap</b>

Follow the steps to run this Web application:

1.  Unzip the submitted zip folder
2.  Open the terminal in the current folder/directory
3.  Run the following command 
        <i>python main.py</i> 
        This will run the back-end server which is responsible to serve the necessary files to run this application
    Pre requisite - the system should have python 3.x installed.
4.  navigate to localhost:5000 in the browser
5.  The home page will have 2 buttons:
    1. Load JSON data - on click of this button, the json data will be read and will be made available to other functions of the project
    2. Let us Start - on click, it will navigate to another page which will serve as a canvas to draw our network model.
    3. the navigated page will have 2 buttons - "Draw- the network model" and "Back"
    4. On click of the Draw button, the network model with nodes and edges will appear.
    5. Hovering over the nodes will instantiate a tooltip which will have information regarding : site name, total trading amount, number of links.

The application on start up looks like this.
![Open up Image](https://github.com/girish1993/girish1993.github.io/blob/master/1.png)

