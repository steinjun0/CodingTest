const [[N],...combs] = require('fs').readFileSync(process.platform === 'linux' ?'/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(BigInt))

if(N === 1){
    return console.log(1)
}

function getGCD(a,b){
    let big = null
    let small = null
    if(a>b){
        big = a
        small = b
    }else{
        big = b
        small = a
    }
    
    let temp = big%small
    do{
        if(temp === 0n){
            return small
        }else{
            big = small
            small = temp
            temp = big%small
        }
    }while(true)
}

// console.log(getGCD(16677181699666568,1853020188851841))

const ratios = Array(Number(N)).fill(0)
let gain = 1n
for(const [a,b,p,q] of combs){
    gain *= p*q
}
// console.log(gain)
let isInit = true
for(const [a,b,pIn,qIn] of combs){
    const temp = getGCD(pIn,qIn)
    const p = pIn/temp
    const q = qIn/temp
    if(ratios[a] === 0 && ratios[b] === 0){
        if(isInit){
            ratios[a] = gain/q
            ratios[b] = gain/p
            isInit = false
        }else{
            combs.push([a,b,p,q])
        }
    }else{
        if(ratios[a]){
            ratios[b] = ratios[a]*q/p
        }else{
            ratios[a] = ratios[b]*p/q
        }
    }
}
let lastGcd = ratios[0]
// console.log(ratios)
for(const ratio of ratios){
    lastGcd = getGCD(lastGcd,ratio)
}
// console.log(lastGcd)
console.log(ratios.map(e=>e/lastGcd).join(' '))

// 00:49:22 틀렸습니다(7%) -> N=1일때 예외처리
// 00:50:35 틀렸습니다(7%) -> lastGcd 초기값 변경
// 00:55:11 틀렸습니다(7%) -> p===q 일 때 예외처리
// 00:57:01 틀렸습니다(7%) -> 나눠지는 비율 미리 계산
// 01:08:09 틀렸습니다(7%) -> 숫자 자료형 초과
// 01:17:51 메모리초과(19%) -> bigInt 자료형으로 배열 초기화
// 01:19:52 메모리초과(19%) -> 탈출 못하는 상황 발견 -> queue로 변경
// 01:22:38 시간초과(19%) -> 초기 정렬 변경
// 01:28:54 런타임에러 -> 오류 발견
// 01:34:27 맞았습니다!