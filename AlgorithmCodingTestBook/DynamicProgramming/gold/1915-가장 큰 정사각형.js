const [NM,...numbersInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N,M] = NM.split(' ').map(Number)
const numbers = numbersInput.map(row=>row.split('').map(Number))
// const [N,M] = [1000,1000]
// const numbers = Array.from({length:N}, ()=>Array(M).fill(1))


function isSquare(i,j,size){
    if(numbers[i+1][j+1] < size-1) return false
    if(numbers[i+size-1][j] === 0) return false
    if(numbers[i][j+size-1] === 0) return false
    return true
}

let max = 0
// let count = 0
for(let i=N-2;i>=0;i--){
    for(let j=M-2;j>=0;j--){
        // count++
        const size = numbers[i][j]
        if(i+size < N && j+size < M) {
            if(isSquare(i,j,size+1)){
                numbers[i][j]+=1
                if(max < numbers[i][j]) max = numbers[i][j]
                j++
            }
        }
        // console.table(numbers)
    }
}
// console.log(count)
console.log(max**2)

// 00:39:05 메모리 초과(3%) -> Queue class 제거, 내장 shift 사용
// 00:42:04 시간 초과(3%) -> queue1, queue2로 분리
// 00:44:20 메모리 초과 -> 재귀 형태 제거, dp스럽게 변경
// 00:47:46 메모리 초과(3%) -> queue 제거, 예외처리 없이 일단 구현
// 00:57:43 시간 초과(3%) -> queue로 다시 담음, 단 좌표를 숫자로 담음(배열 말고)
// 01:04:01 틀렸습니다(3%) -> isSquare 조건식 수정
// 01:14:19 시간 초과(3%) -> isSquare 필요없는 반복문 제거
// 01:16:40 시간 초과(3%) -> 대각선 이동
// 01:38:50 시간 초과(3%) -> for문으로 변경(queu제거)
// 01:52:00 틀렸습니다 -> 넓이로 변경
// 01:56:08 시간초과(28%) -> max 갱신문 조건식으로 변경
// 01:57:26 시간초과(28%) -> 대각선 하단 size로 바로 진입
// 02:05:00 틀렸습니다(3%) -> 큰 사이즈에서 작은 사이즈로 내려오는 로직으로 변경
// 02:08:48 틀렸습니다(3%) -> 롤백후 다시 구현(큰 사이즈에서 작은 사이즈로 내려오는 로직으로 변경)
// 02:18:15 틀렸습니다(3%) -> 경계부분 버그 수정
// 02:20:35 틀렸습니다(3%) -> isSqaure 버그 수정
// 02:21:38 틀렸습니다(3%) ->

class Queue{
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
        if(this.head === this.tail) return null
        else return this.arr[this.head++]
    }
    
    get length(){
        return this.tail-this.head
    }
}

// for(let i=0;i<N;i++){
//     for(let j=0;j<M;j++){
//         if(numbers[i][j] === 1){
//             if(i+1 < N && j+1 < M) {
//                 queue.push(i*M + j)
//                 max = 1
//             }
//         }
//     }
// }


// while(queue.length > 0){
//     count++
//     const num = queue.pop()
//     const [i,j] = [Math.floor(num/M), num%M]
//     const size = numbers[i][j]
//     // console.log(i,j,isSquare(i,j,size+1))
//     if(isSquare(i,j,size+1)){
//         numbers[i][j] = size+1
//         if(i-1 >=0 && j-1 >=0){
//             queue.push((i-1)*M + j-1)
//         }
        // if(i+size+1 < N && j+size+1 < M) {
        //     queue.push(i*M+j)
        // }
        
        
//         max = Math.max(max,size+1)
//     }
//     console.table(numbers)
// }