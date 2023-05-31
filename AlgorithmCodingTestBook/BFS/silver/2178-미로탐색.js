const [NM,...maze] = require('fs').readFileSync(process.platform === 'linux'?'/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N,M] = NM.split(' ').map(Number)

const directions = [
    [0,1],
    [0,-1],
    [1,0],
    [-1,0],
]

class Queue {
    constructor(){
        this.arr = []
        this.head = 0
        this.tail = 0
    }

    push(value){
        this.arr.push(value)
        this.tail++
    }
    shift(){
        if(this.length === 0) return null
        else return this.arr[this.head++]
    }
    get length(){
        return this.tail-this.head
    }
}

const queue = new Queue()
let step = 1
queue.push(0)
queue.push('*')
const isVisited = new Set()
isVisited.add(0)
while(queue.length>1){
    const pos = queue.shift()
    if(pos === '*') {
        queue.push('*')
        step++
        continue
    }
    if(pos===N*M-1) {
        return console.log(step)
    }

    const x = ~~(pos/M)
    const y = pos%M

    for(const [dx,dy] of directions){
        const nx = x+dx
        const ny = y+dy
        if(0<=nx&&nx<N&&0<=ny&&ny<M && !isVisited.has(nx*M+ny) && maze[nx][ny] === '1'){
            isVisited.add(nx*M+ny)
            queue.push(nx*M+ny)
        }
    }
}

// 00:21:56 맞았습니다(196ms)