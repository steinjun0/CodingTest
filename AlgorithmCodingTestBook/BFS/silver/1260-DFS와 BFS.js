const [[N,M,V], ...linksInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

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
        if(this.head === this.tail) return null
        else return this.arr[this.head++]
    }

    get length(){
        return this.tail-this.head
    }
}

const links = Array.from(Array(N+1),()=>[])
for(const [a,b] of linksInput){
    links[a].push(b)
    links[b].push(a)
}
for(let i=1;i<=N;i++){
    links[i].sort((a,b)=>a-b)
}

let visited = Array(N+1).fill(false)
const dResult = []
function dfs(node){
    dResult.push(node)
    visited[node] = true
    for(const nextNode of links[node]){
        if(!visited[nextNode]){
            dfs(nextNode)
        }
    }
}
dfs(V)

visited = Array(N+1).fill(false)
const bResult = []
function bfs(start){
    const queue = new Queue()
    queue.push(start)
    visited[start] = true
    while(queue.length > 0){
        const node = queue.shift()
        bResult.push(node)
        for(const nextNode of links[node]){
            if(!visited[nextNode]){
                visited[nextNode] = true
                queue.push(nextNode)
            }
        }
    }
}
bfs(V)

console.log(dResult.join(' '))
console.log(bResult.join(' '))

// 00:16:01 틀렸습니다 -> dfs 변경(경로가 아님)
// 00:18:41 맞았습니다(220ms) -> Queue class 생성
// 00:21:03 맞았습니다(220ms) -> 필요없는 코드 제거
// 00:22:33