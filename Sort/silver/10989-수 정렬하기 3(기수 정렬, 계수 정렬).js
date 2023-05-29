const [N,...numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(Number)

class Queue {
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
        if(this.head === this.tail){
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

function getRadix(num,i){
    return Math.floor(((num%(10**i))/10**(i-1)))
}

function radixSort(numbers){
    let r=1
    let queue1 = Array.from(Array(10), ()=>new Queue())
    for(const num of numbers){
        queue1[getRadix(num,r)].push(num)
    }
    numbers.length = 0
    while(true){

        let queue2 = Array.from(Array(10), ()=>new Queue())
        for(let i=0;i<10;i++){
            while(queue1[i].length > 0){
                const num = queue1[i].shift()
                queue2[getRadix(num,r+1)].push(num)
            }
        }

        queue1 = queue2
        let count = 0
        for(let i=0;i<10;i++){
            if(queue1[i].length === 0) count++
        }
        if(count === 9) break
        // console.table(queue1)
        r++
    }
    console.log(queue1[0].arr.join('\n'))
}

function countingSort(numbers){
    const counter = Array(10001).fill(0)
    for(const num of numbers){
        counter[num]++
    }
    for(let i=0;i<10001;i++){
        for(let j=0;j<counter[i];j++){
            console.log(i)
        }
    }
}

function builtInSort(numbers){
    numbers.sort((a,b)=>a-b)
    console.log(numbers.join('\n'))
}

builtInSort(numbers)
// countingSort(numbers)
// radixSort(numbers)

// 00:25:09 메모리초과(3%) -> numbers 제거, queue2 Queue로 변경
// 00:27:23 메모리초과(3%) -> array 고차함수 제거
// 00:29:58 메모리초과(3%) -> 아마도 nodejs로 못푸는 것으로 보임 -> 계수정렬 알고리즘 읽고 구현
// 00:50:09 전부 메모리 초과