let [[N],numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))    
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

let temp = [...numbers]

function swap(arr,a,b){
    [arr[a],arr[b]] = [arr[b],arr[a]]
}

let count = 0
function mergeSort(start,end){
    const middle = ~~((start+end)/2)

    if(start === end){
        return
    }

    if(start+1 === end){
        if(numbers[start] > numbers[end]){
            swap(numbers,start,end)
            count++
        }
        temp[start] = numbers[start]
        temp[end] = numbers[end]
        return
    }

    mergeSort(start,middle)
    mergeSort(middle+1, end)

    let left = start
    let right = middle+1
    let ti = start
    while(left <= middle || right <= end){
        // console.log(numbers)
        if((left <= middle && numbers[left] <= numbers[right]) || right > end){
            // console.log(numbers[left])
            temp[ti] = numbers[left++]
        }
        else if((right <= end && numbers[left] > numbers[right]) || left > middle){
            count+= right - ti
            // console.log(numbers[right])
            temp[ti] = numbers[right++]
        }else{
            // console.log(numbers[left],numbers[right])
            // console.log(left,right,middle,end)
            throw Error
        }
        ti++
    }
    for(let i=start;i<=end;i++){
        numbers[i] = temp[i]
    }
}
// console.log(numbers)
mergeSort(0,numbers.length-1)
// console.log(numbers)
console.log(count)

// 시간복잡도 무시하고 일단 구현
// 01:00:00 시간초과(3%) -> queue 구현
// 01:03:10 시간초과(3%) -> 병합 정렬로 완전히 다시 구현
// 01:40:50 시간초과(3%) -> 오타 수정
// 01:44:20 시간초과(3%) -> 오타 수정
// 01:47:40 로직 에러 -> 천천히 고침(완전 난장판)
// 01:56:20 메모리초과(3%) -> 스프레드 제거
// 01:59:00 맞았습니다.


// class Queue {
//     constructor(value){
//         this.arr = [value]
//         this.head = 0
//         this.tail = 1
//     }
//     push(value){
//         this.arr.push(value)
//         this.tail++
//     }
//     shift(){
//         if(this.tail ===this.head){
//             return null
//         }else{
//             const result = this.arr[this.head++]
//             return result
//         }
//     }
// }

// const numberPositions = {}
// for(let i=0;i<N;i++){
//     const num = numbers[i]
//     numberPositions[num] === undefined ? numberPositions[num] = new Queue(i) : numberPositions[num].push(i)
// }

// const sortedNumbers = [...numbers].sort()
// let count = 0
// const prefixReleaseIndex = {}
// for(let i=0;i<N;i++){
//     const num = sortedNumbers[i]
//     const index = numberPositions[num].shift()
//     let prefix = 0
//     for(const key in prefixReleaseIndex){
//         const pi = prefixReleaseIndex[key]
//         if(pi >= index){
//             prefix+=1
//         }else{

//         }
//     }
//     count += index - i + prefix
//     // index까지 모든 index 1씩 추가
//     prefixReleaseIndex[index] = true
    
// }