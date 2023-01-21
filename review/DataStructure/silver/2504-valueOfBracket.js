const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../../testcase.txt'))
    .toString()
    .split('')

let stack = []

function validator(str) {
    let s = 0
    let m = 0
    for (e of str) {
        if (e === '(')
            s += 1
        else if (e === '[')
            m += 1
        else if (e === ')')
            s -= 1
        else if (e === ']')
            m -= 1
    }
    if (s == 0 && m == 0) {
        return true
    } else {
        return false
    }
}

function solve() {
    if (!validator(input)) {
        console.log(0)
        return
    }

    for (i in input) {
        if (input[i] === '(') {
            stack.push('(')
        }
        else if (input[i] === '[') {
            stack.push('[')
        }
        else if (input[i] === ')') {
            const pop = stack.pop()
            if (pop === '(') {
                stack.push(2)
            }
            else if (pop === '[') {
                console.log(0)
                return
            }
            else {
                stack.push(pop * 2)
                stack.splice(-2, 1)
            }
            if (typeof stack.at(-2) === 'number') {
                const num = stack.pop()
                if (typeof num !== 'number') {
                    console.log(0)
                    return
                }
                stack[stack.length - 1] += num
            }
        }
        else if (input[i] === ']') {
            const pop = stack.pop()

            if (pop === '[')
                stack.push(3)
            else if (pop === '(') {
                console.log(0)
                return
            }
            else {
                stack.push(pop * 3)
                stack.splice(-2, 1)
            }
            if (typeof stack.at(-2) === 'number') {
                const num = stack.pop()
                if (typeof num !== 'number') {
                    console.log(0)
                    return
                }
                stack[stack.length - 1] += num
            }
        }
        // console.log(stack)
    }

    if (stack.length === 1 && typeof stack[0] === 'number') {
        console.log(stack[0])
    } else {
        console.log(0)
    }
}

solve()

// 01:42:25
// 기존 방식으로 하다가, 다른 방식 참고해서 다시 구현함