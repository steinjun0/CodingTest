

function solution(commands) {
    let answer = [];
    
    const table = Array.from(Array(50),()=>Array(50).fill(null))
    const values = new Map() // value: [[r,c], ...]
    
    function removePointFromValues([x,y],value){
        const valueArr = values.get(value)
        if(valueArr){
            const removeIndex = valueArr.findIndex(([r,c])=>r===x && c===y)
            valueArr.splice(removeIndex, 1)
            if(valueArr.length === 0){
                values.delete(value)
            }    
        }
        
    }
    
    function updateValueAtPoint([x,y],value){
        const prevValue = table[x][y]
        
        if(prevValue?.push){ // prevValue 배열일 때
            if(value === prevValue[0]) {
                return
            }
            
//             if(prevValue[0] !== null){
//                 for(let i=1;i<prevValue.length;i++){
//                     const [r,c] = prevValue[i]
//                     removePointFromValues([r,c],prevValue[0])    
//                 }
//             }
            
            prevValue[0] = value
            
//             const temp = values.get(value)
//             if(temp){
//                 temp.push(...prevValue.slice(1))
//             }else{
//                 values.set(value, [...prevValue.slice(1)])
//             }
            
        }else{ // prevValue 값일 때
            if(value === prevValue){
                return
            }
            
            table[x][y] = value
        
            const temp = values.get(value)
            if(temp){
                temp.push([x,y])
            }else{
                values.set(value, [[x,y]])
            }    

            // if(prevValue !== null){
            //     const prevValueArr = values.get(prevValue)
            //     const removeIndex = prevValueArr.findIndex(([r,c])=>r===x && c===y)
            //     prevValueArr.splice(removeIndex, 1)
            //     if(prevValueArr.length === 0){
            //         values.delete(prevValue)
            //     }
            // }
        }
    }
    
    function updateValueByValue(prevValue, newValue){
        if(prevValue === newValue){
            return
        }
        for(let i=0;i<50;i++){
            for(let j=0;j<50;j++){
                if(table[i][j] === prevValue){
                    table[i][j]=newValue
                }
            }
        }
//         const points = values.get(prevValue)
        
//         if(points){
//             // 기존 값 모두 변경
//             for(const [x,y] of points){
//                 if(table[x][y].push){ // 배열이라면
//                     table[x][y][0] = newValue
//                 }else{ // 값이라면
//                     table[x][y] = newValue  
//                 }
//             }

//             // values 이동 및 기존 values 제거
//             if(values.get(newValue)){ 
//                 values.get(newValue).push(...points)
//             }else{
//                 values.set(newValue, [...points])
//             }

//             const prevValueArr = values.get(prevValue)
//             for(const [x,y] of points){
//                 const removeIndex = prevValueArr.findIndex(([r,c])=>r===x && c===y)
//                 prevValueArr.splice(removeIndex, 1)
//             }
//             if(prevValueArr.length === 0){
//                 values.delete(prevValue)
//             }
//         }
        
        
        
    }
    
    function printCell([x,y]){
        const value = table[x][y]
        if(value === null){
            answer.push('EMPTY')
        }else if(value.push){
            answer.push(value[0] === null ? 'EMPTY' : value[0])
        }else{
            answer.push(value)
        }
    }
    

    
    function merge([r1,c1],[r2,c2]){
        if(r1===r2 && c1 === c2){
            return
        }
        
        const value1 = table[r1][c1]
        const value2 = table[r2][c2]

        if(!value1?.push && !value2?.push){ // 둘다 일반 값
            let mergedArr

            if(value1 !== null && value2 !== null){
                mergedArr = [value1,[r1,c1],[r2,c2]]
                // values.get(value1).push([r2,c2])
                
                // removePointFromValues([r2,c2],value2)
            } 
            else if(value1 !== null && value2 === null){
                mergedArr = [value1,[r1,c1],[r2,c2]]
                // values.get(value1)?.push([r2,c2])
            } 
            else if(value1 === null && value2 !== null){
                mergedArr = [value2,[r1,c1],[r2,c2]]
                // values.get(value2)?.push([r1,c1])
            } else {
                mergedArr = [null,[r1,c1],[r2,c2]]
            }

            table[r1][c1] = mergedArr
            table[r2][c2] = mergedArr   

        }
        else if(value1?.push && value2?.push){ // 둘 다 배열
            let mergedArr
            if(value1[0]===null && value2[0] !== null){
                mergedArr = value2    
                mergedArr.push(...value1.slice(1))
                for(let i=1;i<value1.length;i++){
                    const [x, y]=value1[i]
                    table[x][y] = mergedArr    
                }
            }else{
                mergedArr = value1    
                mergedArr.push(...value2.slice(1))

                for(let i=1;i<value2.length;i++){
                    const [x, y]=value2[i]
                    table[x][y] = mergedArr    
                }
            }

        }
        else if(value1?.push && !value2?.push){ // value1 배열
            const mergedArr = value1
            if(value1[0] === null && value2 !== null){
                mergedArr[0] = value2
            }
            mergedArr.push([r2,c2])
            table[r2][c2] = mergedArr
        }
        else if(!value1?.push && value2?.push){ // value2 배열
            const mergedArr = value2
            if(value1 !== null){
                mergedArr[0] = value1
            }
            mergedArr?.push([r1,c1])
            table[r1][c1] = mergedArr
        }
    }
    
    function unmerge([x,y]){
        const mergedArr = table[x][y]
        if(mergedArr?.push){
            const value = mergedArr[0]
            for(let i=1;i<mergedArr.length;i++){
                const [r,c] = mergedArr[i]
                if(r===x && y === c){
                    table[r][c] = value
                }else{
                    table[r][c] = null
                    // const valuesArr = values.get(value)
                    // valuesArr?.splice(valuesArr.findIndex(([x,y])=>x===r && y===c),1)
                }
            }
        }
    }
    
    
    for(const commandInput of commands){
        command = commandInput.split(' ')
        
        switch(command[0]){
            case 'UPDATE':
                if(command.length === 4){
                    updateValueAtPoint([+command[1]-1,+command[2]-1],command[3])
                }else if(command.length === 3){
                    updateValueByValue(command[1],command[2])
                }
                break
            case 'MERGE':
                merge([+command[1]-1,+command[2]-1],[+command[3]-1,+command[4]-1])
                break
            case 'UNMERGE':
                unmerge([+command[1]-1,+command[2]-1])
                break
            case 'PRINT':
                printCell([+command[1]-1,+command[2]-1])
        }
        // console.log(command)
        // console.table(values)
        // console.table(table)    
    }
    
    return answer;
}

