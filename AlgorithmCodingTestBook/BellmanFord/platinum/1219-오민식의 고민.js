const [[N,S,D,M],...linksInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const earns = linksInput[linksInput.length-1]
linksInput.length = linksInput.length-1

const links = Array.from({length: N}, ()=>[])

for(const [a,b,c] of linksInput){
    links[a].push([b,c])
}

const distances = Array(N).fill(Infinity)
distances[S] = -earns[S]


class Queue{
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

function isReachable(a,b){
    const queue = new Queue()
    queue.push(a)
    const isVisited = Array(N).fill(false)
    isVisited[a] = true
    while(queue.length>0){
        const node = queue.shift()
        if(node === b) return true
        for(const [nextNode] of links[node]){
            if(!isVisited[nextNode]){
                isVisited[nextNode] = true
                queue.push(nextNode)
            }
        }
    }
    return false
}

const cycles = []
for(let count=1;count<=N;count++){
    for(let node=0;node<N;node++){
        if(distances[node] !== Infinity){
            for(const [nextNode, nextCost] of links[node]){
                if(distances[nextNode] > distances[node]+nextCost-earns[nextNode]){
                    if(count===N) {
                        cycles.push(nextNode)
                        
                    }
                    distances[nextNode]=distances[node]+nextCost-earns[nextNode]
                }
            }
        }
    }
    
}
if(distances[D] === Infinity){
    return console.log('gg')
}
for(const cycle of cycles){
    if(isReachable(cycle, D)){
        return console.log('Gee')
    }
}


console.log(-1*distances[D])

// 00:21:00 틀렸습니다(15%) -> links 출발지 도착지 동일시 예외처리
// 00:26:20 틀렸습니다(15%) -> 사이클과 도착지 연관 확인
// 00:44:15 틀렸습니다(5%) -> 좀 더 엄격하게 검사
// 00:52:14 틀렸습니다(16%) -> 검사 부분 실수 수정
// 00:56:17 틀렸습니다(44%) -> 검사 부분 BFS로 수정
// 01:11:05 틀렸습니다(44%) -> 포기