function solution(n, cores) {
    const L = cores.length
    let finishTime = 0
    let workingCores = Array(L).fill(0)
    let work = 0
    
    // init
    for(let i=0;i<L;i++){
        workingCores[i] = cores[i]
    }
    work = L
    let skipTime = 1
    while(work<n){
        let nextSkipTime = skipTime
        for(let i=0;i<L;i++){
            if(workingCores[i] === skipTime){
                workingCores[i] = cores[i]
                nextSkipTime = Math.min(nextSkipTime, cores[i])
                work++
                if(work===n){
                    return i+1
                }
            }else{
                workingCores[i]-=skipTime
                nextSkipTime = Math.min(nextSkipTime, workingCores[i])
            }
        }
        skipTime = nextSkipTime
    }
    
}

// 00:10:13 정확성 모두 통과, 효율성 [3] 통과, 나머지 실패 -> skip 할 수 있어야함 -> dp로 수정
// 00:34:37 정확성 모두 실패, [10, 11] 런타임 에러 -> for문 실수 수정 -> dp 규칙 수정
// 00:43:08 
// 02:00:00 포기

//      outer: for(let i=0;;i++){
//         let acc = 0
//         for(let j=0;j<L;j++){
//             const core = cores[j]
//             acc += ~~(i/core)
//             if(acc>n){
//                 finishTime = i
//                 break outer
//             }
//         }
//     }
    
    
// //     for(let i=1;;i++){
// //         dp[i] += dp[i-1]
// //         for(const core of cores){
// //             if(i%core === 0){
// //                 dp[i]+=1
// //             }
// //         }
// //         if(dp[i]>=n){
// //             finishTime = i
// //             break
// //         }
// //     }
    
//     // console.table(dp)

    
//     // if(n < L){
//     //     return n
//     // }else{
//     //     let leftWork = dp[finishTime] - n // 같은경우 일단 무시
//     //     for(let i=0;i<leftWork;i++){
//     //         for(let j=L;j>=0;j--){
//     //             const core = cores[j]
//     //             if(finishTime%core === 0){
//     //                 leftWork--
//     //                 if(leftWork === 0){
//     //                     return j+1
//     //                 }
//     //             }
//     //         }
//     //     }
//     // }

// function lcm(p,q){
//     let a = p
//     let b = q
//     let c = 1
//     while(c!==0){
//         c = a % b
//         if(c ===0){
//             break
//         }
//         a = b
//         b = c
//     }
//     return p*q/b
// }