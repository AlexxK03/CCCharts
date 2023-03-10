let table
let data = []
let charts = []
let palette = ["#D86D3C","#E8773D","#F0B941","#4DC0A7","#68F1F1"]

function preload(){
    table = loadTable('data/MasterData.csv', 'csv', 'header');
    irish = loadTable('data/irishLanguage.csv','csv','header')
    disability = loadTable('data/disabilities.csv','csv','header')
    cars = loadTable('data/MasterDataCars.csv','csv','header')
}

function tidy(){
    for (let x=0; x<table.getRowCount();x++){
        data.push(table.rows[x].obj.total)
    }
}



function setup(){
    createCanvas(1700, 1600)
    background(0)
    angleMode(DEGREES)
    tidy()

    charts.push(new BarChart({
        _height:300,
        _width:300,
        _posX:50,
        _posY:375,
        _title:"Mechanically Propelled Vehicles Under Licence Each Year",
        _data:cars,
        _valueX:"county",
        _valueY:"mean",
        _tickCount:10,
        _showLabels:1}
        ))   
         
    charts.push(new HorizontalChart({
        _height:300,
        _width:300,
        _posX:475,
        _posY:350,
        _data:table,
        _valueX:"Year",
        _valueY:"total",
        _tickCount:10,
        _showLabels:1}
        ))    

    charts.push(new StackChart({
        _height:300,
        _width:300,
        _posX:50,
        _posY:800,
        _title:"population over 15 in 2011 & 2016 sorted by disability",    
        _data:disability,
        _valueX:"Disability Type",
        _valueY:["2011","2016"],  
        _valueT:"total",
        _tickCount:10,
        _showLabels:1,}
        ))    

    charts.push(new HStackChart({
        _height:300,
        _width:300,
        _posX:475,
        _posY:775,
        _data:cars,
        _title:"Mechanically Propelled Vehicles Under Licence Each Year",
        _valueX:"county",
        _valueY:["car","Tractors"],
        _valueT:"total",
        _tickCount:10,
        _showLabels:1}
        ))    

    charts.push(new StackChartWLine({
        _posX:975,
        _posY:350,
        _data:disability,
        _title:"population over 15 in 2011 & 2016 sorted by disability",
        _valueX:"Disability Type",
        _valueY:["2011","2016"],
        _valueT:"total",
        _valueM:"mean"}
        )) 

    charts.push(new ScatterChart({
        _posX:475,
        _posY:1175,
        _data:disability,
        _title:"population over 15 in 2011 & 2016 sorted by disability",
        _valueX:"Disability Type",
        _valueY:["2011","2016"],
        _valueT:"total",
        _valueM:"mean"}
         )) 
    
}

function draw(){
    pixelDensity(2);    
    background(0)
    noLoop()
    
    for(let x=0; x<charts.length; x++){
     charts[x].render()
    }

}