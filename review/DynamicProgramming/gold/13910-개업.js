const [[N,M],woks] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

function getComb(arr,r){
    if(r===1){
        return arr
    }else{
        const result = []
        for(let i=0;i<arr.length;i++){
            for(const subComb of getComb([...arr.slice(i+1)],r-1)){
                if(Array.isArray(subComb)){
                    result.push(
                        [arr[i], ...subComb]
                    )
                }else{
                    result.push(
                        [arr[i], subComb]
                    )
                }
                
            }
        }
        return result
    }
}

function solve(N, woksInput){
    const woks = getComb(woksInput,2)
    const wokPowers = Array.from(new Set([...woksInput,...woks.map(e=>e[0]+e[1])]))
    // const wokPowers = new Set(woksInput)
    // for(let i=0;i<woksInput.length;i++){
    //     for(let j=i+1;j<woksInput.length;j++){
    //         wokPowers.add(woksInput[i] + woksInput[j])
    //     }   
    // }
    const dp = Array(N+1).fill(Infinity)

    for(const power of wokPowers){
        dp[power] = 1
        for(let i=power+1;i<=N;i++){
            dp[i] = Math.min(dp[i-power]+1, dp[i])
        }
    }

    if(dp[N] === Infinity){
        return -1
    }else{
        return dp[N]
    }
}

console.log(solve(N,woks))

// 00:18:30 맞았습니다(14MB, 520ms) -> comb, 중복 로직 변경
// 00:21:55 틀렸습니다(1%) -> 오타 수정
// 00:24:04 맞았습니다(13MB, 620ms) -> ??? -> for에 set=>array로 변경
// 00:27:09 맞았습니다(13MB, 616ms) -> 중복 제거 로직 제거
// 00:29:29 맞았습니다(14MB, 548ms) -> 롤백 ->
// 00:35:36 끝.