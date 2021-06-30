import { XYPoint, XYPointObj, Faces } from "./interfaces"

export class AlgorThree {  

    /**
    * @desc Given a point and the output of AlgorOne, finds the face that
    * contains the given point     * 
    * @params data-> [[{ x: ; y: }]] , point-> { x: , y: }
    * @return 
    */

   public xRay = 1000;
   public point: XYPointObj | any;
   public temp:any = []
   public next: number = 0;
   public vector1: number = 0;
   public vector2: number = 0;
   public cond1: boolean | undefined;
   public cond2: boolean | undefined;
   public ptXBool: boolean | undefined;
   public faceContainerBool: boolean = false;
   public det: number | undefined;
   public nom1: number | undefined;
   public nom2: number | undefined;
   public facialContainers: any = [];
   public res: any = {}


    constructor( public data: any ) {
        this.data = data;
    }

    isPtInsideAFace( point: XYPointObj) {
        /**
         * Here I created an x-axis ray that starts at the given point, 
         * and extends a large amount ( 1000 units ).  Then I loop through each face, 
         * generating a line segment from [i] to [next], and use the modulo
         * function to reset back to the [0] when its the last vertex. 
         * If there is one intersection between the xRay and a line segment of
         * the face, it is within its boundary.  If it is, 
         * the faceId, and associated points, are stored, then provided in the 
         * output.
         * 
         * 
         */
        for(let [idx, face] of this.data.entries()) {
            this.temp = [];
            for( let i = 0; i < face.length; i++ ) {
                this.next = ( i + 1 ) % face.length; 

                // get line segments of each face and compare w/ given point
                [ this.nom1, this.nom2 ] = [
                    (( face[this.next].x - face[i].x )*( point.y - face[i].y ) - 
                    ( face[this.next].y - face[i].y )*( point.x - face[i].x )),
                    (( this.xRay - point.x )*( point.y - face[i].y ) - 
                    ( point.y - point.y )*( point.x - face[i].x ))
                ];

                // calculate determinant...
                this.det = (
                    (( face[this.next].y - face[i].y )*( this.xRay - point.x )) - 
                    (( face[this.next].x - face[i].x )*( point.y - point.y ))
                );

                //create vectors
                this.vector1 = this.nom1 / this.det;  
                this.vector2 = this.nom2 / this.det;

                /**
                 * if vector > 0 intersection is after second point
                 * if vector < 0 intersection is before first point
                 * otherwise the two lines intersect...
                 */
                this.cond1 = ( this.vector1 > 0 && this.vector1 < 1 );
                this.cond2 = ( this.vector2 > 0 && this.vector2 < 1 );
                
                //if conditions are met push to temporary array
                this.ptXBool = ( this.cond1 && this.cond2 );                 
                this.temp.push( this.ptXBool );  
                          
            }
            //place in faceContainer if there is only (1) intersection
            this.faceContainerBool = this.temp.filter( ( x: boolean ) => x == true ).length == 1;
            if ( this.faceContainerBool ){
                this.facialContainers.push (
                    {
                        'faceId': idx,
                        'facePts': face
                    }
                );                
            }
        }
        this.res['facialData'] = this.facialContainers;
        console.log( JSON.stringify( this.res ) )
        return JSON.stringify(this.res)
    }
}

/*
curated examples for testing that match the 
canvasData of AlgorOne output:
*/

let highArc = [
    [ { x: 0, y: 0 }, { x: 2, y: 0 }, { x: 2, y: 2 } ],
    [ { x: 2, y: 2 }, { x: 0, y: 0 }, { x: 0, y: 2 } ]
]

let polygon1 = [
    [ { x: 9, y: 10 }, { x: 3, y: 3 }, { x: 13, y: 4 } ],
    [ { x: 13, y: 4 }, { x: 21, y: 2 }, { x: 16, y: 9 } ],
    [ { x: 16, y: 9 }, { x: 23, y: 21 },{ x: 12, y: 15 } ], 
    [ { x: 12, y: 15 }, { x: 9, y: 10 }, { x: 3, y: 17 } ],
    [ { x: 9, y: 10 }, { x: 12, y: 15 }, { x: 16, y: 9 }, { x: 13, y: 4 } ]
  ]

let polygon2 = [    
        [ { x: 9, y: 5 }, { x: 19, y: 3 }, { x: 17, y: 26 } ],      
        [ { x: 19, y: 3 }, { x: 17, y: 26 }, { x: 25, y: 10 } ],
        [ { x: 17, y: 26 }, { x: 9, y: 5 }, { x: 7, y: 12 } ]
]

/** The following tests, specifically 1 and 2 are version with the
 * correct composition of facial coordinates to show the efficacy of algorithm #3
 */

// let test0 = new AlgorThree(highArc);
// test0.isPtInsideAFace({x:0.5,y:1});

// let test1 = new AlgorThree(polygon1);
// test1.isPtInsideAFace({x:8,y:5});

// let test2 = new AlgorThree(polygon2);
// test2.isPtInsideAFace({x:20,y:15});