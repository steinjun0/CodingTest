const input = require('fs')
    .readFileSync(process.platform === "linux" ? '/dev/stdin' : require('path').resolve(__dirname, '../../../testcase.txt'))
    .toString()
    .trim()
    .split('')
// const input = Array(500000).fill('A')
function isPalindrome(str, len) {
    for (let i = 0; i < len / 2; i++) {
        if (str[len - 1 - i] !== str[i]) {
            return false
        }
    }
    return true
}

function solve(input) {
    // if (Array.from(new Set(input)).length === 1) {
    //     console.log(-1)
    //     return
    // }
    const base = input[0]
    if (input.every((e) => e === base)) {
        console.log(-1)
        return
    }

    // for (let i = input.length; i >= 0; i--) {
    //     if (!isPalindrome(input, i)) {
    //         console.log(i)
    //         return
    //     }
    // }

    if (isPalindrome(input, input.length)) {
        console.log(input.length - 1)
        return
    } else {
        console.log(input.length)
        return
    }
}
solve(input)

// 00:57:19
// slice로 function에 인자를 넘겨서 시간 초과가 계속 발생함