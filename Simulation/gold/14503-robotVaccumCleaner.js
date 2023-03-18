const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const directions = [[-1,0],[0,1],[1,0],[0,-1]]

function detectDust(room,pos){
    for(const direction of directions){
        const nx = pos[0]+direction[0]
        const ny = pos[1]+direction[1]
        if(0<=nx&&nx<room.length&&0<=ny&&ny<room[0].length){
            if(room[nx][ny] === 0){
                return true
            }
        }
    }
    return false
}

function solve(input){
    const [N,M]= input[0].split(' ').map(Number)
    const robot = input[1].split(' ').map(Number)
    const room = input.slice(2).map(row=>row.split(' ').map(Number))

    let result = 0
    while(true){
        if(room[robot[0]][robot[1]] === 0){
            room[robot[0]][robot[1]] = 2
            result++
        }
        if(!detectDust(room, robot)){
            const backDirection = directions[robot[2]].map(e=>-1*e)
            const nx = robot[0]+backDirection[0]
            const ny = robot[1]+backDirection[1]
            if(0<=nx&&nx<N&&0<=ny&&ny<M&&room[nx][ny]!==1){
                robot[0]=nx
                robot[1]=ny
                continue
            }else{
                return result
            }
        }else{
            robot[2]-=1
            if(robot[2]===-1) robot[2] = 3
            const nx = robot[0]+directions[robot[2]][0]
            const ny = robot[1]+directions[robot[2]][1]
            if(0<=nx&&nx<N&&0<=ny&&ny<M&&room[nx][ny]===0){
                robot[0] = nx
                robot[1] = ny
                continue
            }
        }
    }

}

console.log(solve(input))

// 00:23:40 맞았습니다!