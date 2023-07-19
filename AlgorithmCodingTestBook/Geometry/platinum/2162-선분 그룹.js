const [[N],...lines] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const groups = Array(N).fill(0).map((e,i)=>i)

function union(a,b){
    const pa = find(a)
    const pb = find(b)

    groups[pb] = pa
}

function find(a){
    if(a !== groups[a]){
        groups[a] = find(groups[a])
    }
    return groups[a]

}

function ccw([a,b],[c,d],[e,f]){
    const v1 = [c-a,d-b]
    const v2 = [e-a,f-b]
    return v1[0]*v2[1] - v1[1]*v2[0]
}

function isCross(a,b){
    const lineA = lines[a]
    const lineB = lines[b]

    const p1 = [lineA[0],lineA[1]]
    const p2 = [lineA[2],lineA[3]]
    const p3 = [lineB[0],lineB[1]]
    const p4 = [lineB[2],lineB[3]]
    if(ccw(p1,p2,p3)*ccw(p1,p2,p4) === 0 && ccw(p3,p4,p1)*ccw(p3,p4,p2) === 0){ // p1, p2, p3, p4는 한 직선 상에 존재
        if(
            Math.min(p1[0],p2[0]) <= Math.max(p3[0],p4[0]) && Math.min(p3[0],p4[0]) <= Math.max(p1[0],p2[0]) &&
            Math.min(p1[1],p2[1]) <= Math.max(p3[1],p4[1]) && Math.min(p3[1],p4[1]) <= Math.max(p1[1],p2[1])
        ){
            return true
        }else{
            return false
        }
    }else{
        if(ccw(p1,p2,p3) * ccw(p1,p2,p4) <= 0 && ccw(p3,p4,p1)*ccw(p3,p4,p2) <= 0){
            return true
        }else{
            return false
        }
    }
    
}

for(let i=0;i<N;i++){
    for(let j=i+1;j<N;j++){
        if(isCross(i,j)){
            union(i,j)
        }
    }
}
for(let i=0;i<N;i++){
    find(i)
}
const counts = {}
for(let i=0;i<N;i++){
    counts[groups[i]] = counts[groups[i]] ? counts[groups[i]]+1 : 1
}
console.log(Array.from(new Set(groups)).length)
console.log(Math.max(...Object.values(counts)))

// 01:20:00 틀렸습니다(2%) -> isCross 수정
// 01:27:03 틀렸습니다(6%) -> isCross 수정(y까지 고려)
// 01:29:27 틀렸습니다(10%) -> union find 수정(질문 게시판 반례)
// 01:35:08 맞았습니다!