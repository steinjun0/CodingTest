const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

// const input = [
// '1000 1000',
//  ...Array(1000).fill(Array(1000).fill(0).join(' ')),
//  '1 1 1 1 1000 1000'
// ]

class Deque{
    head=0
    tail=0
    // queue = new Map()
    queue = []
    push(value){
        // this.queue.set(this.tail, value)

        // this.tail+=1
        // this.queue.push(value)
        this.queue[this.tail++] =value
    }
    shift(){
        if(this.head<this.tail){
            // this.head+=1
            // this.queue.delete(this.head-1)
            // return this.queue.get(this.head)

            return this.queue[this.head++]
            delete this.queue[this.head]
            this.head++
            return res
        }
        else{
            return null
        }
    }
    get length(){
        return this.tail-this.head
    }

}

const directions = [[0,1],[0,-1],[1,0],[-1,0]]
function solve(input){
    const [N, M]=input[0].split(' ').map(Number)
    const space = input.slice(1,N+1).map(e=>e.split(' ').map(Number))
    let [H, W, Sr, Sc, Fr, Fc ] = input[N+1].split(' ').map(Number)
    Sr-=1;Sc-=1;Fr-=1;Fc-=1;

    // const queue = [[Sr, Sc],'*']
    const queue = new Deque()
    queue.push([Sr,Sc])
    queue.push('*')
    let step = 0
    const isVisited = Array.from(Array(N),()=>Array(M).fill(false))
    isVisited[Sr][Sc] = true
    while(queue.length>1){
        const pos = queue.shift()
        if(pos === '*'){
            step++
            queue.push('*')
        }
        else{
            const [x,y] = pos
            
            if(x === Fr && y === Fc){
                return step
            }
            move: for(const direction of directions){
                const nx = direction[0]+x
                const ny = direction[1]+y
                
                const nex = nx + H - 1
                const ney = ny + W - 1
                if(0<=nx&&nx<N&&0<=ny&&ny<M && 0<=nex&&nex<N&&0<=ney&&ney<M&&!isVisited[nx][ny]){
                    for(let i=nx;i<=nex;i++){
                        if(space[i][ny]===1) continue move
                        if(space[i][ney]===1) continue move
                    }
                    for(let j=ny;j<=ney;j++){
                        if(space[nx][j]===1) continue move
                        if(space[nex][j]===1) continue move
                    }
                    isVisited[nx][ny] = true
                    queue.push([nx,ny])
                }
            }
        }
    }
    return -1
}

console.log(solve(input))

// 00:30:50 시간초과(0%) -> isVisited 타이밍 변경
// 00:42:20 맞았습니다! (66MB, 6.8s) -> shift => deque 구현(필요한 만큼만)
// 00:54:20 맞았습니다! (138MB, 940ms) -> deque 내부 Map으로 변경
// 01:02:30 맞았습니다! (168MB, 1528ms) -> deque에 delete 추가
// 01:02:30 맞았습니다! (168MB, 1544ms) -> delete는 틀린문법, delete 메소드로 추가
// 01:08:08 맞았습니다! (109MB, 1124ms) -> Map=>array로 변경, delete 추가
// 01:13:50 맞았습니다! (66MB, 1364ms) -> delete 없는 상태로 재채점
// 01:14:00 맞았습니다! (137MB, 928ms) -> push 대신 tail 할당으로 변경
// 01:16:10 맞았습니다! (137MB, 936ms)