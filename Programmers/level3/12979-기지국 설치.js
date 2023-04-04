function solution(N, stations, W) {
    
    const maxRange = W*2+1
    
    let answer = 0;
    answer += Math.ceil((stations[0]-1-W)/maxRange)
    
    for(let i=1;i<stations.length;i++){
        const shadow = stations[i]-stations[i-1]-1-2*W
        answer += Math.ceil(shadow/maxRange)
    }
    const last = N-stations[stations.length-1]-W
    if(last>0){
        answer += Math.ceil(last/maxRange)
    }

    return answer;
}

// 00:11:00 효율성 [1,2] 시간초과 -> shadows 배열 제거
// 00:12:56 통과