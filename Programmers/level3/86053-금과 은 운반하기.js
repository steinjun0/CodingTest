function getTotalWeights(until, golds, silvers, weights, times){
    const N = golds.length

    let totalWeights = 0n
    let maxGolds = 0n
    let maxSilvers = 0n
    for(let i=0;i<N;i++){
        const gold = BigInt(golds[i])
        const silver = BigInt(silvers[i])
        const weight = BigInt(weights[i])
        const time = BigInt(times[i])
        const count = ~~(((until+time)/time)/2n)

        const totalWeight = gold+silver < count*weight ? gold+silver : count*weight
        const maxGold = gold < count*weight ? gold : count*weight
        const maxSilver = silver < count*weight ? silver : count*weight
        
        totalWeights+=totalWeight
        maxGolds+=maxGold
        maxSilvers+=maxSilver
    }
    return [totalWeights, maxGolds, maxSilvers]
}

function solution(a, b, g, s, w, t) {
    
    let min = 0n
    let max = BigInt(Math.max(...t))*BigInt(a+b)*2n
    let mid = BigInt((max+min)/2n)
    // console.log(getTotalWeights(90, g,s,w,t))
    while(min+1n<max){
        const [total, maxGold, maxSilver] = getTotalWeights(mid, g,s,w,t)
        // console.log([min,mid,max],[total, maxGold, maxSilver])
        if(a+b > total){
            min = mid
        }else if(a <= maxGold && b <= maxSilver){
            max = mid
        }else{
            min = mid
        }
        mid = (max+min)/2n
    }
    
    
    let answer = max;
    return answer;
}

// 00:46:54 [1~6,24] 통과 -> 테스트용 코드 제거
// 00:48:59 [1~6,24] 통과 -> BigInt로 변경
// 01:00:00 통과