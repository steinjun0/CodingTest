const [[N],[sx,sy],...points] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

function outerProduct(v1,v2){
    return v1[0]*v2[1] - v1[1]*v2[0]
}

let result = 0
points.unshift([sx,sy])
points.push([sx,sy])
for(let i=0;i<points.length-1;i++){
    const v1 = [points[i][0], points[i][1]]
    const v2 = [points[i+1][0], points[i+1][1]]
    result += outerProduct(v1,v2)
}
console.log(Math.abs(result/2).toFixed(1))

// 00:09:50 틀렸습니다(2%) -> 선을 긋는 순서대로 좌표를 찍어야함 -> 순서대로 주어짐 -> toFixed 수정
// 00:27:16 틀렸습니다(2%) -> 수동으로 반올림 구현
// 00:52:29 맞았습니다(책 참고)