const input =require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

let caseCount = +input[0]
let count = -1
while(count++<caseCount-1){
    const N = +input[count*3+1]
    const coins = input[count*3+2].split(' ').map(Number)
    const target = +input[count*3+3]

    const dp = Array.from(Array(target+1), ()=>new Set())
    for(let i=1;i<=target;i++){
        if(coins.includes(i)){
            dp[i].add(i)
        }
        for(const coin of coins){
            if(dp[i-coin]?.values()!==undefined){
                dp[i].add(...dp[i-coin].values(),i)
            }
            
        }
    }
    console.log(dp[target])
}