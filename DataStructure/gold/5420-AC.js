const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt')) 
    .toString()
    .trim()
    .split('\n')

class Queue{
    constructor(value){
        this.arr = value ? [...value] : []
        this.head = 0
        this.tail = value ? value.length : 0
        this.isReversed = false
    }

    shift(){
        if(this.head === this.tail) return undefined
        return this.arr[this.head++]
    }

    pop(){
        if(this.head === this.tail) return undefined
        this.tail--
        return this.arr.pop()
    }

    reverse(){
        this.isReversed = true
    }

    get(){
        if(this.isReversed){
            return this.arr.slice(this.head,this.tail).reverse()
        }else{
            return this.arr.slice(this.head,this.tail)
        }
    }
}

const totalCount = +input[0]
let count = 0
const result = []
outer: while(totalCount-count > 0){
    const cmds = input[1+(count*3)]
    const arrStr = input[1+(count*3)+2]
    const queue = new Queue(JSON.parse(arrStr))
    
    let isFront = true
    for(const cmd of cmds){
        if(cmd === 'R'){
            isFront = !isFront
        }else if(cmd === 'D'){
            if(isFront) {
                if(queue.shift() === undefined){
                    result.push('error')
                    count++
                    continue outer
                }
            }
            else{
                if(queue.pop() === undefined){
                    result.push('error')
                    count++
                    continue outer
                }
            }
        }
    }
    if(!isFront){
        queue.reverse()
    }
    result.push(JSON.stringify(queue.get()))
    count++
}
console.log(result.join('\n'))

// 00:19:46(최적화 없음) 맞았습니다!(27MB,3924ms) -> queue 생성
// 00:28:53 틀렸습니다 -> queue 버그 수정
// 00:32:54 틀렸습니다(16%) -> reverse 버그 수정
// 00:38:35 맞았습니다(35MB, 288ms) -> stringify,parse 수정
// 00:44:47 맞았습니다(49MB, 400ms) - > 롤백 -> reverse() 교체
// 00:49:30 맞았습니다(37MB, 300ms) -> 롤백 -> slice 제거
// 00:53:25 맞았습니다(35MB, 264ms) -> 조건식 합침
// 00:55:49 맞았습니다(35MB, 268ms) -> rcount 제거
// 00:57:16 맞았습니다(35MB, 260ms) 끝