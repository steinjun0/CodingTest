const [[N,K],numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))


const prefix = Array(N+1).fill(0)
for(let i=0;i<N;i++){
    prefix[i+1] = numbers[i] + prefix[i]
}

const counter = {}
let result = 0

for(let i=0;i<N+1;i++){
    result += (counter[(prefix[i])-K]??0)
    counter[prefix[i]] = counter[prefix[i]] !== undefined ? counter[prefix[i]]+1 : 1
}

console.log(result)
// 00:50:00 틀렸습니다 -> 로직 수정
// 01:04:19 틀렸습니다(4%) -> dp 스럽게 변경
// 01:10:11 맞았습니다! -> counter object에서 array로 변경
// 01:13:18 맞았습니다!(속도차이 없음) -> ??? 잘못된 코드
// 

// const countedSet = new Set()
// for(const i of Object.keys(counter)){
//     if(!countedSet.has(i)){
//         if(K===0){
//             result += C(counter[i],2)
//         }else{
//             result += (counter[i]) * (counter[(+i)-K]??0)
//         }
//         countedSet.add(i)
//         countedSet.add((+i)-K)
//     }
// }


// function C(n,r){
//     let bN = BigInt(n) 
//     let bR = BigInt(r)
//     let dividen = 1n
//     let divider = 1n
//     for(let i=0n;i<r;i++){
//         dividen*=(bN-i)
//     }
//     for(let i=1n;i<=bR;i++){
//         divider*=i
//     }
//     return Number(dividen/divider)
// }