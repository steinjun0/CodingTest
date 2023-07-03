const [[M],colors,K] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const N = colors.reduce((sum,e)=>sum+e)
let result = 0
for(let color of colors){
    if(color >= K){
        let colorProb = 1
        for(let p=0;p<K;p++){
            const i = color-p
            const j = N-p
            colorProb *= i/j
        }
        result+=colorProb
    }
}
console.log(result)

// 00:23:35 맞았습니다