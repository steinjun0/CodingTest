const space = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(''))

class Queue{
    constructor(arr){
        this.arr = arr
        this.head = 0
        this.tail = arr.length
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

    get length(){
        return this.tail-this.head
    }
}

function solve(space){
    const queue = new Queue([0,'*'])
    let level = 7
    let isVisited = Array(8).fill(false)
    isVisited[0] = true
    while(queue.length > 1){
        const pos = queue.shift()
        if(level === 0){
            return 1
        }
        if(pos === '*'){
            level--
            queue.push('*')
            isVisited = Array(8).fill(false)
        }else if(level>0){
            for(direction of [-1,0,1]){
                const npos = pos+direction
                if(0<=npos&&npos<=7 &&
                    (
                        (space[level][npos]==='.' && space[level-1][npos]==='.') ||
                        (space[level][npos]==='#' && space[level-1][npos]==='.' && (level-2 < 0 || space[level-2][npos]==='.') )
                    )
                ){
                queue.push(npos)
                }
            }
        }
    }
    return 0
}
console.log(solve(space))


// 00:39:57 맞았습니다!(120ms) -> isVisited 로직 살림
// 00:42:29 틀렸습니다. -> 롤백, Queue 생성
// 00:47:19 맞았습니다(124ms) -> queue initial 로직 변경
// 00:48:44 