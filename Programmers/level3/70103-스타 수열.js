function getCommon(sets){
    if(sets.length === 1){
        return Array.from(sets[0])
    }
    else{
        const elems = new Set()
        for(const set of sets){
        }
    }
}

function solution(numbers) {
    if(numbers.length < 2){
        return 0
    }
    const N = numbers.length

    const startsIndex = {}
    for(let i=0;i<N;i++){
        if(startsIndex[numbers[i]] === undefined){
            startsIndex[numbers[i]] = i
        }
    }
    
    // console.log(startsIndex)
    // let max = 1
//     for(const numberStr in startsIndex){
//         const number = +numberStr
//         const startIndex = startsIndex[numberStr]
        
//         let count = 0
//         const isUsed = new Set()
//         for(let i = startIndex;i<N;i++){
//             if(numbers[i] === number){
//                 if(i > 0 && !isUsed.has(i-1) && numbers[i-1] !== number){
//                     count++
//                     isUsed.add(i-1)
//                 }else if(i<N-1 && !isUsed.has(i+1) && numbers[i+1] !== number){
//                     count++
//                     isUsed.add(i+1)
//                 }
//             }
//         }
//         max = Math.max(max,count)
//     }
    
    const isUsed = {}
    const counts = {}
    for(let i=0;i<N;i++){
        const number = numbers[i]
        if(isUsed[number] === undefined){
            isUsed[number] = new Set()
            counts[number] = 0
        }
        
        if(i>0 && !isUsed[number].has(i-1) && numbers[i-1] !== number){
            counts[number]++
            isUsed[number].add(i-1)
        }else if(i<N-1 && !isUsed[number].has(i+1) && numbers[i+1] !== number){
            counts[number]++
            isUsed[number].add(i+1)
        }
    }
    
    let max = -1
    for(const number in counts){
        max = Math.max(max,counts[number])
    }
    
    
    return max*2;
}

// 00:42:47 [16~28] 시간초과 -> 2중 반복문 제거
// 00:51:44 통과