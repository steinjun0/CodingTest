const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const directions = [[0,1],[0,-1],[-1,0],[1,0]]

function getBottomIndex(bottomIndex,rightIndex,upperIndex, command){
    switch(command){
        case 0: return [rightIndex,5-bottomIndex, upperIndex]
        case 1: return [5-rightIndex,bottomIndex, upperIndex]
        case 2: return [upperIndex, rightIndex, 5-bottomIndex]
        case 3: return [5-upperIndex,rightIndex, bottomIndex]
    }
}
function solve(input){
    const [N, M, x, y, K] = input[0].split(' ').map(Number)
    const space = input.slice(1,N+1).map(row=>row.split(' ').map(Number))
    const commands = input[N+1].split(' ').map(e=>+e-1)
    
    const pos = [x,y]
    const dice = [0,0,0,0,0,0]
    let bottomIndex = 5
    let rightIndex = 2
    let upperIndex = 1
    const result = []
    for(const command of commands){
        const direction = directions[command]
        const nx = pos[0]+direction[0]
        const ny = pos[1]+direction[1]
    
        if(0<=nx&&nx<N&&0<=ny&&ny<M){
            pos[0]=nx;pos[1]=ny;
            [bottomIndex,rightIndex,upperIndex] = getBottomIndex(bottomIndex,rightIndex,upperIndex, command)
            if(space[nx][ny] === 0){
                space[nx][ny] = dice[bottomIndex]
            }else{
                dice[bottomIndex] = space[nx][ny]
                space[nx][ny] = 0
            }
            result.push(dice[5-bottomIndex])
        }
    }

    return result.join('\n')
}

console.log(solve(input))

// 00:45:19 틀렸습니다 -> 마지막 예제 한글자 틀린 부분 발견 -> 문제 조건 못읽은 부분 추가..
// 01:05:45 맞았습니다!