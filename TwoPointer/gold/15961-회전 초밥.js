const [infoStr, ...sushies] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N,d,k,cNumber] = infoStr.split(' ').map(Number)
const c = String(cNumber)

const currentSushies = Array(d+1).fill(0)
let maxKind = 1
let kind = 0
let left = 0
for(let i=0;i<k;i++){
    const sushi = sushies[i]
    currentSushies[+sushi]++
    if(currentSushies[+sushi] === 1){
        kind++
    }
    maxKind = Math.max(maxKind,kind + (currentSushies[+c] === 0 ? 1 : 0))
}

for(let right=k;right<N+k;right++){
    const sushi = sushies[right%N]
    const shifted = sushies[left]
    currentSushies[+shifted]--
    if(currentSushies[+shifted] === 0){
        kind--
    }
    left++

    currentSushies[+sushi]++
    if(currentSushies[+sushi] === 1){
        kind++
    }

    maxKind = Math.max(maxKind,kind + (currentSushies[+c] === 0 ? 1 : 0))
    // console.log(currentSushies.map((e,i)=>e!==0 ? i : 0).filter(e=>e!==0),left,right,kind + (currentSushies[+c] === 0?1:0))
}
console.log(maxKind)

// 00:40:16 시간 초과 -> twopointer스럽게 변경
// 00:57:37 시간 초과 -> 로직 추가 및 getKind 제거
// 01:02:11 틀렸습니다 -> 가져다 주는 로직 추가
// 01:05:58 틀렸습니다 -> 가져다 주는 로직 조건 변경
// 01:13:24 틀렸습니다 -> 원순열! -> 원순열 아님... -> 쿠폰은 완전 별개로 고려
// 01:37:50 틀렸습니다(90%) -> 형변환 추가(안될듯)
// 01:44:50 틀렸습니다 -> maxKind 초기값 1로 변경
// 01:51:38 틀렸습니다(90%) -> 초기값 부분 로직 분리
// 02:00:05 틀렸습니다(90%) -> 다시 원순열
// 02:04:30 맞았습니다.


// console.log(left,right)
// if(right-left >= k){
//     if(currentSushies[+c] === 0 || (currentSushies[+c] >0 && right-left >= k+1)){

//         shifted = sushies[left]
//         currentSushies[shifted]--
//         if(currentSushies[shifted] === 0){
//             kind--
//         }
//         left++
//         if(shifted === c && currentSushies[+c] === 0){
//             shifted = sushies[left]
//             currentSushies[shifted]--
//             if(currentSushies[shifted] === 0){
//                 kind--
//             }
//             left++
//         }
//     }
// }