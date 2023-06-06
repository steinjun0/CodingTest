const N = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin':require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
const numbers = Array((10**7)+1).fill(true)
numbers[0] = false
numbers[1] = false
function isPalindrome(num){
    const str = `${num}`
    for(let i=0;i<str.length/2;i++){
        if(str[i] !== str[str.length-i-1]){
            return false
        }
    }
    return true
}

const findRange = Math.sqrt(numbers.length)

for(let i=2;i<numbers.length;i++){
    if(numbers[i]){
        if(i<=findRange){
            if(i>=N && isPalindrome(i)){
                return console.log(i)
            }else{
                numbers[i] = false
            }

            for(let j=2;i*j<numbers.length;j++){
                numbers[i*j] = false
            }
        }
        else{
            if(i<N){
                i=N-1
            }
            else if(numbers[i] && isPalindrome(i)){
                return console.log(i)
            }        
        }
    }
}

// for(let i=N;i<numbers.length;i++){
//     if(numbers[i] && isPalindrome(i)){
//         return console.log(i)
//     }
// }

// 00:17:33 틀렸습니다(99%) -> 0,1 예외처리
// 00:19:00 맞았습니다!(488ms) -> for문 1개로 줄임
// 00:21:45 틀렸습니다(1%) -> for문 2개로 복귀, 연산만 미리함
// 00:23:15 틀렸습니다 -> for문 다시 1개로 합침, 범위 고려
// 00:28:26 맞았습니다!(468ms)