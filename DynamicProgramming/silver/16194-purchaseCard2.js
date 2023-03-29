const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const N = +input[0]
const cards = input[1].split(' ').map(Number)
for(let i=1;i<N;i++){
    for(let j=0;j<=i;j++){
        cards[i] = Math.min((cards[i-j-1]??0)+cards[j],cards[i])
    }
}
console.log(cards[N-1])
// 00:06:25 맞았습니다!(188ms) -> 복사 과정 제거
// 00:08:15 맞았습니다!(188ms) -> 진짜 복사 완전 제거
// 00:13:30 틀렸습니다(35%) -> i 1번째부터 시작. + j 조건식 변경
// 00:22:14 틀렸습니다(35%) -> j 0번째부터 시작
// 00:23:10 맞았습니다!(188ms) 더 안내려가네...