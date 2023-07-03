const [N,...testcases] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(Number)

const result = []

const building = Array.from({length: 15},()=>Array.from({length:14},(e,i)=>i+1))
for(let i=1;i<=14;i++){
    for(let j=1;j<=13;j++){
        building[i][j] = building[i][j-1] + building[i-1][j]
    }
}

for(let count=0;count<N;count++){
    const K = +testcases[count*2]
    const N = (+testcases[count*2+1])-1
    result.push(building[K][N])
}
console.log(result.join('\n'))

// 00:17:15 맞았습니다