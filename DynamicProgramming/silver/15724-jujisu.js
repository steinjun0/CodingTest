const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N, M] = input[0].split(' ').map(Number)
const space = input.slice(1,N+1).map(row=>row.split(' ').map(Number))
const requests = input.slice(N+2).map(row=>row.split(' ').map(i=>+i-1))
const prefixSpace = Array.from(Array(N+1),()=>Array(M+1).fill(0))

for(let i =0;i<N;i++){
    for(let j=0;j<M;j++){
        prefixSpace[i+1][j+1] = space[i][j]+prefixSpace[i+1][j]
    }
}

for(let i =0;i<N;i++){
    for(let j=0;j<M;j++){
        prefixSpace[i+1][j+1] += prefixSpace[i][j+1]
    }
}

const results = []
for(const request of requests){
    const [sx,sy,ex,ey] = request

    // let starts = 0
    // let ends = 0
    // for(let i=sx;i<=ex;i++){
    //     starts += prefixSpace[i][sy]
    //     ends += prefixSpace[i][ey+1]
    // }
    // results.push(ends-starts)
    // console.log(prefixSpace[ex+1][ey+1],prefixSpace[sx][ey+1],prefixSpace[ex+1][sy],prefixSpace[sx][sy])
    results.push(prefixSpace[ex+1][ey+1]-prefixSpace[sx][ey+1]-prefixSpace[ex+1][sy]+prefixSpace[sx][sy])
}

console.log(results.join('\n'))

// 00:16:07 맞았습니다! (92MB,3772ms) -> space에 넣지않고 바로 input으로 prefixSpace 갱신
// 00:19:30 맞았습니다! (92MB,4512ms) -> 위 작업 롤백, prefixSpace 1칸 더 늘림(undefined 판별식 제거)
// 00:22:25 맞았습니다! (92MB,2048ms) -> request내 slice 작업 제거
// 00:25:09 맞았습니다! (92MB,2048ms) -> 2차원 누적합으로 변경
// 00:49:19 맞았습니다! (93MB,544ms)