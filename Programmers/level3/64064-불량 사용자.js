function getPermutations(arr,combination){
    const result = []
    for(const elem of combination){
        const newCombination = new Set(combination)
        newCombination.delete(elem)
        if(newCombination.size === 0){
            result.push([...arr, elem])
        }else{
            result.push(...getPermutations([...arr, elem], newCombination))
        }
        
    }
    return result
    
}

function isValid(id, rule){
    if(id.length !== rule.length){
        return false
    }else{
        for(let i=0;i<id.length;i++){
            if((rule[i] !== '*')&&(id[i] !== rule[i])){
                return false
            }
        }
    }
    return true
}

function solution(userIds, bannedIds) {
    
    let combinations = userIds.map(e=>new Set([e]))
    for(let max = 0;max<bannedIds.length;max++){
        const tempComb = []
        for(const combination of combinations){
            for(const userId of userIds){
                const tempSet = new Set(combination)
                tempSet.add(userId)
                if(tempSet.size===max+1){
                    tempComb.push(tempSet)
                }
            }    
        }
        combinations = tempComb
    }

    const result = new Set()
    // console.log('combinations',combinations)
    combLoop: for(const combination of combinations){
        const combinationArr = Array.from(combination)
        for(let i=0;i<combinationArr.length;i++){
            if(!isValid(combinationArr[i], bannedIds[i])){
                continue combLoop
            }
        }
        combinationArr.sort()
        result.add(combinationArr.join('/'))
//         const permutations = getPermutations([],combination)
//         permLoop: for(const permutation of permutations){
//             for(let i=0;i<permutation.length;i++){
//                 if(!isValid(permutation[i], bannedIds[i])){
//                     continue permLoop
//                 }
//             }
            
//             console.log(combination, permutation, bannedIds)
//             count++
            
//         }
    }
    
    
    return result.size;
}

// 00:50:33 통과