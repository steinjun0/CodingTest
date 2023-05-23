const [[N,M],...numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt') )
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const prefix = Array.from(Array(N),()=>Array(N).fill(0))

for(let i=0;i<N;i++){
    for(let j=0;j<N;j++){
        prefix[i][j] = (prefix[i][j-1] ?? 0) + (numbers[i][j])
    }
}

for(let i=1;i<N;i++){
    for(let j=0;j<N;j++){
        prefix[i][j] += (prefix[i-1] ? prefix[i-1][j] : 0)
    }
}

const result = []
for(let i=N;i<N+M;i++){
    const [x1,y1,x2,y2] = numbers[i].map(e=>e-1)
    result.push(prefix[x2][y2] 
        - (prefix[x2][y1-1]??0) 
        - (prefix[x1-1] ? prefix[x1-1][y2] : 0) 
        + (prefix[x1-1] ? (prefix[x1-1][y1-1]??0) : 0))
}
console.log(result.join('\n'))

// ~~30:00:00