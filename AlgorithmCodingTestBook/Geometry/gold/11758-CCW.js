const [[x1,y1],[x2,y2],[x3,y3]] = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

    const ab = [x2-x1, y2-y1]
const bc = [x3-x2, y3-y2]

function outerproduct(v1,v2){
    return v1[0]*v2[1] - v1[1]*v2[0]
}

const opValue = outerproduct(ab,bc)
if(opValue > 0){
    console.log(1)
}else if(opValue === 0){
    console.log(0)
}else{
    console.log(-1)
}

// 00:07:00 맞았습니다