function solution(originKey, lock) {
    const N = lock.length
    const M = originKey.length
    const holeCount = [...lock].flat().filter(e=>e===0).length
    
    const rotateKey1 = Array.from(Array(M), ()=>Array(M).fill(0))
    const rotateKey2 = Array.from(Array(M), ()=>Array(M).fill(0))
    const rotateKey3 = Array.from(Array(M), ()=>Array(M).fill(0))
    for(let i=0;i<M;i++){
        for(let j=0;j<M;j++){
            rotateKey1[j][M-i-1] = originKey[i][j]
            rotateKey2[M-i-1][M-j-1] = originKey[i][j]
            rotateKey3[M-j-1][i] = originKey[i][j]
        }
    }
    const keys = [originKey, rotateKey1,rotateKey2,rotateKey3]
    
    for(const key of keys){
        
        for(let x=-M;x<N;x++){
            for(let y=-M;y<N;y++){
                let count = 0
                lockLoop: for(let i=0;i<M;i++){
                    for(let j=0;j<M;j++){
                        if(lock[x+i]===undefined){
                            continue
                        }

                        if(lock[x+i][y+j] === 0 && key[i][j] !== 1){
                            break lockLoop
                        }else if(lock[x+i][y+j]===1 && key[i][j] === 1){
                            break lockLoop
                        }else if(lock[x+i][y+j]===0 && key[i][j]===1){
                            count++
                        }
                    }
                }
                if(count === holeCount){
                    return true
                }

            }
        }
        
    }
    
    
    return false;
}
// 00:33:27 절반 정도 실패 -> (-M, -M)부터 시작 하도록 수정
// 00:35:20 [2,4,7,12,18,20,23,26~30,32,33] 실패 -> holeCount 테스트 값에서 변경
// 00:38:10 [3,5,7~11,13,14,16~23,34~38] 실패 -> 오타 수정
// 00:41:45 통과