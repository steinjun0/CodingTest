const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin':require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .slice(1)
    .map(Number)

function solve(numbers){
    // [이전 값이 그 전값과 곱해진경우(이전값 사용x), 이전 값이 그 전값과 더해진 경우(이전값 사용o)]
    const positives = numbers.filter(e=>e>0).sort((a,b)=>b-a)
    const negatives = numbers.filter(e=>e<0).sort((a,b)=>a-b)
    const isHasZero = numbers.indexOf(0) === -1 ? false :true
    let positiveProdSum = 0
    for(let i=1;i<positives.length;i+=2){
        if(positives[i-1]===1 || positives[i]===1)
            positiveProdSum += positives[i-1]+positives[i]
        else{
            positiveProdSum += positives[i-1]*positives[i]
        }
    }

    let negativeProdSum = 0
    for(let i=1;i<negatives.length;i+=2){
        negativeProdSum += negatives[i-1]*negatives[i]
    }


    if(positives.length%2===1){
        positiveProdSum+=positives[positives.length-1]
    }

    if(negatives.length%2===1){
        if(isHasZero){
            // pass
            // prod with zero
        }else{
            negativeProdSum += negatives[negatives.length-1]
        }
    }

    return positiveProdSum+negativeProdSum


}

console.log(solve(input))
// 00:42:46 순서 상관 없는거 이제 암
// 00:55:25 맞았습니다!