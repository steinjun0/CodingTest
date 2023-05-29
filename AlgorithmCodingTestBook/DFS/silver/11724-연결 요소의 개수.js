const [[N,M],...linksInput] = require('fs').readFileSync(process.platform==='linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

if(M===0){
    return console.log(N)
}

const links = Array.from(Array(N+1),()=>[])
const visited = new Set(Array(N).fill(0).map((e,i)=>i+1))
for(const [a,b] of linksInput){
    links[a].push(b)
    links[b].push(a)
}

let count = 0
const queue = []
for(let start=1;start<N+1;start++){
    // const start =visited.values().next().value // <-이게 느린가
    // const start =Array.from(visited)[0] // <-이게 느린가
    if(!visited.has(start)) continue
    visited.delete(start)
    queue.push(start)

    while(queue.length > 0){
        const node = queue.pop()
        for(const nextNode of links[node]){
            if(visited.has(nextNode)){
                visited.delete(nextNode)
                queue.push(nextNode)
            }
        }
    }
    count++
}
console.log(count)

// 00:18:32 틀렸습니다(42%) -> N,M 1일때 예외처리
// 00:21:21 틀렸습니다(42%) -> 코드 정리
// 00:27:11 틀렸습니다(42%) -> delete 시점 변경
// 00:32:25 틀렸습니다(42%) -> set 초기화 방법 변경
// 00:34:19 맞았습니다!(1000ms) -> queue 재선언 제거
// 00:36:19 맞았습니다!(992ms) -> iterator -> Array.from으로 변경
// 00:38:50 맞았습니다!(972ms) -> 포기
// 00:48:08 
// 00:51:36 -> isVisited Array로 구현해봄(다른 코드 읽음) ->(1028ms) ??? -> 롤백
// 00:55:35 -> while문 for문으로 변경 -> 960ms -> ...? -> 
// 결론
// stack에 담아서 구현하는 것 보다, dfs 재귀함수로 구현하는게 더빠르다.
// stack은 넣었다 빼는 시간이 필요하지만, 재귀는 지나가면서 체크만 하는 것이기 때문!