const [[N], ...times] = require('fs').readFileSync(process.platform === 'linux'?'/dev/stdin' :require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

times.sort((a,b)=>{
    if(a[1] === b[1]){
        return a[0]-b[0]
    }else{
        return a[1]-b[1]
    }
})
let lastTime = -1
let count = 0
for(const [start,end] of times){
    if(start>=lastTime){
        count++
        lastTime = end
    }
}
console.log(count)

// 00:21:50 틀렸습니다(85%) -> lastTime -1로 교체
// 00:23:11 틀렸습니다(85%) -> 시작시간 늦는걸 먼저 정렬
// 00:24:59 틀렸습니다(2%) -> 다시 수정
// 00:26:21 틀렸습니다(85%) -> start,end 끼리 조건 추가
// 00:36:27 틀렸습니다(85%) -> 시작 시간도 정렬
// 00:41:33 맞았습니다!