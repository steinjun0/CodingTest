function getBinaryPermutation(N){
    let arr = [[true],[false]]
    for(let i=0;i<N-1;i++){
        let nextArr = []
        for(const elem of arr){
            nextArr.push([...elem,true])
            nextArr.push([...elem,false])
        }
        arr = nextArr
    }
    return arr
}


function getFliped(beginning,rowCmd, colCmd,N,M){
    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if((rowCmd[i] && !colCmd[j]) || (!rowCmd[i] && colCmd[j])){
                beginning[i][j] = beginning[i][j] === 1 ? 0 : 1
            }
        }
    }
}

function isSame(beginning, target, N,M){
    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if(beginning[i][j] !== target[i][j]){
                return false
            }
        }
    }
    return true
}

function solution(beginning, target) {
    const N = beginning.length
    const M = beginning[0].length
    const rowCmds = getBinaryPermutation(N)
    const colCmds = getBinaryPermutation(M)
    
    // console.log(getBinaryPermutation(2))
    // console.log(beginning)
    // getFliped(beginning, N, [0,1,0,1,0],[0,1,0,1,1])
    // console.log(beginning)
    // console.log(target)
    
    // console.log(isSame(beginning, target, N))
    
    // console.log([1,0,0,1,1,0].reduce((e,sum)=>sum+e))
    
    if(isSame(beginning, target, N,M)){
        return 0
    }
    
    
    let answer = Infinity
    
    for(const rowCmd of rowCmds){
        for(const colCmd of colCmds){
            getFliped(beginning, rowCmd, colCmd, N,M)
            if(isSame(beginning, target, N,M)){
                const count = rowCmd.filter(e=>e).length + colCmd.filter(e=>e).length
                if(answer > count){
                    answer = count
                }
            }
            getFliped(beginning, rowCmd, colCmd, N,M)
        }
    }
    
    if(answer === Infinity){
        return -1
    }else{
        return answer
    }
}

// 00:26:28 [3,5,6,7,10] 실패 -> Permutation 생성 개수 버그 수정
// 00:29:53 [3,5,6,7,10] 실패 -> 정사각형이 아님! ->
// 00:36:16 

// function flipArr(arr){
//     for(let i=0;i<arr.length;i++){
//         arr[i] = arr[i] === 0 ? 1 : 0
//     }
// }