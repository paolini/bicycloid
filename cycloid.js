class Cycloid {
    constructor(width, height, options) {
        this.width = width;
        const size = (0.5+0.5*Math.random()) 
        this.R = size * 0.1 * height;
        this.L = this.R * 2.5;
        this.angle = Math.random() * 2 * Math.PI;
        this.x = -Math.cos(this.angle) * this.R - this.L
        this.y = Math.random() * (height-2*this.R) + this.R;
        this.options = options;
        this.points = [];
        this.color = 'rgb(' + Math.round(Math.random() * 128) + ',' + Math.round(Math.random() * 128) + ',' + Math.round(Math.random() * 128) + ')';
        this.speed = (0.5+0.5*Math.random())*size*0.2;
        this.visible = true;
        this.update()
    }

    draw(ctx) {
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.R / 30;
        ctx.beginPath();
        // draw the cycloid path
        for (var i = 0; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.lineTo(this.x, this.y);
        ctx.stroke();
        ctx.lineWidth = this.R / 15;
        for(var j=0;j<2;++j) {
            const L = this.L * j
            ctx.beginPath();
            // draw the circle
            ctx.arc(this.x+L, this.y, this.R, 0, 2 * Math.PI);
            ctx.stroke();
        }
    }

    update() {
        this.angle += this.speed;
        this.x += this.R * this.speed;
        const x = this.x + this.R * Math.cos(this.angle);
        const y = this.y + this.R * Math.sin(this.angle);
        if (x<this.width) {
            this.points.push({ x: x, y: y });
            if (this.points.length > 100) {
                this.points.shift();
            }
        } else {
            this.points.shift()
        }
        return this.points.length > 0
    }
}