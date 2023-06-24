const [[N],[M],...linksInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const links = Array.from({length: N+1}, ()=>Array(N+1).fill(Infinity))

for(const [a,b,c] of linksInput){
    if(links[a][b] > c) links[a][b] = c
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

// console.table(links)
const iter = links[Symbol.iterator]()
iter.next()
const result = []
for(const row of iter){
    result.push(row.slice(1).map(e=>e===Infinity ? 0: e).join(' '))
}
console.log(result.join('\n'))

// 00:13:35 틀렸습니다(97%) -> Infinity 예외처리
// 00:16:04 