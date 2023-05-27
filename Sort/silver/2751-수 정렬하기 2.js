let [N,...numbers] = require('fs').readFileSync(process.platform === 'linux' ?'/dev/stdin' :require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(Number)

function merge([al,ar],[bl,br]){
    let aPointer = al
    let bPointer = bl
    while(aPointer <= ar || bPointer <= br){
        if(((aPointer <= ar) && numbers[aPointer] <= numbers[bPointer]) || bPointer > br){
            temp[aPointer+bPointer-bl]=numbers[aPointer]
            aPointer++
        }else if(((bPointer <= br) && numbers[aPointer] > numbers[bPointer])  || aPointer > ar){
            temp[aPointer+bPointer-bl] = numbers[bPointer]
            bPointer++
        }
    }
    return [al,br]
}

let queue = []

for(let i=0;i<N;i++){
    queue.push([i,i])
}

let temp = []
while(queue.length > 1){
    let nextQueue=[]
    for(let i=0;i<numbers.length;i++){
        temp[i] = numbers[i]
    }
    // temp = [...numbers]
    while(queue.length > 1){
        let aSet = queue.pop()
        let bSet = queue.pop()
        if(aSet[0] < bSet[0]){
            nextQueue.push(merge(aSet,bSet))
        }else{
            nextQueue.push(merge(bSet,aSet))
        }
    }
    for(let i=0;i<numbers.length;i++){
        numbers[i] = temp[i]
    }
    // numbers = temp
    if(queue.length>0) nextQueue.push(queue.pop())
    queue = nextQueue
}

// console.log(numbers)
console.log(numbers.join('\n'))

// 시간초과 -> 업데이트 방식 변경
// 시간초과 -> temp 배열로 한꺼번에 업데이트
// 메모리 초과 -> temp 초기화 시점 변경
// 메모리 초과 -> 틀렸습니다(애초에 틀림) ->  갱신방법 변경
// 틀렸습니다 -> 홀수개 집합일때 예외 처리
// 맞았습니다.
