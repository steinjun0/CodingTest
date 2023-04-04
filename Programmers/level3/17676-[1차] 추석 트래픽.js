function solution(lines) {
    const timeTable = []
    for(const line of lines){
        const temp = line.split(' ')
        const operatingTime = +(temp[2].slice(0,temp[2].length-1))*1000
        
        const endTime = new Date(temp[0]+'T'+temp[1]).getTime() + 1000
        const startTime = endTime-operatingTime-999
        timeTable.push([startTime,0],[endTime,1])
    }
    timeTable.sort((a,b)=>{
        if(a[0]===b[0]){
            return b[1]-a[1]
        }else{
            return a[0]-b[0]    
        }
        
    })
    
    let tasks = 0
    let max = 0
    for(const [, type] of timeTable){
        if(type === 0){
            tasks++
            if(tasks>max){
                max = tasks
            }
        }else{
            tasks--           
        }
    }
    
    return max;
}

// 00:18:37 구간인걸 이제야 이해 -> 종료시간에 1초 추가
// 00:22:53 통과