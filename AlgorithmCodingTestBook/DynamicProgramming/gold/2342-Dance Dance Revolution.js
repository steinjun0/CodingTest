const sequence = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)
// sequence.length = sequence.length-1
sequence.reverse()

const queue = [[0,0,0],'*']

function getCost(a,b){
    if(a === b) return 1
    else if(a===0) return 2
    else if((a+1)%4 ===  b%4 || (a-1)%4 === b%4) return 3
    else if((a+2)%4 === b%4) return 4
}


function getNextPoses(pose,nextSpot){
    const [x,y,c] = pose
    const left = [nextSpot,y,c+getCost(x,nextSpot)]
    const right = [x,nextSpot,c+getCost(y,nextSpot)]
    if(x === nextSpot){
        return [left]
    }else if(y === nextSpot){
        return [right]
    }else{
        return [left,right]
    }
}

function getBests(poses){
    const score = Array(5*5).fill(Infinity)
    for(const [xt,yt,c] of poses){
        const x = Math.max(xt,yt)
        const y = Math.min(xt,yt)
        if(score[x*5+y] > c){
            score[x*5+y] = c
        }
    }
    const result = []
    for(let x=0;x<=4;x++){
        for(let y=0;y<=4;y++){
            if(score[x*5+y] !== Infinity){
                result.push([x,y,score[x*5+y]])
            }
        }
    }
    return result
}


let nextSpot = sequence.pop()
let tempStore = []
while(sequence.length > 0){
    // console.log(nextSpot)
    // console.table(queue)
    const pose = queue.shift()
    if(pose === '*'){
        nextSpot = sequence.pop()
        queue.push(...getBests(tempStore))
        tempStore = []
        queue.push('*')
    }else{
        const [x,y,c] = pose
        const nextPoses = getNextPoses(pose, nextSpot)
        // console.table(nextPoses)
        tempStore.push(...nextPoses)
    }
}
// console.table(queue)
queue.pop()
let result = Infinity
for(const pose of queue){
    if(result > pose[2]){
        result = pose[2]
    }
}
console.log(result)

// 00:43:10 틀렸습니다 -> 같은 곳에 발 모이는 것 방지
// 00:48:40 틀렸습니다 -> getCost 함수 버그 수정
// 00:56:50 맞았습니다