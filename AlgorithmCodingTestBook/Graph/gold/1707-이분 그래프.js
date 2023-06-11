const [Kstr,...testcases] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

function dfs(node,edges,isVisited){
    for(const nextNode of edges[node]){
        if(isVisited[nextNode] === null){
            isVisited[nextNode] = isVisited[node] * -1
            if(!dfs(nextNode,edges,isVisited)){
                return false
            }
        }else if(isVisited[nextNode] === isVisited[node]){
            return false
        }
    }
    return true
}

const K = +Kstr
let startIndex = 0
outer: for(let caseCount=0;caseCount<K;caseCount++){
    const [V,E] = testcases[startIndex].split(' ').map(Number)
    startIndex+=E+1
    const edges = Array.from({length:V+1},()=>[])
    for(let i=startIndex-E;i<startIndex;i++){
        const [u,v] = testcases[i].split(' ').map(Number)
        edges[u].push(v)
        edges[v].push(u)
    }
    
    // console.log(V,E)
    // console.table(edges)

    const isVisited = Array(V+1).fill(null)
    for(let i=1;i<=V;i++){
        if(isVisited[i] === null){
            isVisited[i] = 1
            const result = dfs(i,edges,isVisited)
            if(!result){
                console.log('NO')
                continue outer
            }
        }
    }
    console.log('YES')

    // const result = bfs(edges,isVisited)
    
    // console.table(isVisited)
}

// 00:27:10 틀렸습니다(43%)
// 00:42:57 bfs로 교체
// 00:51:50 틀렸습니다(43%) -> 완전 연결 아닌걸 질문게시판 보고 확인
// 00:55:57 틀렸습니다(43%) -> 실수 수정
// 01:00:00 맞았습니다

// function check(node,edges,isVisited){
//     for(const nextNode of edges[node]){
//         if(isVisited[nextNode] === isVisited[node]) return false
//     }
//     return true
// }

// function bfs(edges,isVisited){
//     const queue = [1]
//     while(queue.length >0){
//         const node = queue.shift()
//         for(const nextNode of edges[node]){
//             if(isVisited[nextNode] === null){
//                 isVisited[nextNode] = isVisited[node] * -1
//                 if(!check(nextNode,edges,isVisited)) return false
//                 queue.push(nextNode)
//             }
//         }
//     }
//     return true
// }