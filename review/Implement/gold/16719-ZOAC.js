function findNextSpell(str) {
    const spell = [...str].filter(e => e !== null).sort()[0]
    return [spell, str.indexOf(spell)]
}

function solve(input) {
    const origin = [...input]
    const output = Array(input.length).fill(null)
    result = []

    let index = 0
    let lastoutput = null
    while ((output.indexOf(null) !== -1)) {
        if (findNextSpell(origin.slice(index))[1] !== -1) {
            const [spell, nextIndex] = findNextSpell(origin.slice(index))
            output[nextIndex + index] = spell
            origin[nextIndex + index] = null
            index = nextIndex + index + 1
        } else {
            let startIndex = null
            for (let i = index - 1; i >= 0; i--) {
                if (origin[i] === null) {
                    startIndex = i
                    break
                }
            }
            if (startIndex === null) {
                index = 0
            } else {
                index = startIndex
            }
        }
        if (lastoutput !== output.join('')) {
            lastoutput = output.join('').trim()
            result.push(output.join('').trim())
        }
    }
    // return result
    console.log(result.join('\n'))
}

// 00:52:37 틀렸습니다 -> 되돌아가는 로직 수정
// 01:00:02 틀렸습니다 -> 테스트용 변수 제거 및 index===0 예외처리
// 01:05:00 틀렸습니다 -> 되돌아가는 로직 수정 및 테스트 코드 작성
// 01:29:00 틀렸습니다 -> bruteforce로 변경
// 01:47:00 맞았습니다.

const temp = ['ABCDE', 'CDASES', 'ZOAC',
    'BAC', 'STARTLINK', 'AAA',
    'ACDSADC', 'BDCCV', 'A', 'Z',
    'ABBBCCCBBBA', 'ABAB', 'ASNDKK', 'VKDNASBABCAKCKEOOABCAK']
// const temp = ['CDASES']
temp.forEach(e => {
    // console.log(e)
    console.log(JSON.stringify(solve(e.split(''))) === JSON.stringify(solve2(e.split(''))))
    // console.log(solve(e.split('')))
    // console.log(solve2(e.split('')))
    // console.log('')
})


function solve2(input) {
    const origin = [...input]
    const output = Array(input.length).fill(null)
    result = []

    while ((output.indexOf(null) !== -1)) {
        const tempList = []
        for (let i = 0; i < origin.length; i++) {
            const spell = origin[i]
            if (spell !== null) {
                const temp = [...output]
                temp[i] = spell
                tempList.push([temp.join(''), i, spell])
            }
        }
        const next = tempList.sort()[0]
        result.push(next[0])
        output[next[1]] = next[2]
        origin[next[1]] = null
    }
    return result
}

