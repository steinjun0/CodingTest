function solution(scores) {
    const wanhoS = [...scores[0]]

    scores.sort((a,b)=>{
        if(b[0]===a[0]){
            return b[1]-a[1]
        }else{
            return b[0]-a[0]    
        }
    })

    let max = -Infinity
    let prevMax = -Infinity
    const newScores = []

    for(let i=0;i<scores.length;i++){
        const score = scores[i]
        if(scores[i-1] && score[0] < scores[i-1][0]){
            prevMax = Math.max(max,prevMax)
        }

        if(score[1] > max){
            max = score[1];
        }

        if(score[1] < prevMax){
            if((wanhoS[0] === score[0]) && (wanhoS[1] === score[1])){
                return -1
            }
            continue
        }

        newScores.push(score[0]+score[1])
    }
    newScores.sort((a,b)=>b-a)

    for(let i=0;i<newScores.length;i++){
        if(newScores[i]===wanhoS[0]+wanhoS[1]){
          return i+1  
        }
    }
}