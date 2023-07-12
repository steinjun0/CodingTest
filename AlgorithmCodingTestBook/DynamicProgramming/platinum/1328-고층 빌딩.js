const [N, L, R] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)

const dp = Array.from({length:N+1},()=>Array.from({length:N+1},()=>Array.from({length:N+1},()=>0)))
for(let i=0;i<N;i++){
    dp[1][0][i] = 1
    dp[1][i][0] = 1
    dp[1][i][i] = 1
}
dp[2][2][1] = 1
dp[2][1][2] = 1

dp[3][2][1] = 1
dp[3][1][2] = 1
dp[3][2][2] = 2
dp[3][3][1] = 1
dp[3][1][3] = 1
dp[3][2][2] = 2

for(let i=4;i<=N;i++){
    for(let j=1;j<=N;j++){
        for(let k=1;k<=N;k++){
            // dp[i][j][k]
            for(let p=1;p<=i-1;p++){
                let q = i - p
                for(let count = 1;count<i-1;count++){
                    let a,b
                    for(let x = 1;x<=p;x++){
                        a = dp[count][p][x]
                    }
                    for(let x = 1;x<=q;x++){
                        b = dp[count][x][q]
                    }
                    dp[i][p][q] += a*b
                    console.log(a,b,dp[i][p][q])
                }
            }
        }
    }   
}

console.table(dp[2])
console.table(dp[3])
console.table(dp[4])

console.log(dp[N][L][R])

// 01:23:17 포기