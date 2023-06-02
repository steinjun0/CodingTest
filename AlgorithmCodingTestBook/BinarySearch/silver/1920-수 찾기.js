const [[N],numbers,[M],questions] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

numbers.sort((a,b)=>a-b)

function find(value){
    let left = 0
    let right = numbers.length-1
    let mid = Math.floor((left+right)/2)
    while(left<right-1){
        if(numbers[mid] > value){
            right = mid
        }else if(numbers[mid]<value){
            left = mid
        }else{
            return 1
        }
        mid = Math.floor((left+right)/2)
    }
    if(numbers[left] === value || numbers[right] === value){
        return 1
    }else{
        return 0
    }
}

const result = []

for(const q of questions){
    result.push(find(q))
}

console.log(result.join('\n'))

// 00:07:47 틀렸습니다(5%) -> 정렬 실수
// 00:09:27 맞았습니다!