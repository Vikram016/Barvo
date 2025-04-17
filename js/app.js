import {Canvas} from "./canvas.js";

const canvasElements = [...document.querySelectorAll('canvas')];

let canvasArray = [];

canvasElements.forEach(canvas => {
    let squareCanvas = new Canvas (canvas);
    canvasArray.push(squareCanvas);
})

window.addEventListener('resize', ()=> {
    canvasArray.forEach(canvas => {
        canvas.resizeCanvas()
        canvas.drawSquares()
    })
})

