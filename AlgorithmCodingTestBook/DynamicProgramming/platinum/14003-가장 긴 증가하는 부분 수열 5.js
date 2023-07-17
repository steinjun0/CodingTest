const [[N], numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))
console.log(numbers);

function getRange(i){
    const [start,end,count] = getRange(i-1)
    if(numbers[i] > end){
        return [start,numbers[i],count+1]
    }else{
        return [start,end,count]
    }
}


// const dp = Array.from({length: N},()=>Array.from({length: N}).fill(0))
// const dp = Array(N).fill(0)
// dp[N-1] = 1

// let min = numbers[i]

// for(let i=N-2;i>=0;i--){

// }

// let min = numbers[i]
//     for(let j=i+1;j<N;j--){
//         if()
//     }

// 01:16:05 포기