const [N, numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

for(let i=1;i<N;i++){
    for(let j=0;j<i;j++){
        if(numbers[j] > numbers[i]){
            const temp = numbers[i]
            for(let k=i;k>=j;k--){
                numbers[k] = numbers[k-1]
            }
            numbers[j] = temp
        }
    }
}
const prefix = [0]
for(const num of numbers){
    prefix.push(num+prefix[prefix.length-1])
}
console.log(prefix.reduce((sum,e)=>sum+e))
// 00:13:51