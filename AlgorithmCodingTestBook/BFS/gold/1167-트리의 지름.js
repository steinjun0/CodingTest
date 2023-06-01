const [N, ...edgesInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map((rowInput,i)=>{
        if(i===0){
            return +rowInput
        }else{
            const row = rowInput.split(' ').map(Number)
            const temp = []
            temp.push(row[0])
            for(let i=1;i<row.length-1;i+=2){
                temp.push([row[i]-1,row[i+1]])
            }
            return temp
        }
    })
const edges = edgesInput.sort((a,b)=>a[0]-b[0]).map(e=>e.slice(1))

class Queue{
    constructor(){
        this.arr = []
        this.head= 0 
        this.tail=0
    }

    push(value){
        this.arr.push(value)
        this.tail++
    }

    shift(){
        if(this.head===this.tail) return null
        else return this.arr[this.head++]
    }

    get length(){
        return this.tail-this.head
    }
}

function bfs(start){
    const queue = new Queue()
    queue.push(start)
    const isVisited = Array(N).fill(false)
    const distances = Array(N).fill(0)
    isVisited[start] = 0
    while(queue.length>0){
        const node = queue.shift()
        for(const [nextNode, distance] of edges[node]){
            if(isVisited[nextNode]===false){
                isVisited[nextNode] = true
                distances[nextNode] = distances[node] + distance
                queue.push(nextNode)
            }
        }
    }

    let max = -1
    let maxIndex = null
    for(let i=0;i<N;i++){
        if(distances[i]>max){
            max = distances[i]
            maxIndex = i
        }
    }
    // console.log(isVisited)
    return [maxIndex,max]
}

const [first,firstDistance] = bfs(0)
const [second,secondDistance] = bfs(first)
console.log(secondDistance)



// 00:44:09 -> 새롭게 생각(bfs로)
// 01:05:55 메모리초과(2%) -> distances 밖에서 받지 않음
// 01:08:17 메모리초과(2%) -> 인접리스트 제거 (안될거 같음)
// 01:20:50 메모리초과(2%) -> linksInput length=0 -> 입력부터 초기화
// 01:38:10 시간초과(2%) -> 인접리스트 복귀
// 01:45:42 틀렸습니다(2%) -> input 부분 인덱스 맞춰줌
// 01:48:24 틀렸습니다(2%) ->
// 01:54:22 포기 -> 아이디어 맞단다.. -> 좀 더 탐색
// 01:57:21 틀렸습니다(2%) ->
// 다음날 새로
// 00:10:15 틀렸습니다(2%) -> second만 사용
// 00:12:09 틀렸습니다(2%) -> 질문 게시판 확인 -> 노드가 순서대로 주어지지 않음
// 00:25:08 맞았습니다 -> Queue 클래스 생성
// 00:27:08