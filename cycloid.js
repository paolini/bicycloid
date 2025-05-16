class Cycloid {
    constructor(width, height, options) {
        this.width = width;
        this.R = (0.05+0.05*Math.random()) * height;
        this.angle = Math.random() * 2 * Math.PI;
        this.x = -Math.cos(this.angle) * this.R
        this.y = Math.random() * height;
        this.options = options;
        this.points = [];
        this.color = 'rgb(' + Math.round(256 - Math.random() * 128) + ',' + Math.round(256-Math.random() * 128) + ',' + Math.round(256 - Math.random() * 128) + ')';
        this.speed = (0.5+0.5*Math.random())*0.1;
        this.visible = true;
        this.update()
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        // draw the cycloid path
        for (var i = 0; i < this.points.length; i++) {
            ctx.lineTo(this.points[i].x, this.points[i].y);
        }
        ctx.stroke();
        ctx.beginPath();
        // draw the circle
        ctx.arc(this.x, this.y, this.R, 0, 2 * Math.PI);
        ctx.stroke();
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