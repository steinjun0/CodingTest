const [Ain,Bin] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(e=>Array.from(e))

function getLCS(A,B){
    let result = []
    for(let start=0;start<A.length;start++){
        const temp = []
        let last = 0
        // console.log('start',start)
        for(let i=start;i<A.length;i++){
            for(let j=last;j<B.length;j++){
                if(A[i] === B[j]){
                    temp.push(A[i])
                    last = j+1
                    // console.log(A[i],i,B[j],j)
                    i++
                }
            }
        }
        if(temp.length > result.length) result = temp
    }
    
    return result
}

if(Ain === undefined || Bin === undefined){
    return console.log(0)
}

const [A,B] = Ain.length < Bin.length ? [Ain,Bin] : [Bin,Ain]

let result = getLCS(A,B)
if(A.length === B.length){
    const tempResult = getLCS(B,A)
    if(tempResult.length > result.length) result = tempResult
}
console.log(result.length)
if(result.length > 0) console.log(result.join(''))


// 00:43:48 틀렸습니다 -> last 로직 추가
// 00:47:04 틀렸습니다 -> 길이 같을 때 예외처리
// 00:59:07 틀렸습니다 -> 3중 포문으로 변경
// 01:07:45 틀렸습니다 -> 버그 수정
// 01:08:54 틀렸습니다 -> 길이 출력 빠져있었음
// 01:17:22 틀렸습니다 -> last=>last+1로 변경
// 01:20:22 틀렸습니다
// 01:26:33 포기
 



// const positions = {}

// for(let i=0;i<A.length;i++){
//     const char = A[i]
//     if(positions[char] === undefined){
//         positions[char]=[i]
//     }else{
//         positions[char].push(i)
//     }
// }

// console.table(positions)

// for(let start=0;start<B.length;start++){
//     const tempPoistions = JSON.parse(JSON.stringify(positions))
//     const result = []
//     for(let i=start;i<B.length;i++){
//         const char = B[i]
//         if(Array.isArray(tempPoistions[char]) && tempPoistions[char].length >0){
//             // if(result.length !== 0 && result[result.length-1] > tempPoistions[char][0]) continue
//             result.push(tempPoistions[char].shift())
//         }
//     }
//     console.log(result)
//     console.log(getMaxSequence(result))
// }

// function getMaxSequence(arr){
//     const dp = Array.from(arr,()=>[])
//     dp[0] = [arr[0],arr[0]]
//     for(let i=1;i<arr.length;i++){
        
//     }
// }