// 01:06:34 테스트 1통과, 테스트 2실패, 나머지 런타임 에러 -> 테스트용 코드 제거 안함 + 병합 부분 버그 수정
// 01:12:48 [1,2,3,4,10,20,21,22] 통과, 6 실패, 나머지 런타임 에러 -> unmerge시 values 갱신 안하는 버그 수정
// 01:20:58 [1,2,3,4,10,20,21,22] 통과, 6 실패, 나머지 런타임 에러 -> 
// updateValueByValue 제거시 [2,3,4,5,7,8,10,19,20,21,22] 통과
// updateValueAtPoint 제거시 런타임 에러 발견 -> 수정
// 01:25:00 [1,2,3,4,5,7,8,10,12,20,21,22] 통과, [6,9,11] 실패, 나머지 런타임에러
// updateValueByValue, merge 이 두개가 활성화 되면 런타임 에러 발생 -> merge 오타 발견
// 01:29:34 [6,11] 실패 [13~19] 런타임에러 -> updateValueByValue 배열 예외처리 추가
// 01:45:08 [6,11,19] 실패 [13~18] 런타임에러 -> merge시 values 처리 추가
// 01:57:57 [6,11,19] 실패 [13~18] 런타임에러 -> merge시 갱신값 기준 코드들 버그 수정
// 02:00:04 19 실패, [13~18] 런타임에러
// 03:12:30 포기