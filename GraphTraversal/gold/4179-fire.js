const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin':require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const directions =[[0,1],[0,-1],[1,0],[-1,0]]

class Queue{
    constructor(){
        this.queue = []
        this.head = 0
        this.tail = 0
    }
    enqueue(value){
        this.queue.push(value)
        this.tail++
    }
    dequeue(){
        if(this.head===this.tail){
            return null
        }else{
            return this.queue[this.head++]
        }
    }
    isEmpty(){
        return this.head === this.tail
    }

}

function solve(input){
    let JPos = null
    let fires = []
    const [N,M] = input[0].split(' ').map(Number)
    for(let i=1;i<=N;i++){
        input[i-1] = input[i].split('')

        for(let j=0;j<M;j++){
            if(input[i-1][j] === 'J'){
                // 시작부터 가장자리 케이스
                if(i-1 === 0 || j === 0 || i-1 === N-1 || j === M-1){
                    return 1
                }
                JPos = [i-1,j]
                input[i-1][j] = '.'
            }
            if(input[i-1][j] === 'F'){
                input[i-1][j] = 0
                fires.push([i-1,j])
            }
        }

    }
    input.length = input.length-1

    // 불 확산
    const fireQueue = new Queue()
    fireQueue.queue = [...fires,'*']
    fireQueue.tail = fires.length
    let step = 0
    while(!fireQueue.isEmpty()){
        const fire = fireQueue.dequeue()
        if(fire === '*'){
            step++
            fireQueue.enqueue('*')
            continue
        }
        for(const direction of directions){
            const nx = fire[0]+direction[0]
            const ny = fire[1]+direction[1]
            if(0<=nx&&nx<N&&0<=ny&&ny<M){
                if(input[nx][ny] === '.'){
                    input[nx][ny] = step+1
                    fireQueue.enqueue([nx,ny])
                }
            }
        }
    }

    // console.table(input)
    // J escape
    const queue = new Queue()
    queue.queue = [JPos, '*']
    queue.tail = 2
    step = 0
    const isVisited = Array.from(Array(N),()=>Array(M).fill(false))
    isVisited[JPos[0]][JPos[1]] = true
    while(true){
        const pos = queue.dequeue()
        if(pos === '*'){
            if(queue.isEmpty()){
                break
            }
            step++
            queue.enqueue('*')
            continue
        }

        // if(pos[0]===0 || pos[1] === 0 || pos[0] === N-1 || pos[1] === M-1){
        //     return step+1
        // }


        for(const direction of directions){
            const nx = pos[0]+direction[0]
            const ny = pos[1]+direction[1]
            if(0<=nx&&nx<N&&0<=ny&&ny<M){
                if(!isVisited[nx][ny] && input[nx][ny] !== '#' && (input[nx][ny]>(step+1) || input[nx][ny]==='.')){
                    if(nx===0 || ny === 0 || nx === N-1 || ny === M-1){
                        return step+2
                    }
                    isVisited[nx][ny] = true
                    queue.enqueue([nx,ny])
                }
            }
        }
        // console.log(step)
        // console.table(isVisited)
    }
    return 'IMPOSSIBLE'
}

console.log(solve(input))
// 00:50:42 틀렸습니다(6%) -> step 조건식 수정
// 00:55:50 틀렸습니다(6%) -> 조금 더 안전하게 수정(탈출 조건식 위치 이동)
// 00:57:30 틀렸습니다(6%) -> 가장자리 index가 0일때도 추가
// 01:04:50 틀렸습니다(61%) -> 가장자리 시작 예외 구문 제거
// 01:16:50 틀렸습니다(61%) -> 불이 없을 경우 처리(시작 가장자리 케이스 롤백)
// 01:20:00 맞았습니다! (164MB, 704ms) -> 탈출 조건식 롤백
// 01:22:00 맞았습니다! (162MB, 712ms) -> 탈출 조건식 롤백