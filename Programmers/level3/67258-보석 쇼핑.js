function getClosestGem([min,max], gems, leftGems){
    
    let newMin = -Infinity
    let newMax = Infinity
    
    for(let i=min;i>=0;i--){
        if(leftGems.has(gems[i])){
            newMin = i
            break
        }
    }
    
    for(let i=max;i<gems.length;i++){
        if(leftGems.has(gems[i])){
            newMax = i
            break
        }
    }
    if(newMax !== Infinity && min-newMin > newMax-max){
        return [[min, newMax, gems[newMax]]]
    }
    
    if(newMin !== -Infinity && min-newMin > newMax-max){
        return [[newMin,max, gems[newMin]]]
    }
    
    if(newMax !== Infinity && newMin !== -Infinity && min-newMin === newMax-max){
        return [[newMin,max, gems[newMin]], [min, newMax, gems[newMax]]]
    }
    return []
    
}

function solution(gems) {
    const gemsSet = new Set(gems)
    const gemsPosition = {}
    for(let i=0;i<gems.length;i++){
        if(gemsPosition[gems[i]]){
            gemsPosition[gems[i]].push(i)
        }else{
            gemsPosition[gems[i]] = [i]
        }
    }
    
    let min = Infinity
    let minGem = null
    for(const gem in gemsPosition){
        if(min > gemsPosition[gem].length){
            min = gemsPosition[gem]
            minGem = gem
        }
    }
    
    gemsSet.delete(minGem)
    
    const fixeds = gemsPosition[minGem].map(e=>[[e,e],new Set(gemsSet)])
    
    const best = [0, Infinity]
    
    for(const fixed of fixeds){
        const queue = [[fixed[0],fixed[1]]]
        while(queue.length>0){
            const params = queue.pop()
            const combs = getClosestGem(params[0],gems,params[1])
            for(const [newMin, newMax ,gem] of combs){
                console.log(newMin, newMax)
                if(params[1].size > 1){
                    const newLeftGems = new Set(params[1])
                    newLeftGems.delete(gem)
                    queue.push([[newMin, newMax], newLeftGems])
                }else if(params[1].size === 0){
                    if(
                        (newMax-newMin < best[1]-best[0]) ||
                        ((newMax-newMin === best[1]-best[0]) && (newMin < best[0])) 
                    ){
                        best[0] = newMin
                        best[1] = newMax
                    }
                }
            }
            
        }
        
        
    }
    // console.log(fixeds)
    
    return [best[0]+1,best[1]+1];
}

// 01:18:20 [1,5,6,7] 통과, 나머지 런타임에러+시간초과 -> min,max 늘릴 필요 없을 때 추가
// 01:21:39 [1,5,6,7] 통과, 나머지 런타임에러 -> 좀더 간단하게 수정
// 02:03:44 [10,11,12,14,15] 실패, [1,2,5~12,14] 실패 -> 시작 조건 제거
// 02:08:40 [11,14,15] 실패, 전부 시간 및 메모리 초과
// 02:28:42 포기


// ["DIA", "ZZZ", "YYY", "NNNN", "YYY", "BBB", "RUBY", "RUBY", "DIA", "DIA", "AC", "AB", "AC", "AA", "AC", "EMERALD", "SAPPHIRE", "ZZZ", "YYY", "NNNN", "YYY", "BBB", "DIA", "DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA", "DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA", "DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"]




//     function getCombs([[min,max], leftGems]){
//         const result = []
        
//         if(leftGems.size === 0){
//             return [
//                 [[min,max],leftGems]
//             ]
//         }
        
//         for(const leftGem of leftGems){

//             const [newMin, newMax] = getClosestPosition([min,max], gemsPosition[leftGem])
            
//             if(newMin !== null || newMax !== null){
//                 const nextLeftGems = new Set(leftGems)
//                 nextLeftGems.delete(leftGem)

//                 if(newMin !== null){
//                     result.push([[newMin, max],nextLeftGems])
//                 }

//                 if(newMax !== null){
//                     result.push([[min, newMax],nextLeftGems])
//                 }
//             }
//         }
        
//         return result
//     }





//     function getCombs(fixeds){
//         const result = []
//         for(const [[min,max], leftGems] of fixeds){
//             if(leftGems.size === 0){
//                 result.push([min, max])
//             }
//             else{
//                 gemLoop: for(const leftGem of leftGems){
//                     let leftPos = -Infinity
//                     let rightPos = Infinity
//                     for(const pos of gemsPosition[leftGem]){
//                         if(min<pos && pos<max){
//                             leftGems.add(leftGem)
//                             break gemLoop
//                         }

//                         if(leftPos < pos && pos < min){
//                             leftPos = pos
//                         }
//                         if(max < pos && pos < rightPos ){
//                             rightPos = pos
//                         }
//                     }
//                     if(leftPos !== -Infinity || rightPos !== Infinity){
//                         const nextLeftGems = new Set(leftGems)
//                         nextLeftGems.add(leftGem)
                        
//                         if(leftPos !== -Infinity){
//                             result.push(...getCombs([[[leftPos, max],nextLeftGems]]))
//                         }
//                         if(rightPos !== Infinity){
//                             result.push(...getCombs([[[min, rightPos],nextLeftGems]]))
//                         }
//                     }
//                 }
//             }
//         }
        
//     return result
// }