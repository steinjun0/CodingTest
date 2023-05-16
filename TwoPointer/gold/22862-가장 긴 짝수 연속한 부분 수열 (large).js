const [[N,K],seq] = require('fs').readFileSync(process.platform === 'linux' ?'/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

let max = 0
let count = 0 
let rightPointer = -1
let delLimit = K
for(let i=0;i<seq.length;i++){
    if(i>0){
        if(seq[i-1]%2 !== 0) {
            delLimit++
        }else{
            count--
        }
    }
    let j=rightPointer+1
    for(;j<seq.length;j++){
        if(seq[j]%2 !== 0){
            if(delLimit === 0){
                break
            }else{
                delLimit--
            }
        }else{
            count++
        }
    }
    rightPointer = j-1

    if(max<count) max=count
}
console.log(max)
// 00:19:55 맞았습니다!(512ms) -> j제거
// 00:25:12 맞았습니다!(624ms) -> ??? -> 롤백