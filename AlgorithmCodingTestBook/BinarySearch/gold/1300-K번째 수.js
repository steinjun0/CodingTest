const [N,K] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(Number)

function getCount(value){
    let count = 0
    for(let i=1;i<=N;i++){
        const temp = Math.min(Math.floor(value/i),N)
        if(temp < i) break
        count += (temp-i+1)*2
        if(temp>=i) count-=1
        // console.log(i,temp)
    }

    return count
}

function isValid(value){
    for(let i=1;i<=N;i++){
        const temp = value/i
        if(temp <=N && Math.floor(temp) === temp){
            return true
        }
    }
    return false
}

// console.log(getCount(5))

let left = 1
let right = N*N
let mid = Math.floor((left+right)/2)

while(left<=right){
    if(getCount(mid) > K){
        right = mid -1
    }else if(getCount(mid) < K){
        left = mid+1
    }else{
        left = mid
        break
    }
    mid = Math.floor((left+right)/2)
    // console.log(left, mid, right)
}
// console.log(left, mid, right)
// console.log(getCount(left))
// console.log(getCount(mid))
while(true){
    if(!isValid(left)){
        left-=1
    }else{
        break
    }
}
console.log(left)

// 01:08:54 맞았습니다!(208ms)