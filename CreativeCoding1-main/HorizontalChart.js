class HorizontalChart{
    constructor({
        _height=300,
        _width=300,
        _posX=475,
        _posY=350,
        _title = "National Route Length over all authorities in Kilometers",
        _data,
        _valueX,
        _valueY,
        _tickCount=10,
        _showLabels=1
    })
    {
        this.height = _height  
        this.width = _width  
        this.posX = _posX  
        this.posY = _posY  
        this.data = _data  
        this.valueX = _valueX
        this.valueY = _valueY
        this.title = _title
        this.margin = 20
        this.gap = 10
        this.tickCount = _tickCount
        this.showLabels = _showLabels

        this.bWidth = (this.width - (this.margin*2) - ((this.data.getRowCount() -1)*this.gap))/this.data.getRowCount() 

        this.max = this.maxC();

    }

   

    render(){
        push()
        translate(this.posX, this.posY)
        this.horizontalAxis()
        this.vericalAxis()
        this.bars()
        this.ticks()
        this.labels()
        this.maxC()
        this.hLabel()
        this.name()
        pop()
    }

    horizontalAxis(){
        noFill()
        stroke(255)
        strokeWeight(1)
        line(0,0,this.width,0)
    }

    vericalAxis(){
        noFill()
        stroke(255)
        strokeWeight(1)
        line(0,0,0,-this.height)
    }
    
    bars(){
        for(let x = 0; x<this.data.getRowCount(); x++){
            noStroke()
            let gap = x * (this.gap + this.bWidth)
            let palette = ["#0FA3B1","#4357AD","#F03A47","#F1C40F","#00CC66"]
            let colorNum = x % palette.length
            fill(color(palette[colorNum]))
            let barH = int(-this.data.rows[x].obj[this.valueY])

            //switching around the values in comparison to the regular bar chart draws the bars this way. ex.the this.gap-gap calculation is now being draw as the height paramater rather than the width
            
            rect(0,-this.gap-gap,-this.scaler(barH),-this.bWidth)
        }
    }

    ticks(){
        let tickGap = this.width /(this.tickCount)
        for(let x =0; x<this.tickCount; x++){
            stroke(255)
            line(x*tickGap,0,x*tickGap,10)
        }
    }

    maxC(){
        let maxi =0;
        for(let x = 0; x<this.data.getRowCount(); x++){
            if (int(this.data.rows[x].obj[this.valueY])>maxi){
                maxi = int(this.data.rows[x].obj[this.valueY]);
            }
        }
        return(maxi)
    }

    labels(){
        for(let i=0; i<this.tickCount;i++){
            let tickGap = this.height /(this.tickCount) 
            if(this.showLabels == 1){
                let unitSpace = (this.max/this.tickCount).toFixed();
                // console.log(unitSpace)
                noStroke()
                textSize(12)
                fill(255)
                textAlign(CENTER)
                push()
                translate(i * tickGap,30)
                rotate(-75)
                text(i*unitSpace,0,0)
                pop()
            }
        }   
    }

    hLabel(){
        for(let x=0; x<this.data.getRowCount(); x++){
            if(this.showLabels == 1){
                let gap = x * (this.gap + this.bWidth)
                let years = this.data.rows[x].obj[this.valueX]
                push()
                textSize(12)
                translate(-15,-gap-this.gap)
                fill(255)
                textAlign(RIGHT,CENTER)
                text(years,0,0)
                pop()
            }
        }
    }

    name(){
        textSize(12)
        fill(255)
        textAlign(LEFT,CENTER) 
        push() 
        translate(0,-this.height-15)
        text(this.title,0,0)
        pop()
    }

    scaler(_num){
        return map(_num,0,this.max,0,this.height)
        // let scaleVal = this.max/this.height
        // return _num/scaleVal	
    }
        
}


