const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const directions = [[0,1],[1,0],[0,-1],[-1,0]]
const knightDirections = [
    [1,2],[-1,2],[2,1],[-2,1],
    [2,-1],[1,-2],[-1,-2],[-2,-1]
]

class Queue {
    constructor(){
        this.arr = []
        this.head = 0
        this.tail = 0
    }
    push(value){
        this.arr.push(value)
        this.tail+=1
    }
    shift(){
        if(this.head === this.tail){
            return null
        }else{
            const result = this.arr[this.head++]
            return result
        }
    }
    get length(){
        return this.tail-this.head
    }
}


function solve(input){
    const K = +input[0]
    const [W,H] = input[1].split(' ').map(Number)
    const space = input.slice(2).map(row=>row.split(' ').map(Number))

    function isValid([x,y]){
        return 0<=x&&x<H&&0<=y&&y<W&&space[x][y]===0
    }

    if(W===1 && H===1){
        if(space[0][0] === 1){
            return -1
        }else{
            return 0
        }
    }

    const queue = new Queue()
    queue.push([[0,0],0,K])
    const isVisited = Array.from(Array(H),()=>Array(W).fill(-1))
    isVisited[0][0] = K
    // const isVisited = Array.from(Array(H),()=>Array.from(Array(W),()=>new Set()))
    // isVisited[0][0].add(0*100 + K)
    while(queue.length > 0){
        const [[x,y],step,leftK] = queue.shift()
        for(const [dx,dy] of directions){
            const nx = dx + x
            const ny = dy + y
            if(isValid([nx,ny]) && isVisited[nx][ny] < leftK){
                if(nx===H-1 && ny===W-1){
                    return step+1
                }
                isVisited[nx][ny] = leftK
                queue.push([[nx,ny],step+1,leftK])
            }
        }
        if(leftK>0){
            for(const [dx,dy] of knightDirections){
                const nx = dx + x
                const ny = dy + y
                if(isValid([nx,ny]) && isVisited[nx][ny] < leftK-1){
                    if(nx===H-1 && ny===W-1){
                        return step+1
                    }
                    isVisited[nx][ny] = leftK-1
                    queue.push([[nx,ny],step+1,leftK-1])
                }
            }
        }
        // console.table(isVisited)
    }
    return -1
}

console.log(solve(input))

// 00:18:38 틀렸습니다(3%) -> 초기 isVisited 갱신
// 00:26:58 시간초과(40%) -> 빠르게 탈출할 수 있도록 수정
// 00:28:15 틀렸습니다(3%) -> nx,ny로 수정
// 00:29:19 시간초과(40%) -> checkVisit boolean으로 변경
// 00:39:00 틀렸습니다 -> 롤백 -> history 전부 들고 다니도록 수정
// 00:49:25 시간초과(3%) -> 롤백 -> Queue 생성
// 00:53:00 틀렸습니다 -> 오타 수정
// 00:56:50 메모리 초과(41%) -> 뒤로가는 knight이동 제거
// 01:00:00 틀렸습니다(3%) -> kinght 조건 변경
// 01:03:00 틀렸습니다(96%) -> 1,1 예외처리
// 01:05:00 틀렸습니다(96%) -> 1,1 예외처리
// 01:05:50 맞았습니다