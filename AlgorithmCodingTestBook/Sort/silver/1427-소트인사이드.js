const numbers = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('')
    .map(Number)


for(let i=0;i<numbers.length;i++){
    let max = -Infinity
    let maxIndex = -1
    for(let j=i;j<numbers.length;j++){
        if(numbers[j] > max){
            max = numbers[j]
            maxIndex = j
        }
    }
    if(maxIndex === -1){
        break
    }else{
        [numbers[i], numbers[maxIndex]] = [numbers[maxIndex],numbers[i]];
    }
}

console.log(numbers.join(''))
// 00:07:20