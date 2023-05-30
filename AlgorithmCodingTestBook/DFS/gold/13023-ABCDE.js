const [[N,M],...linksInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const neighbors = Array.from(Array(N), ()=>[])
for(const [a,b] of linksInput){
    
    neighbors[a].push(b)
    neighbors[b].push(a)
}

const isVisited = Array(N).fill(false)

function dfs(start, count){
    for(const i of neighbors[start]){
        if(!isVisited[i]) {
            if(count === 4){
                console.log(1)
                process.exit()
            }
            isVisited[i] = true
            dfs(i,count+1)
            isVisited[i] = false
        }
    }
}

for(let i=0;i<N;i++){
    isVisited[i] = true
    dfs(i,1)
    isVisited[i] = false
}
console.log(0)

// 00:09:16 틀렸습니다(9%) -> isVisited 조건 변경(모든 경로 못봤음, 탐색만 함)
// 00:23:47 시간초과(7%) -> neighbors 추가
// 00:29:20 런타임에러(96%) -> neighbors 기본 배열 초기화
// 00:31:00 맞았습니다(780ms) -> 좀 더 일찍 종료하도록 수정
// 00:36:33 맞았습니다(784ms) -> 반환값 제거
// 00:38:00 맞았습니다(780ms) -> 포기 -> 링크 제거(다른 코드 읽음)
// 00:43:59 맞았습니다(304ms) 