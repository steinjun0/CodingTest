function solution(sequence) {
    let answer = 0;
    
    const pulseSeq = sequence.map((e,i)=>e*(Math.pow(-1,i)))
    const prefixSeq = [0]
    for(let i=1;i<=pulseSeq.length;i++){
        prefixSeq.push(prefixSeq[i-1]+pulseSeq[i-1])
    }
    
    let min=Infinity
    let max=-Infinity
    for(let i=0;i<=sequence.length;i++){
        min = Math.min(prefixSeq[i],min)
        max = Math.max(prefixSeq[i],max)
    }
    
    if(min === max){
        answer = Math.max(Math.abs(min),answer)
    }else{
        answer = Math.max(Math.abs(min-max),answer)
    }
    
    return answer;
}