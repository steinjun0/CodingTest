const [[N],[M],...links] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const group = Array(N).fill(null).map((e,i)=>i);

function union(i,j){
    pi = find(i)
    pj = find(j)
    if(pi !== pj){
        group[pi] = group[pj]
    }
}

function find(i){
    if(group[i] !== i){
        group[i] = find(group[i])
    }
    return group[i]
}

// console.log(group)

for(let i=0;i<N;i++){
    for(let j=0;j<N;j++){
        if(links[i][j]===1){
            union(i,j)
        }
    }
}

const plan = links[N].map(e=>e-1)

const parent = find(plan[0])
for(let i=0;i<plan.length;i++){
    if(parent !== find(plan[i])) return console.log('NO')
}
// console.log(group)
console.log('YES')

// 00:25:40 틀렸습니다(1%) -> 모든 연결 다 돌도록 수정(대칭이 아닐 수 있음)
// 00:36:57 틀렸습니다(5%) -> union 로직 변경
// 00:43:07 틀렸습니다(5%) -> union 로직 변경
// 00:52:06 틀렸습니다(5%) -> 마지막 검사 로직 변경
// 00:57:14 틀렸습니다(5%) -> 뭔가 이상함...
// 01:04:46 틀렸습니다(5%) -> union 로직 변경
// 01:08:50 맞았습니다...