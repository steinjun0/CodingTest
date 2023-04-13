function getFinishNumber(time, cores){
    let sum = cores.length
    for(const core of cores){
        sum += Math.floor(time/core)
    }
    return sum
}

function getFinishTime(N,cores){
    let min = 0
    let max = Math.max(...cores) * N
    let mid = Math.floor((min+max)/2)
    let result = {}
    while(min+1<max){
        result[mid] = getFinishNumber(mid,cores)
        if(result[mid] < N){
            min = mid
        }else{
            max = mid
        }
        mid = Math.floor((min+max)/2)
    }
    return [max, result[max]]
}

function getLastCore(N,time,finishes,cores){
    const left = finishes-N 
    // console.log(time, cores)
    const startCores=cores.map((e,i)=>[e,i]).filter(e=>time%e[0]===0)
    // console.log(startCores,left)
    return startCores[startCores.length-1-left][1]
}

function solution(N, cores) {
    const [time, finishes] = getFinishTime(N,cores)
    // console.log(time,finishes)
    const lastCore = getLastCore(N,time,finishes,cores)
    return lastCore+1
}

// 00:23:26 1개 시간초과 -> memoization
// 00:27:12 