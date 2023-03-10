const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' :require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const [N,K] = input[0].split(' ').map(Number)
const ponds = input[1].split(' ').map(Number).sort((a,b)=>a-b)

const rests = ponds.reduce((sum,e,i)=>{
    if(i<ponds.length-1) {
        if((ponds[i+1]-e)%2===1){
            if(Math.floor((ponds[i+1]-e)/2) !== 0){
                sum.push(Math.floor((ponds[i+1]-e)/2))
                sum.push(Math.floor((ponds[i+1]-e)/2))
            }
        }else{
            if((ponds[i+1]-e)/2 > 0) sum.push((ponds[i+1]-e)/2)
            if(((ponds[i+1]-e)/2)-1 > 0) sum.push(((ponds[i+1]-e)/2)-1)
        }
        
        return sum
    }else{
        sum.push(Infinity)
        return sum
    }
},[Infinity])

rests.sort((a,b)=>b-a)


let step = 1
let rIndex = 0
let result = 0
for(let i=0;i<K;i++){
    if(rIndex > (rests.length-1) || rests[rIndex] === 0){
        rIndex = 0
        step+=1
    }
    rests[rIndex]-=1
    rIndex += 1
    result += step
    // console.table(rests)
}

console.log(result)

// 00:58:45 틀렸습니다(80%) -> 조건식 오타 발견
// 01:04:10 틀렸습니다(80%) -> 조건식들 안전하게 변경 -> undefined 발생 안하게 수정
// 01:15:40 틀렸습니다(80%) -> 질문글 확인 후 range 변경(집의 위치는 범위 무제한)
// 01:19:03 맞았습니다!! 문제가 좀 불친절하지 않았나... 어쨌든 범위를 똑바로 읽자.