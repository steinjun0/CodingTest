const input =require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const N = +input[0]
const triangle = input.slice(1).map(row=>row.split(' ').map(Number))

for(let i=1;i<N;i++){
    for(let j=0;j<i+1;j++){
        triangle[i][j] += Math.max(triangle[i-1][j-1]??0, triangle[i-1][j]??0)
    }
}

console.log(Math.max(...triangle[N-1]))

// 00:10:33 맞았습니다!