const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const [N,M,R] = input[0].split(' ').map(Number)
const table = input.slice(1,N+1).map(e=>e.split(' ').map(h=>[h,true]))
const commands = input.slice(N+1).map(e=>e.split(' ').map(e=>{
    if(isNaN(e)) return e
    else return +e-1
}))
let attackCount = 0

// console.table(table)
// console.table(commands)

function getConvertedDirection(string){
    switch(string){
        case 'E':
            return [0,1]
        case 'W':
            return [0,-1]
        case 'N':
            return [-1,0]
        case 'S':
            return [1,0]
    }
        
}

function attack(i,j,dir){
    const height = table[i][j][0]
    for(let len=0;len<height;len++){
        const nx = i+dir[0]*len
        const ny = j+dir[1]*len
        if(nx<0 || nx>= N || ny<0 || ny >= M){
            break
        }
        if(table[nx][ny][1]){
            attackCount++
            table[nx][ny][1] = false
            attack(nx,ny,dir)
        }
        
        
    }
}

function defense(i,j){
    table[i][j][1] = true
}

function solve(){
    // console.table(table)
    for(let round=0;round<R*2;round+=2){
        // attack
        attack(commands[round][0],commands[round][1],getConvertedDirection(commands[round][2]))
        // defense
        defense(...commands[round+1])
    }
    const result = []
    for(const row of table){
        result.push(row.map(e=>e[1]?'S':'F').join(' '))
    }
    const resultStr = [attackCount,...result].join('\n')
    return resultStr

    
}

console.log(solve())

// 00:30:50 맞았습니다!!