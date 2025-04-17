class Canvas {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.squareSize = 90;
        this.resizeCanvas();
        this.drawSquares();
    }

    resizeCanvas() {
        const pixelRatio = window.devicePixelRatio || 1;
        this.canvas.width = this.canvas.parentElement.offsetWidth * pixelRatio;
        this.canvas.height = this.canvas.parentElement.offsetHeight * pixelRatio;
        this.ctx.scale(pixelRatio, pixelRatio);
        this.canvas.style.height = this.canvas.parentElement.offsetHeight + 'px';
        this.canvas.style.width= this.canvas.parentElement.offsetWidth + 'px';
    }

    drawSquares() {
        const rows = Math.ceil(this.canvas.height / this.squareSize);
        const columns = Math.ceil(this.canvas.width / this.squareSize);

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for(let x=0; x < columns; x++) {
            for(let y =0; y < rows; y++) {
                const isGrey = Math.random() < 0.1;
                this.ctx.fillStyle = isGrey ? 'rgb(220,220,200)' : 'transparent';
                this.ctx.fillRect(x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize);
                this.ctx.strokeStyle = `rgba(181,181,181, 1)`;
                this.ctx.strokeRect(x * this.squareSize, y * this.squareSize, this.squareSize, this.squareSize); 
            }
        }
    }

}

export{
    Canvas
}