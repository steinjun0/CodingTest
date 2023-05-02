const [[N,M],woks] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

woks.sort((a,b)=>a-b)
const wokCounts = {}
for(const wok of woks){
    wokCounts[wok] = wokCounts[wok] ? wokCounts[wok]+1:1
}
const dp = Array.from(Array(N+1),()=>{
    const object = {}
    for(const wok of woks){
        object[wok] = Infinity
    }
    return object
})

for(const wok of woks){

    for(const subWok of woks){
        dp[wok][subWok] = 0
    }
    dp[wok][wok] = 1

    for(let i=wok+1;i<=N;i++){
        let prevResult = 0
        let result = 0
        for(const subWok of woks){
            prevResult += Math.ceil((dp[i-wok][subWok] +subWok===wok?1:0)/wokCounts[subWok])
            result += Math.ceil(dp[i][subWok]/wokCounts[subWok])
        }
        if(prevResult<result){
            for(const subWok of woks){
                dp[i][subWok] = dp[i-wok][subWok]
            }
            dp[i][wok] += 1
        }
    }
}
// console.table(dp)
let result = 0
for(const wok of woks){
    result=Math.max(dp[N][wok],result)
}
if(result === Infinity){
    return console.log(-1)
}else{
    return console.log(result)
}


// 01:33:27 다시 시작.
// 01:51:00 메모리 초과 -> 배열, 객체로 변경
// 01:54:00 시간초과(1%) -> for문 하나 제거(아직 안될듯)
// 01:59:00 런타임 에러 -> 틀렸습니다
// 02:19:02 중복 고려 -> 시간초과


// function getComb(arr,n){
//     const result = []
//     if(n===1){
//         return [...arr]
//     }else{
//         for(let i=0;i<n;i++){
//             for(const subComb of getComb([...arr.slice(0,i),...arr.slice(i+1)],n-1)){
//                 if(typeof subComb === 'object'){
//                     result.push([arr[i],...subComb])
//                 }else{
//                     result.push([arr[i],subComb])
//                 }
//             }
//         }
//     }
    
//     return result
// }
// console.log()
// getComb(woks,40)

// function getComb(woks){
//     const result = []
//     for(let i=0;i<woks.length;i++){
//         const wok = woks[i]
//         result.push([...woks.slice(0,i),...woks.slice(i+1)])
//         if(woks.length>2){
//             result.push(...getComb([...woks.slice(0,i),...woks.slice(i+1)]))
//         }
//     }
//     return result
// }
// console.table(getComb(woks))

// const totalWoks=woks.reduce((sum,e)=>e+sum)
// let min=0
// let max=woks[woks.length-1]*N
// let mid=Math.floor((min+max)/2)

// while(min+1<max){
//     if(N<=mid*totalWoks && (mid-1)*totalWoks < N){
//         break
//     }else if(mid*totalWoks < N){
//         min = mid
//     }else if(mid*totalWoks > N){
//         max = mid
//     }
//     mid=Math.floor((min+max)/2)
// }

// console.log(min,mid,max)

// if(mid*totalWoks === N){
//     return console.log(mid)
// }else{
//     mid*totalWoks // N보다 큰수 -> 이걸 N까지 늘려야함
//     const target = N-(mid-1)*totalWoks // dp로 구하면된다
//     console.log(target,(mid-1)*totalWoks)
//     const dp = Array(target+1).fill(Infinity)
//     for(const wok of woks){
//         dp[wok]=1
//         for(let i=wok+1;i<=target;i++){
//             if(i-wok>=1){
//                 dp[i] = Math.min(dp[i-wok]+1,dp[i])
//             }
//         }
//     }
//     console.table(dp)
//     if(dp[target]===Infinity){
//         return console.log(-1)
//     }else{
//         return console.log(mid-1+dp[target])
//     }
// }
