const [[x1,y1,x2,y2],[x3,y3,x4,y4]] = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const L1sx = Math.min(x1,x2)
const L1lx = Math.max(x1,x2)
const L2sx = Math.min(x3,x4)
const L2lx = Math.max(x3,x4)

const L1sy = Math.min(y1,y2)
const L1ly = Math.max(y1,y2)
const L2sy = Math.min(y3,y4)
const L2ly = Math.max(y3,y4)

if(
    L2lx < L1sx || L1lx < L2sx || L2ly < L1sy || L1ly < L2sy
){
    return console.log(0)
}

function L1y(x){
    return ((y2-y1)/(x2-x1))*(x-x1) + y1
}
function L2y(x){
    return ((y4-y3)/(x4-x3))*(x-x3) + y3
}

if(x1 === x2 && x3 === x4){
    return console.log(1)
}

if(x1 === x2){
    if(L1sy <= L2y(x1) && L2y(x1) <= L1ly){
        return console.log(1)
    }else{
        return console.log(0)
    }
}

if(x3 === x4){
    if(L2sy <= L1y(x3) && L1y(x3) <= L2ly){
        return console.log(1)
    }else{
        return console.log(0)
    }
}

const [_,start,end,__] = [x1,x2,x3,x4].sort((a,b)=>a-b)

const result =  (L1y(start) - L2y(start)) * (L1y(end) - L2y(end)) > 0 ? 0 : 1
console.log(result)

// 00:21:48 틀렸습니다(29%) -> 양쪽 구간 좌표 변경
// 00:35:24 틀렸습니다(54%) -> 나누기 제거
// 00:55:38 틀렸습니다(50%) -> 직선 함수에 문제가 있는게 맞음 -> 수직 선분 예외처리
// 01:13:27 틀렸습니다(22%) -> 둘다 수직일때 예외처리
// 01:16:28 틀렸습니다(54%) -> 포기