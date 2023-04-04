function solution(N, T, M, timetable) {

    const crews = []
    for(const row of timetable){
        const [hour, min] = row.split(':')
        const date = new Date(2023,03,04)
        date.setHours(hour)
        date.setMinutes(min)
        const time = date.getTime()
        crews.push(time)
    }
    crews.sort((a,b)=>b-a)
    
    let startTime = (new Date(2023,03,04)).setHours(9)
    const gap = T*60*1000
    
    let lastTime = startTime

    for(let i=0;i<N;i++){
        const busTime = startTime + gap*i
        
        for(let _=0;_<M;_++){
            const crew = crews.pop()
            if(crew > busTime){
                lastTime = busTime
                crews.push(crew)
                break
            }
            else if(crew === undefined){
                lastTime = busTime
                break
            }
            lastTime = (crew - 1000*60)
        }
        
    }
    
    const lastDate = new Date(lastTime)
    let answer = `${lastDate.getHours()}`.padStart(2,'0')+':'+`${lastDate.getMinutes()}`.padStart(2,'0');
    return answer;
}

// 00:32:14 통과