const [num,...arr] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const [N,M] = num.split(' ').map(Number)

const closeList = Array.from({length:N+1},()=>[])
for(let i=0;i<M;i++){
    const [a,b] = arr[i].split(' ');
    closeList[+b].push(+a)
}

function dfs(start) {
    const stack = [start];
    const visited = new Array(N + 1).fill(0);
    visited[start] = 1;
    let count = 0;
    while (stack.length) {
        const node = stack.pop();
        for (let v of closeList[node]) {
            if (visited[v]) continue;
            visited[v] = 1;
            stack.push(v);
            count++;
        }
    }
    return count;
}

let result = []
let max = -1
for(let i=1;i<=N;i++){
    const temp = dfs(i)
    if(temp > max){
        max = temp
        result = [i]
    }else if(temp === max){
        result.push(i)
    }
}

console.log(result.join(' '))

// 00:23:03 메모리 초과 -> links 제거
// 00:25:03 메모리 초과 -> isVisited 사용
// 00:26:34 시간 초과 -> isVisited 밖으로, 기존 관계 역전
// 00:32:35 메모리 초과 -> localIsVisited 추가
// 00:36:00 출력 초과 -> trim 추가
// 00:37:46 출력 초과 -> ??? -> isVisited 재활용
// 00:56:36 틀렸습니다 -> dfs로 변경
// 01:11:34 