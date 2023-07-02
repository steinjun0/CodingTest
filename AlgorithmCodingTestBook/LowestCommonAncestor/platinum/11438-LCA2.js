const [[N],...linksInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split("\n")
    .map(row=>row.split(' ').map(Number))

const [[M],...testcases] = linksInput.slice(N-1)
linksInput.length = N-1


const links = Array.from({length:N+1},()=>[])
for(const [a,b] of linksInput){
    links[a].push(b)
    links[b].push(a)
}

const isVisited = new Set()
const parents = Array.from({length:N+1},()=>[])
const levels = Array.from({length:N+1},()=>null)
function dfs(index,level){
    for(const nextIndex of links[index]){
        if(!isVisited.has(nextIndex)){
            levels[nextIndex]=levels[index]+1
            parents[nextIndex].push(index)

            isVisited.add(nextIndex)
            for(let k=1;k<=Math.log2(level);k++){
                parents[nextIndex][k] = parents[parents[nextIndex][k-1]][k-1]
            }
            dfs(nextIndex,level+1)
        }
    }
}

levels[1]=1
isVisited.add(1)
dfs(1,1)

// console.table(parents)
// console.table(levels)

function findLCA(a,b){
    const la = levels[a]
    const lb = levels[b]
    if(la > lb){
        // b를 a와 같은 level로 맞춰야함
        return findLCA(parents[a][Math.floor(Math.log2(la-lb))],b)
    }else if(la < lb){
        // a를 b와 같은 level로 맞춰야함
        return findLCA(a,parents[b][Math.floor(Math.log2(lb-la))])
    }else{
        // 같다면 탐색
        // if(a === 1 || b === 1) return 1
        if(a === b) return a
        if(parents[a][0] === parents[b][0]) return parents[a][0]

        const maxK = parents[a].length-1
        for(let k=1;k<=maxK;k++){
            if(parents[a][k] === parents[b][k]){
                // 같은게 나오면 -> LCA일수도 있고 그냥 조상일 수도 있고
                
                return findLCA(parents[a][k-1],parents[b][k-1])
            }
        }
        return findLCA(parents[a][maxK],parents[b][maxK])
    }
}

const result = []
for(const [a,b] of testcases){
    result.push(findLCA(a,b))
}
console.log(result.join('\n'))

// 11437-LCA와 동일한 코드