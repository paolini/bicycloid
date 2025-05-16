class World {
    constructor($canvas, options) {
        this.ctx = $canvas.getContext('2d'); 
        this.objects = []
        this.options = {
            nObjects: 100,
            fillColor: 'rgb(0, 0, 0)',
            ...options }
        this.width = $canvas.width;
        this.height = $canvas.height;
        this.start();
    }
    
    draw() {
        const objects = this.objects;
        const ctx = this.ctx;
        ctx.fillStyle = this.options.fillColor;
        ctx.fillRect(0, 0, this.width, this.height);
        for (var i = 0; i < objects.length; i++) {
            objects[i].draw(ctx);
        }
    }

    update() {
        const objects = this.objects;
        for (var i = 0; i < objects.length; i++) {
            const alive = objects[i].update();
            if (!alive) {
                objects.splice(i, 1);
                i--;
            }
        }
        if (objects.length < this.options.nObjects) {
            objects.push(new Cycloid(this.width, this.height, this.options));
        }
    }

    start() {
        if (this.run) return;
        this.run = true;
        this.loop();
    }

    stop() {
        this.run = false;
    }

    loop() {
        if (!this.run) return;
        this.update();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}
