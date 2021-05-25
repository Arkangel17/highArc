"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const polygon_1 = require("./polygon");
const algorOne_1 = require("./algorOne");
const hiArcNodes = [[0, 0], [2, 0], [0, 2], [2, 2]];
const hiArcEdges = [[0, 1], [1, 2], [0, 2], [0, 3], [2, 3]];
const nodes1 = [[12, 15], [3, 3], [23, 21], [3, 17], [16, 9], [9, 10], [13, 4], [21, 2]];
const edges1 = [[0, 1], [0, 2], [0, 6], [0, 7], [1, 2], [2, 3], [2, 4], [3, 4], [4, 5], [4, 6], [5, 6], [6, 7]];
const nodes2 = [[7, 12], [25, 10], [9, 5], [19, 3], [17, 26]];
const edges2 = [[0, 1], [0, 3], [0, 4], [1, 2], [1, 3], [2, 3], [3, 4]];
let polygon1 = new polygon_1.Polygon(nodes1, edges1);
let polygon2 = new polygon_1.Polygon(nodes2, edges2);
let hiArc = new polygon_1.Polygon(hiArcNodes, hiArcEdges);
let algorOne = new algorOne_1.AlgorOne(polygon2.data);
// function algorOneCalc(){
//     algorOne.getAdjList()
//     // res.printAdj()
//     algorOne.dfs_color(0,0)
//     algorOne.getCycles()
//     algorOne.parseCanvasData()
//     return algorOne.json()
// }
let algorOneRes = algorOne.calc();
let faces = algorOneRes['canvasData'];
console.log(faces);
// let algor2 = new AlgorTwo(algorOneRes)
// function algorTwoCalc(){
//     algor2.facialNeighbors(0);
//     algor2.json()
// }
// let algors = {
//     'one': algorOneCalc(),
//     'two': algorTwoCalc()
// }
// console.log(algors)
if (typeof (window) == 'object') {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    function fillPolygon(faces, testCase) {
        let scale = {
            'hiArc': 200,
            'polygon1': 50,
            'polygon2': 33
        };
        for (let points of faces) {
            if (points.length > 0) {
                context.fillStyle = randomColor(); // all css colors are accepted by this property
                let point = points[0];
                // let scale = 33;            
                context.beginPath();
                context.moveTo(point.x * scale[testCase], point.y * scale[testCase]); // point 1            
                for (var i = 1; i < points.length; ++i) {
                    point = points[i];
                    context.lineTo(point.x * scale[testCase], point.y * scale[testCase]);
                }
                ;
                context.closePath(); // go back to point 1
                context.fill();
            }
        }
    }
    function randomColor() {
        let temp = new Array;
        for (let i = 0; i < 3; i++) {
            temp.push(Math.floor(Math.random() * 255));
        }
        return `rgba(${temp[0]},${temp[1]},${temp[2]})`;
    }
    fillPolygon(faces, 'polygon2');
}