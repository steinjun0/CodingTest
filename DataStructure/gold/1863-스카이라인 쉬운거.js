const [[N],...points] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const skyline = Array(N).fill(0)

let count = 0
for(let i=0;i<N;i++){
    const [__,py] = points[i-1] ?? [0,0]
    const [_,y] = points[i]
    const [___,ny] = points[i+1] ?? [0,0]
    if(py< y && y > ny){
        count++
        skyline[i] = count
    }
}

let heights = {}
for(let i=0;i<N;i++){
    const [_,y] = points[i]
    if(skyline[i] === 0 && y !== 0 && !heights[y]){
        heights[y] = ++count
    }
    // skyline보다 높은 height들 전부 제거
    for(const height of Object.keys(heights)){
        if(height > y) delete heights[height]
    }
}
console.log(count)

// 00:43:22 런타임에러 -> 테스트 코드 제거
// 00:44:04 메모리초과(7%) -> 1차원 배열로 교체 
// 00:48:26 틀렸습니다(7%) -> 바운더리 케이스 로직 수정
// 00:53:54 틀렸습니다(7%) -> 가로 빌딩 로직 변경
// 01:05:50 메모리초과(7%) -> 배열=> 객체로 변경
// 01:08:34 맞았습니다!(228ms) -> skyline 대입연산 제거
// 01;11:38 맞았습니다!(232ms) -> 끝

// for(let i=0;i<N;i++){
//     const [_,y] = points[i]

//     if(skyline[i] === 0 && y>0&&height===0){
//         height = y
//         skyline[i] = count
//     }

//     if(y >= height){
//         skyline[i] = count
//     }else{
//         count++
//         height = y
//         if(y !== 0){
//             skyline[i] = count
//         }
//     }
// }

// for(let i=0;i<N;i++){
//     const [_,y] = points[i]

//     if(skyline[i] === 0 && y>0&&height===0){
//         height = y
//     }

//     if(y < height){
//         count++
//         height = y
//     }
// }