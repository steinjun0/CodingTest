const [[N,M,K,X], ...links] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

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
        if(this.length === 0){
            return null
        }else{
            const result = this.arr[this.head++]
            return result
        }
    }

    get length(){
        return this.tail - this.head
    }

}

const closeList = Array.from(Array(N+1),()=>[])

for(const [a,b] of links){
    closeList[a].push(b)
}

function bfs(){
    const result = []
    const distances = Array(N+1).fill(-1)
    const queue = new Queue()
    queue.push(X)
    distances[X] = 0
    while(queue.length > 0){
        const node = queue.shift()
        if(distances[node] === K){
            result.push(node)
        }
        if(distances[node] === K+1){
            break
        }
        for(const nextNode of closeList[node]){
            if(distances[nextNode] === -1){
                distances[nextNode] = distances[node]+1
                queue.push(nextNode)
            }
        }
    }

    if(result.length > 0){
        return result.sort((a,b)=>a-b)
    }else{
        return [-1]
    }
}

console.log(bfs().join('\n'))

// 00:12:40 시간초과(2%) -> queue class 생성
// 00:16:03 맞았습니다(2560ms) -> 탈출코드 추가
// 00:17:11 맞았습니다(2572ms) -> 