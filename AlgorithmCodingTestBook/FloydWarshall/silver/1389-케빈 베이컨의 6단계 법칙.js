const [[N,M],...linksInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt')) 
    .toString()
    .trim()
    .split('\n').map(row=>row.split(' ').map(Number))


const links = Array.from({length:N+1},()=>Array(N+1).fill(Infinity))
for(const [a,b] of linksInput){
    links[a][b] = 1
    links[b][a] = 1
}
for(let i=1;i<=N;i++){
    links[i][i] = 0
}

for(let k=1;k<=N;k++){
    for(let i=1;i<=N;i++){
        for(let j=1;j<=N;j++){
            if(links[i][j] > links[i][k] + links[k][j]){
                links[i][j] = links[i][k] + links[k][j]
            }
        }
    }
}

let min = Infinity
let minIndex = null
for(let i=1;i<=N;i++){
    let temp = 0
    for(let j=1;j<=N;j++){
        temp += links[i][j]
    }
    if(temp < min){
        minIndex = i
        min = temp
    }
}
console.log(minIndex)

// 00:15:53 맞았습니다.