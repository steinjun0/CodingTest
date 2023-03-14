const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const gears = input.slice(0,4).map(e=>e.split('').map(Number))
const K = +input[4]
const sequences = input.slice(5).map(e=>e.split(' ').map(Number))


function checkMagnetic(gears, isConnected){
    isConnected[0] = gears[0][2] !== gears[1][6]
    isConnected[1] = gears[1][2] !== gears[2][6]
    isConnected[2] = gears[2][2] !== gears[3][6] 
}

function rotateGear(command, gears, isConnected, isVisited){
    isVisited[command[0]] = true
    if(command[1]===1){
        const tail = gears[command[0]].pop()
        gears[command[0]].unshift(tail)
    }else{
        const head = gears[command[0]].shift()
        gears[command[0]].push(head)
    }
    
    if(command[0]-1>=0 &&!isVisited[command[0]-1]&& isConnected[command[0]-1]){
        rotateGear([command[0]-1,command[1]*-1],gears,isConnected,isVisited)
    }
    if(command[0]+1<=3 && !isVisited[command[0]+1]&&isConnected[command[0]]){
        rotateGear([command[0]+1,command[1]*-1],gears,isConnected,isVisited)
    }

}

function calculate(gears){
    let result = 0
    if(gears[0][0] === 1){
        result += 1
    }
    if(gears[1][0] === 1){
        result += 2
    }
    if(gears[2][0] === 1){
        result += 4
    }
    if(gears[3][0] === 1){
        result += 8
    }
    return result
}

function solve(gears,K,sequences){
    const isConnected = [false,false,false]
    for(const command of sequences){
        checkMagnetic(gears, isConnected)
        rotateGear([command[0]-1,command[1]],gears,isConnected,[false,false,false,false])
    }
    return calculate(gears)
}

console.log(solve(gears,K,sequences))

// 00:36:57 맞았습니다!!