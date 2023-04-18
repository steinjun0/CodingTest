const S = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
let i=1
let sum = 0
for(i=1;sum<=S;i++){
    sum+=i
}
console.log(i-2)

// 00:05:57 