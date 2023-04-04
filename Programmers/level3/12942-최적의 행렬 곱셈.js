function solution(matrixSizes) {
    const dp = [
        0,
        matrixSizes[0][0]*matrixSizes[0][1]*matrixSizes[1][1],
    ]

    const nestedDp = [
        [
            0,
            matrixSizes[0][0]*matrixSizes[0][1]*matrixSizes[1][1],
        ],
        [
            0,0,
            matrixSizes[1][0]*matrixSizes[1][1]*matrixSizes[2][1],
        ],
    ]
    
    for(let end=2;end<matrixSizes.length;end++){
        nestedDp[end] = Array(end+1).fill(0)
        for(let start=end-1;start>=0;start--){
            nestedDp[start][end] = Infinity
            // nestedDp[start][end] = nestedDp[start][end-1] + matrixSizes[start][0]*matrixSizes[end][0]*matrixSizes[end][1]
            if(start+1===end){
                nestedDp[start][end] = matrixSizes[start][0]*matrixSizes[end][0]*matrixSizes[end][1]
            }else{
                
                for(let i=0;start+i<end;i++){
                    nestedDp[start][end] = Math.min(
                        nestedDp[start][start+i] + nestedDp[start+i+1][end] 
                        + matrixSizes[start][0]*matrixSizes[start+i][1]*matrixSizes[end][1],
                        nestedDp[start][end]
                    )
                }    
            }
            // console.table(nestedDp)
            
        }
        // console.table(nestedDp)
    }


    return nestedDp[0][nestedDp[0].length-1];
}

// 00:27:30 [8,13] 통과, 나머지 실패 -> 생성비용 고려
// 00:30:08 [8,13] 통과, 나머지 실패 -> dp로 변경
// 00:55:40 전체 실패 -> A를 분리하는 경우 추가(divideADp)
// 01:28:52 전체 실패 -> divideADp 최소값 갱신하도록 수정
// 01:34:30 전체 실패 -> nestedDp로 알고리즘 일반화
// 02:24:44 통과