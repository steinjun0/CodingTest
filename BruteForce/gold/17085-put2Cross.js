const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

function createCross(size){
    const cross = Array.from(Array(size*2+1),()=>Array(size*2+1).fill('.'))
    const poses = []
    for(let i=0;i<size*2+1;i++){
        cross[size][i] = '*'
        cross[i][size] = '*'
        if(i===size){
            poses.push([i,size])
        }else{
            poses.push([i,size],[size,i])
        }
    }
    return poses
}

function solve(input){
    const [N,M] = input[0].split(' ').map(Number)
    const space = input.slice(1).map(row=>row.split(''))
    const crosses = []
    for(let size=Math.max(N,M);size>=0;size--){
        const cross = createCross(size)
        for(let i=0;i<N-size+1;i++){
            step: for(let j=0;j<M-size+1;j++){
                for(const pos of cross){
                    const x = pos[0]+i
                    const y = pos[1]+j
                    if(0<=x&&x<N&&0<=y&&y<M){
                        if(space[x][y] === '.'){
                            continue step
                        }
                    }else{
                        continue step
                    }
                }
                crosses.push(new Set(cross.map(pos=>(pos[0]+i)*M+(pos[1]+j))))
            }
        }
    }
    let result = 0
    for(let i=0;i<crosses.length-1;i++){
        smallCrossLoop: for(let j=i;j<crosses.length;j++){
            const bigCross = crosses[i]
            const smallCross = crosses[j]
            for(const cross of bigCross){
                if(smallCross.has(cross)){
                    continue smallCrossLoop
                }
            }
            // if(bigCross.size+smallCross.size > result){
            //     console.table(bigCross)
            //     console.table(smallCross)
            // }
            result = Math.max(result, bigCross.size*smallCross.size)
        }
    }
    return result
}

console.log(solve(input))

// 00:38:38 -> 00:46:50(테스트)(입력 잘못 넣었었음)-> 맞았습니다!