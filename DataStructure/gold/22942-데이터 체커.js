const [[N],...circles] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(e=>e.split(' ').map(Number))

function solve(N,circles){
    const axis = Array(2020001).fill(null)
    for(let i=0;i<N;i++){
        const [x,r] = [circles[i][0]+1000000, circles[i][1]]
        if(axis[x-r] !== null || axis[x+r] !== null){
            return 'NO'
        }
        axis[x-r] = axis[x+r] = i
    }

    const stack = []
    const set = new Set()
    for(const point of axis){
        if(point !== null){
            if(!set.has(point)){
                stack.push(point)
                set.add(point)    
            }else{
                if(stack[stack.length -1] === point){
                    stack.pop()
                    set.delete(point)
                }else{
                    return 'NO'
                }
            }
        }
    }
    return 'YES'
}

console.log(solve(N,circles))

// 00:22:24 맞았습니다!