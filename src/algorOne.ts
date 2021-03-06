
export class AlgorOne {
    /**
    * @desc 
    * @param 
    * @return 
    */

    public N = 30;
    public mark = new Array(this.N).fill(0);
    public color = new Array(this.N).fill(0);
    public cycles = new Array(this.N).fill([]);
    public parent = new Array();
    public edgeArrLen: number;
    public cycleNum: number = 0;
    public visited = new Array(this.N).fill([]);

    constructor( public data: any, public adjacencyList: any = {} ) {
        this.data = data;
        this.edgeArrLen = this.data.nodes.length; 
        this.mark;
        this.cycles;
        this.color; 
        this.data.nodes.map( ( item: any ) => {
            this.adjacencyList[item.index] = []
        });
    };

    calc(){
        this.getAdjList()
        // res.printAdj()
        this.dfs_color(0,0)
        this.getCycles()
        this.parseCanvasData()
        return this.data
    }
     
    getAdjList(){
    /**
    * @desc processes the array of array edges into an adjacency list
    * @params number[][]
    * @return object
    */
        this.data.edges.map((e_item: any) => {
            this.addEdges( e_item[0], e_item[1] )
        });
        this.data['adjList'] = this.adjacencyList;
        // console.log('adjList', this.adjacencyList)
    };

    addEdges( v: any, e: any ) {
        this.adjacencyList[v].push(e);
        this.adjacencyList[e].push(v);
    };

    printAdj(){
        this.data.nodes.map((item: any) => {
            // console.log(`${item.index} : ${this.adjacencyList[item.index]}`)
        });
    };

    /*
    - use DFS, w/ graph coloring method, marked all the vertices of diff. 
    cycles w/ unique numbers.
    - once graph is completed, push all sim. marked numbers to an adj list.
    */
  
    dfs_color(u: any, p: any){
        
        if ( this.color[u] == 2 ){ return };

        if ( this.color[u] == 1 ){ 
            this.cycleNum += 1;
            let current = p;
            this.mark[current] = this.cycleNum;
           
            while(current != u){                
                current = this.parent[current];
                this.mark[current] = this.cycleNum;                
            } 
            return 
        };

        this.parent[u] = p;
        this.color[u] = 1;
        
        for(let item of this.adjacencyList[u]) {  
            this.visited.push({
                'u': u,
                'p': p,
                'v': item,
                'parent[u]': this.parent[u],
                'cycleNum': this.cycleNum
            })          
            // console.log(`u: ${u}, p: ${p}, v: ${item}, parent[u]:${this.parent[u]}, cycleNum: ${this.cycleNum}, color[u]: ${this.color[u]}`);
            if(item == this.parent[u]){
               continue;
            }            
            this.dfs_color(item, u);
        }
        this.color[u] = 2;
    };


    getCycles(){ 
        /** this function is parsing through the data processed by dfs_color
         *  based on their respective cycle, or closed path. Admittedly, this portion
         * and the dfs_color is a bit unstable and requires more attention. */       
        for(let i = 0; i < this.cycleNum; i++){  
            let temp = new Set();
            let obj: any = {}  
            this.visited.map((item: any) =>{
                if(item.cycleNum == i){
                    if( item['parent[u]'] == 0 || item.v == 0) { temp.add(0) };
                    temp.add(item.u);
                };                
            });
            obj[i] = Array.from(temp);
            this.cycles[i].push(obj);            
        };

        this.data['intPolygons'] = this.cycles[0];
        this.data['numOfIntFaces'] = this.cycleNum 
    }

    parseCanvasData(){

        let res = new Array;        
        for(let [idx, face] of this.cycles[0].entries()){
            let temp = new Array;
            let faceArr = Array.from(face[idx])
            faceArr.map((item: any) => {
                temp.push({'x': this.data['nodes'][item]['x'], 'y': this.data['nodes'][item]['y']})
            })
            res.push(temp)
        }
        this.data['canvasData'] = res;
    };

    jsonOutput(){
        console.log(JSON.stringify(this.data));
        // return this.data;
    };
}

