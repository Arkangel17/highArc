"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgorThree = void 0;
class AlgorThree {
    constructor(data) {
        this.data = data;
        /**
        * @desc updates inputs object values accoring to types
        * @param object input:object, flat?: boolean
        * @return object - inputs with serialize values
        */
        this.xRay = 1000;
        this.temp = [];
        this.next = 0;
        this.vector1 = 0;
        this.vector2 = 0;
        this.faceContainerBool = false;
        this.facialContainers = [];
        this.res = {};
        this.data = data;
    }
    isPtInsideAFace(point) {
        for (let [idx, face] of this.data.entries()) {
            this.temp = [];
            for (let i = 0; i < face.length; i++) {
                this.next = (i + 1) % face.length;
                [this.nom1, this.nom2] = [
                    ((face[this.next].x - face[i].x) * (point.y - face[i].y) -
                        (face[this.next].y - face[i].y) * (point.x - face[i].x)),
                    ((this.xRay - point.x) * (point.y - face[i].y) -
                        (point.y - point.y) * (point.x - face[i].x))
                ];
                this.det = (((face[this.next].y - face[i].y) * (this.xRay - point.x)) -
                    ((face[this.next].x - face[i].x) * (point.y - point.y)));
                this.vector1 = this.nom1 / this.det;
                this.vector2 = this.nom2 / this.det;
                this.cond1 = (this.vector1 > 0 && this.vector1 < 1);
                this.cond2 = (this.vector2 > 0 && this.vector2 < 1);
                this.ptXBool = (this.cond1 && this.cond2);
                this.temp.push(this.ptXBool);
            }
            this.faceContainerBool = this.temp.filter((x) => x == true).length == 1;
            if (this.faceContainerBool) {
                this.facialContainers.push({
                    'faceId': idx,
                    'facePts': face
                });
            }
        }
        this.res['facialData'] = this.facialContainers;
        console.log(JSON.stringify(this.res));
        return this.res;
    }
}
exports.AlgorThree = AlgorThree;
let highArc = [
    [{ x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 }],
    [{ x: 2, y: 2 }, { x: 0, y: 0 }, { x: 0, y: 2 }]
];
let polygon1 = [
    [{ x: 9, y: 10 }, { x: 3, y: 3 }, { x: 13, y: 4 }],
    [{ x: 13, y: 4 }, { x: 21, y: 2 }, { x: 16, y: 9 }],
    [{ x: 16, y: 9 }, { x: 23, y: 21 }, { x: 12, y: 15 }],
    [{ x: 12, y: 15 }, { x: 9, y: 10 }, { x: 3, y: 17 }],
    [{ x: 9, y: 10 }, { x: 12, y: 15 }, { x: 16, y: 9 }, { x: 13, y: 4 }]
];
let polygon2 = [
    [{ x: 9, y: 5 }, { x: 19, y: 3 }, { x: 17, y: 26 }],
    [{ x: 19, y: 3 }, { x: 17, y: 26 }, { x: 25, y: 10 }],
    [{ x: 17, y: 26 }, { x: 9, y: 5 }, { x: 7, y: 12 }]
];
let test1 = new AlgorThree(highArc);
test1.isPtInsideAFace({ x: 0.5, y: 1 });
let test2 = new AlgorThree(polygon1);
test2.isPtInsideAFace({ x: 8, y: 5 });
let test3 = new AlgorThree(polygon2);
test3.isPtInsideAFace({ x: 20, y: 15 });
