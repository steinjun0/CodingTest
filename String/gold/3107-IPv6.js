let input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()



let fullColonInput = input
let numCount = 0
for (let i of input) {
    if (i === ':')
        numCount++
}

if (numCount < 7) {
    let temp = '::'
    for (let i = 0; i < 7 - numCount; i++) {
        temp += ':'
    }
    fullColonInput = input.replace('::', temp)
}

if (numCount === 8) {
    fullColonInput = input.replace('::', ':')
}

if (numCount === 9) {
    fullColonInput = input.replace('::', '')
}

const arr = fullColonInput.split(':')
const resultArr = arr.map(e => {
    if (e.length < 4) {
        return `${Array(4 - e.length).fill(0).join('')}${e}`
    } else {
        return e
    }
})

console.log(resultArr.join(':').trim())

// 00:18:50 틀렸습니다 (5x%) -> 콜론 개수로 로직 변경(1번 규칙으로만 0을 생략한 경우 고려)
// 00:40:33 틀렸습니다 (53%) -> trim() 추가 -> 틀렸습니다 -> 8개가 안되는 경우가 있다는것 발견 -> 콜론 개수 세는 로직 변경
// 00:47:50 런타임에러(NZEC)(53%)  ->8개가 안되는 경우가 있다는것 발견 -> 8개보다 많아지는 경우 발견
// 01:09:08 맞았습니다 -> 8개 이상의 경우가 존재한다는걸 너무 늦게 확인함