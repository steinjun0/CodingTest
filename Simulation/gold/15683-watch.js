const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N,M] = input[0].split(' ').map(Number)
const space = input.slice(1).map(e=>e.split(' ').map(Number))

function checkIsValidPos(nx,ny){
    return 0<=nx&&nx<N&&0<=ny&&ny<M
}

function checkIsVisited(isVisited, startPos, directions){
    isVisited[startPos[0]][startPos[1]] = true
    for(const direction of directions){
        const stack = [startPos]
        while(stack.length>0){
            const pos = stack.pop()
            let nx = -1
            let ny = -1
            if(direction === 0){
                nx = pos[0]-1
                ny = pos[1]
            }
            else if(direction === 1){
                nx = pos[0]
                ny = pos[1]+1
            }
            else if(direction === 2){
                nx = pos[0]+1
                ny = pos[1]
            }
            else if(direction === 3){
                nx = pos[0]
                ny = pos[1]-1
            }
            if(checkIsValidPos(nx,ny)&&space[nx][ny] !== 6){
                isVisited[nx][ny]=true
                stack.push([nx,ny])
            }
        }
    }
}

function getShadowArea(directionsGroups){
    const isVisited = Array.from(Array(N),()=>Array(M).fill(false))
    let result = N*M
    for(const directionsGroup of directionsGroups){
        for(let i=N-1;i>=0;i--){
            for(let j=M-1;j>=0;j--){
                if([1,2,3,4,5].includes(space[i][j])){
                    checkIsVisited(isVisited,[i,j],directionsGroup.pop())
                }else if(space[i][j]===6){
                    isVisited[i][j] = true
                }
            }
        }
        let count = 0
        for(let i=0;i<N;i++){
            for(let j=0;j<M;j++){
                if(!isVisited[i][j]) count++
                isVisited[i][j] = false
            }
        }
        result = Math.min(count,result)
    }
    return result
}

function getAllRotates(type){
    switch(type){
        case 1:
            return [[0],[1],[2],[3]]
        case 2:
            return [[0,2],[1,3]]
        case 3:
            return [[0,1],[1,2],[2,3],[3,0]]
        case 4:
            return [[0,1,2],[1,2,3],[2,3,0],[3,0,1]]
        case 5:
            return [[0,1,2,3]]
    }
}

function createNewDirections(directions, type){
    const rotates = getAllRotates(type)
    const newDirections = []
    for(const rotate of rotates){
        for(const direction of directions){
            newDirections.push([...direction,rotate])
        }
    }
    if(directions.length === 0){
        for(const rotate of rotates){
            newDirections.push([rotate])
        }
    }
    return newDirections
}

function solve(){
    let directions = []
    for(let i=0;i<N;i++){
        for(let j=0;j<M;j++){
            if([1,2,3,4,5].includes(space[i][j])){
                directions = createNewDirections(directions, space[i][j])
            }
        }
    }
    if(directions.length === 0){
        return N*M-space.flat().filter(e=>e===6).length
    }else{
        return getShadowArea(directions)
    }
    
}

console.log(solve())
// 01:19:20 틀렸습니다(10%) -> CCTV 없을 때 예외처리
// 01:20:50 틀렸습니다(10%) -> CCTV 없을 때 추가 예외처리
// 01:26:04 틀렸습니다(10%) -> 3번 CCTV 설정 수정
// 01:29:18 맞았습니다!!