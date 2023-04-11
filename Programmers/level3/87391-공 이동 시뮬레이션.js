const directions = [[0,-1],[0,1],[-1,0],[1,0]]
const reverseDirections = [[0,1],[0,-1],[1,0],[-1,0]]

function getAreaSize(start,end){
    return (end[0]-start[0]+1) * (end[1]-start[1]+1)
}

function solution(N, M, ex, ey, queries) {
    
    function valueToPoint(position){
        return [Math.floor(position/M), position%M]
    }
    function pointToValue(x,y){
        return x*M+y
    }
    
    function safeCalc(left, value, max){
        let result = left + value
        if(result < 0){
            return 0
        }else if(result > max){
            return max
        }else{
            return result
        }
    }
    
    function getNewArea(start, end, dx, dy){
        let newStart = [...start]
        let newEnd = [...end]
        // let newStart = [start[0]+dx, start[1]+dy]
        // let newEnd = [end[0]+dx, end[1]+dy]
        
        if(dx < 0){
            if(start[0] === 0){
                newEnd[0] = safeCalc(newEnd[0],-dx,N-1)
            }else{
                newStart[0] = safeCalc(newStart[0],-dx,N-1)
                newEnd[0] = safeCalc(newEnd[0],-dx,N-1)
            }
        }else if(dx > 0){
            if(end[0] === N-1){
                newStart[0] = safeCalc(newEnd[0],-dx,N-1)
            }else{
                newStart[0] = safeCalc(newStart[0],-dx,N-1)
                newEnd[0] = safeCalc(newEnd[0],-dx,N-1)
            }
        }else if(dy < 0){
            if(start[1] === 0){
                newEnd[1] = safeCalc(newEnd[1],-dy,M-1)
            }else{
                newStart[1] = safeCalc(newStart[1],-dy,M-1)
                newEnd[1] = safeCalc(newEnd[1],-dy,M-1)
            }
        }else if(dy > 0){
            if(end[1] === M-1){
                newStart[1] = safeCalc(newEnd[1],-dy,M-1)
            }else{
                newStart[1] = safeCalc(newStart[1],-dy,M-1)
                newEnd[1] = safeCalc(newEnd[1],-dy,M-1)
            }
        }
        
        
        // if(dx > 0){
        //     newEnd = [start[0]+dx, end[1]]
        //     if(newEnd[0] > N-1){
        //         newStart[0] -= newEnd[0]-(N-1)
        //         newEnd[0] = N-1
        //         if(newStart[0] < 0) newStart[0] = 0
        //     }else{
        //         newStart = [start[0]+dx, start[1]]
        //     }
        // }else if(dx < 0){
        //     newStart = [start[0]+dx, start[1]]
        //     if(newStart[0] < 0){
        //         newEnd[0] += (-newStart[0])
        //         newStart[0] = 0
        //         if(newEnd[0] > N-1) newEnd[0] = N-1
        //     }else{
        //         newEnd = [end[0]+dx, end[1]]
        //     }
        // }else if(dy > 0){
        //     newEnd = [end[0], end[1]+dy]
        //     if(newEnd[1] > M-1){
        //         newStart[1] -= newEnd[1]-(M-1)
        //         newEnd[1] = M-1
        //         if(newStart[1] < 0) newStart[1] = 0
        //     }else{
        //         newStart = [start[0], start[1]+dy]
        //     }
        // }else if(dy < 0){
        //     newStart = [start[0], start[1]+dy]
        //     if(newStart[1] < 0){
        //         newEnd[1] += (-newStart[1])
        //         newStart[1] = 0
        //         if(newEnd[1] > M-1) newEnd[1] = M-1
        //     }else{
        //         newEnd = [end[0], end[1]+dy]
        //     }
        // }

        return [newStart, newEnd]
    }
    
    let queue=new Set([ex*M+ey])
    let start = [ex,ey]
    let end = [ex,ey]
    
    for(let i=queries.length-1;i>=0;i--){
        const query = queries[i]
        const direction = directions[query[0]]
        const distance = query[1]
        const dx = direction[0]*distance
        const dy = direction[1]*distance
        // console.log(query)
        const result = getNewArea(start, end, dx, dy)
        start = result[0]
        end = result[1]
        // console.log(start,end)
    }
    return getAreaSize(start,end)
}

// 00:45:55 [1,2,3,4,15,33,34] 통과, [8,12] 실패, [28,30,31] 런타임에러, 나머지 시간 초과 -> queue set으로 변경
// 01:00:55 [1,2,3,4,15,33,34] 통과, [8,12] 실패, [28,30,31] 런타임에러, 나머지 시간 초과 -> 영역 측정으로 로직 완전 변경
// 01:25:22 [3,15,21,27] 통과, 나머지 실패 -> 기본 이동 로직 추가
// 01:53:33 [6,18,19,21,27,28] 통과, 나머지 실패 -> 로직 정리
// 02:18:19 [1,2,3,5,15,16] 통과, 나머지 실패
// 02:18:19 포기