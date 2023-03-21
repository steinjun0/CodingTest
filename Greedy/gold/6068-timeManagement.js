const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

function solve(input){
    const tasks = input
        .slice(1)
        .map(t=>t.split(' ').map(Number))
        .sort((a,b)=>b[1]-a[1])
    
    let time = Infinity
    for(const task of tasks){
        if(time>task[1]){
            time = task[1]
        }
        time -= task[0]
    }
    if(time <0) return -1
    else return time
}

console.log(solve(input))

// 00:15:25 맞았습니다!