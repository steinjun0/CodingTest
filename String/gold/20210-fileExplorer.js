const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const strings = input.slice(1).sort()

function checkComparable(inputString1, inputString2) {
    const [string1, string2] = getCoreString(inputString1, inputString2)
    if (string1 === string2) {
        return false
    }
    for (let i = 0; i < Math.min(string1.length, string2.length); i++) {
        if (string1[i] !== string2[i]) {
            if (!isNaN(string1[i]) && !isNaN(string2[i]))
                return true
            else
                return false
        } else {
            if (!isNaN(string1[i]) && !isNaN(string2[i]))
                return true
        }
    }
    return false
}

function removeFirstZero(string) {
    let result = string[0] === '0' ? '' : `${string[0]}`
    let removeNum = 0
    for (let i = 1; i < string.length; i++) {
        if (string[i] === '0') {
            if (!isNaN(result[result.length - 1])) {
                result += string[i]
            } else {
                if (i < string.length - 1 && isNaN(string[i + 1])) { // 마지막 한 자리 0
                    result += string[i]
                } else {
                    removeNum += 1
                }
            }
        } else {
            result += string[i]
        }
    }
    return [result, removeNum]
}

function getFirstNumber(string) {
    let result = ''
    let isNumberStart = false
    for (let i = 0; i < string.length; i++) {
        if (!isNaN(string[i])) {
            isNumberStart = true
            result += string[i]
        }
        else {
            if (isNumberStart)
                break
        }
    }

    return result
}

function getCoreString(string1, string2) {
    let coreString1 = '', coreString2 = ''
    // console.log(string1, string2)
    for (let i = 0; i < Math.min(string1.length, string2.length); i++) {
        // console.log(string1[i], string2[i])
        if (string1[i] !== string2[i]) {
            let sliceStart = i
            if (!isNaN(string1[i]) || !isNaN(string2[i])) {
                sliceStart = 0
                for (j = i - 1; j >= 0; j--) {
                    if (isNaN(string1[j]) && isNaN(string2[j])) {
                        sliceStart = j
                        break
                    }
                }
            }

            coreString1 += string1.slice(sliceStart)
            coreString2 += string2.slice(sliceStart)
            break
        }

    }
    return [coreString1, coreString2]
}

function getPirorString(string1, string2) {

    const [coreString1, coreString2] = getCoreString(string1, string2)
    // console.log(coreString1, coreString2)

    const [rString1, removeNum1] = removeFirstZero(coreString1)
    const [rString2, removeNum2] = removeFirstZero(coreString2)
    // console.log('rString1', rString1, 'rString2', rString2)
    const number1 = getFirstNumber(rString1)
    const number2 = getFirstNumber(rString2)

    if (number1.length < number2.length) {
        return 1
    }
    else if (number1.length > number2.length) {
        return -1
    }
    else { //같을 때
        for (let i = 0; i < number1.length; i++) {
            if (+number1[i] > +number2[i]) {
                return -1
            } else if (+number1[i] < +number2[i]) {
                return 1
            }
        }

        if (removeNum1 > removeNum2) {
            return -1
        } else if (removeNum1 < removeNum2) {
            return 1
        } else { // 0개수 까지 같을 때

        }
    }
}

function solve(N, strings) {
    // console.log(strings)
    strings.sort((next, present) => {
        // console.log(present, next, checkComparable(present, next))
        if (checkComparable(present, next)) {
            // console.log(getPirorString(present, next) === 1 ? present : next)
            return getPirorString(present, next)
        }
        else {
            return present - next
        }
    })
    return strings.join('\n')
}

console.log(solve(N, strings))

// 01:15:00 틀렸습니다 (2%) -> 숫자 같고 뒤가 다른 경우 고려위해서, 앞의 같은 부분은 잘라냄
// 01:29:40 틀렸습니다 (2%) -> checkCompareable시 coreString만 비교
// 02:01:00 틀렸습니다 (2%) -> 포기