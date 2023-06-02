const [[N,M],numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

function getCount(value){
    let current = 0
    let count = 1

    for(const num of numbers){
        if(num > value){
            return M+1
        }
        current += num
        if(current > value){
            count += 1
            current = num
        }
    }
    return count
}
let left = 0
let right = numbers.reduce((e,sum)=>e+sum)+1
let mid = Math.floor((left+right)/2)
while(left<=right){
    mid = Math.floor((left+right)/2)
    if(getCount(mid) > M){
        left = mid+1
    }
    else if(getCount(mid) <= M){
        right = mid-1
    }
    // console.log(left,mid,right)
}
console.log(left)
// if(getCount(mid) > M){
//     console.log(mid+1)
// }else{
//     console.log(mid)
// }

// 00:27:30 틀렸습니다(3%) -> 완전 다르게 품
// 00:39:29 틀렸습니다(3%) -> 시간 복잡도를 좀 더 크게 가져감
// 00:59:11 틀렸습니다(50%) -> 탈출 조건 변경
// 01:04:01 틀렸습니다(50%) -> getCount 로직 틀린 부분 수정
// 01:09:59 틀렸습니다(50%) -> 좀 더 손해보는 로직
// 01:20:00 틀렸습니다(81%) -> 로직 수정
// 01:22:45 맞았습니다!