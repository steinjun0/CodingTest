function solution(jobs) {
    const N = jobs.length
    
    if(N===1){
        return jobs[0][1]
    }
    
    jobs.sort((a,b)=>{
        if(a[0]===b[0]){
            return a[1]-b[1]
        }else{
            return a[0]-b[0]
        }
    })
    const firstJob = jobs.shift()
    
    let answer = firstJob[1]
    let lastFinishTime = firstJob[0]+firstJob[1]
    
    for(let i=0;i<N-1;i++){
        let tempJobs = jobs.filter(e=>e[0]<=lastFinishTime)
        
        if(tempJobs.length === 0){
            let minStart = Infinity
            for(job of jobs){
                minStart = Math.min(job[0],minStart)
            }
            tempJobs = jobs.filter(e=>e[0]===minStart)
            lastFinishTime = minStart
        }
        
        let minIndex = 0
        let minValue = Infinity
        
        for(let j =0;j<tempJobs.length;j++){
            if(minValue>tempJobs[j][1]){
                minValue = tempJobs[j][1]
                minIndex = j
            }else if((minValue === tempJobs[j][1]) && (tempJobs[minIndex][0] > tempJobs[j][0])){
                minIndex = j
            }
        }
        
        const minJob = tempJobs[minIndex]
        answer += minJob[1]+lastFinishTime-minJob[0]
        lastFinishTime = minJob[1]+lastFinishTime
        jobs.splice(minIndex,1)
        
    }
    return ~~(answer/N)
    
    
//     jobs.sort((a,b)=>a[1]-b[1])

//     let answer = 0;
//     let lastFinishTime =0
//     for(let i=0;i<jobs.length;i++){
//         answer+= jobs[i][1] + Math.max(lastFinishTime-jobs[i][0], 0)
//         lastFinishTime = jobs[i][1] + Math.max(lastFinishTime-jobs[i][0], 0) + jobs[i][0]
//     }
    
//     return ~~(answer/jobs.length);
}

// 00:15:05 [20] 제외 모두 실패 -> 소수점 이하 수 버림
// 00:16:02 [20] 제외 모두 실패 -> 소요시간 제대로 정렬
// 00:17:06 [17,20] 제욈 모두 실패 -> 다시 -> 시뮬레이션 형태로 완전 수정
// 00:29:58 [16,19] 런타임에러, [8,18] 실패 -> 끝나자마자 실행할 수 있도록 수정
// 00:34:42 [19] 런타임에러, [8, 18] 실패
// 00:37:20 [19] 런타임에러, [8, 18] 실패
// 00:40:40 [8, 18, 19] 실패 -> tempJob 못찾았을 시 로직 수정(shift->find)
// 00:50:53 [8, 18] 실패 -> minIndex 같을 때 조건 추가
// 00:53:32 [8, 18] 실패 -> jobs 정렬시 시작시간 + 소요시간으로 변경
// 00:59:31 통과