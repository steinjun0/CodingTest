const input =require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const directions = [[0,1],[1,0],[0,-1],[-1,0]]

class Deque{
    constructor(valueArr) {
        this.arr = [...valueArr]
        this.head = 0
        this.tail = valueArr.length
    }
    push(value){
        this.arr.push(value)
        this.tail++
    }
    shift(){
        if(this.head === this.tail){
            return null
        }else{
            return this.arr[this.head++]
        }
    }
}

function solve(input){
    const N = +input[0]
    const K = +input[1]
    const apples = new Set(
        input.slice(2,2+K).map(e=>(+e.split(' ')[0]-1)*N+(+e.split(' ')[1]-1))
    )
    const L = +input[2+K]
    const moveInfos = new Map(
        input
            .slice(2+K+1)
            .map(e=>[+e.split(' ')[0], e.split(' ')[1] === 'D' ? 1 : -1])
    )

    let i=0
    let directionIndex = 0
    let direction = [0,1]
    const snake = new Deque([[0,0]])
    const snakeSet = new Set([0])
    while(true){
        if(moveInfos.has(i)){
            directionIndex += moveInfos.get(i)
            directionIndex = (directionIndex + 4)%4
            direction = directions[directionIndex]
        }
        
        const [hx,hy] = snake.arr[snake.tail-1]
        const nx = hx+direction[0]
        const ny = hy+direction[1]

        if(0<=nx&&nx<N&&0<=ny&&ny<N){
            if(!snakeSet.has(nx*N+ny)){
                snake.push([nx,ny])
                snakeSet.add(nx*N+ny)
                if(!apples.has(nx*N+ny)){
                    const tail = snake.shift()
                    snakeSet.delete(tail[0]*N+tail[1])
                }else{
                    apples.delete(nx*N+ny)
                }
            }
            else{
                return i+1
            }
        }else{
            return i+1
        }
        // console.table(snake)
        // console.table(snakeSet)
        i++
    }
}

console.log(solve(input))

// 00:40:53 틀렸습니다(3%) -> 테스트용 limit 제한 해제
// 00:49:29 맞았습니다!(11MB, 232ms) -> Deque로 교체
// 00:54:46 맞았습니다!(12MB, 304ms) -> ???? -> 약간 최적화 <- 다시 돌려보니 192ms
// 00:58:45 맞았습니다!(12MB, 188ms) ->