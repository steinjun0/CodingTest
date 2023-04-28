const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const C = +input[0]
let count = 0
const result = []
while(count<C){
    const players = input.slice(1+11*count,12+11*count).map(row=>row.split(' ').map(Number))
    result.push(solve(players))
    count++
}
console.log(result.join('\n'))

function solve(playersInput){
    const players = Array.from(Array(11),()=>[])
    for(let i=0;i<11;i++){
        for(let j=0;j<11;j++){
            if(playersInput[i][j] !== 0){
                players[i].push([i,j,playersInput[i][j]])
            }
        }
    }
    
    // console.table(players)

    const queue = [...players[0].map(e=>[e[0],new Set([e[1]]),e[2]])]
    let max = 0 
    while(queue.length > 0){
        const player = queue.pop()
        // console.log(player)
        const [id,history,result] = player
        if(id === 10){
            max = Math.max(max,result)
        }else{
            for(const nextPlayer of playersInput[id+1]){
                const [nid,npos,nvalue] = nextPlayer
                if(!history.has(npos)){
                    const nhistory = new Set(history)
                    nhistory.add(npos)
                    queue.push([nid, nhistory,result+nvalue])
                }
            }
        }
    }
    return max
}
// 00:32:59 틀렸습니다(12%) -> 00:53:31 다시 -> 01:05:00 다시
// 01:20:50 맞았습니다