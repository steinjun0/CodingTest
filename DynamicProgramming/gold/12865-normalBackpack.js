const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const [N,K] = input[0].split(' ').map(Number)

const thingsArr = input.slice(1).map(e=>e.split(' ').map(Number))

const dp = Array.from(Array(K+1),()=>[0,new Set()])
for(let i=1;i<=K;i++){
    dp[i][0] = dp[i-1][0]
    dp[i][1] = new Set(dp[i-1][1])
    for(let j=0;j<thingsArr.length;j++){
        const [W,V] = thingsArr[j]
        if(i-W >=0 && !dp[i-W][1].has(j)){
            if(dp[i-W][0] + V > dp[i][0]){
                dp[i][0] = dp[i-W][0] + V
                dp[i][1] = new Set(dp[i-W][1])
                dp[i][1].add(j)
            }
            else if(dp[i-W][0] + V === dp[i][0]){
                let oldValue = 0
                for(const index of dp[i-W][1]){
                    const [oV, oW] = thingsArr[index]
                    oldValue += oV/oW
                }

                let newValue = 0
                for(const index of dp[i-W][1]){
                    const [nV, nW] = thingsArr[index]
                    newValue += nV/nW
                }

                if(oldValue > newValue){
                    dp[i][0] = dp[i-W][0] + V
                    dp[i][1] = new Set(dp[i-W][1])
                    dp[i][1].add(j)
                }
            }
        }
    }
}
// console.table(dp)
console.log(dp[K][0])
// 00:15:55 틀렸습니다 -> dp 최대값으로 변경
// 00:16:43 틀렸습니다 -> 중복 처리 부분 실수 수정
// 00:20:48 틀렸습니다 -> V=0은 제외
// 00:38:38 틀렸습니다 -> 물건 중복 사용 못하게 코드 수정
// 01:17:50 틀렸습니다 -> 최대값 누적해서 들고 가도록 수정
// 01:23:19 틀렸습니다(16%) -> 물건을 최대한 적게 들고 가도록 수정
// 01:28:50 틀렸습니다(22%) -> 중복되는 조합 기억하도록 수정
// 01:37:10 메모리초과 -> 롤백 -> 가치합이 같으면, 각각의 가치합 비율의 합이 크면 수정
// 01:49:30 틀렸습니다(22%)
// 포기