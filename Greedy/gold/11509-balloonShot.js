const input = [];

const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let count = 0
rl.on('line',
    function (line) {
        input.push(line.trim());
        count++
        if (count == 2) {
            rl.close()
        }

    })
    .on('close',
        function () {
            const N = +input[0]
            const ballsInput = input[1].split(' ').map(Number)
            console.log(solve(N, ballsInput))
        });


function solve(N, ballsInput) {
    const heightSet = {}

    for (let i = 0; i < ballsInput.length; i++) {
        if (heightSet[ballsInput[i]] === undefined)
            heightSet[ballsInput[i]] = [i]
        else {
            heightSet[ballsInput[i]].push(i)
        }
    }
    let leftBallonIndexArr = Array(N).fill(true)

    let index = 0
    let arrows = 1
    while (true) {
        leftBallonIndexArr[index] = false
        const height = ballsInput[index]
        // console.log(heightSet, leftBallonIndexArr, arrows)
        if (heightSet[height - 1] === undefined) {
            const nextIndex = leftBallonIndexArr.indexOf(true)
            if (nextIndex === -1) {
                break
            } else {
                index = nextIndex
                arrows += 1
            }
        } else {
            let changed = false
            for (let i of heightSet[height - 1]) {
                if (i > index && leftBallonIndexArr[i]) {
                    index = i
                    changed = true
                    break
                }
            }

            if (!changed) {
                const nextIndex = leftBallonIndexArr.indexOf(true)
                if (nextIndex === -1) {
                    break
                } else {
                    index = nextIndex
                    arrows += 1
                }
            }

        }

    }

    return arrows
}



// 00:12:10 런타임에러(x%) permission denied ??? -> readline으로 변경하느라 일시정지 -> set으로 변경
// 01:05:00 틀렸습니다(2%) -> 로직 좀더 다듬음
// 01:10:20 틀렸습니다(2%) -> 반례 찾음 5/5 4 5 4 5 -> 반례 해결
// 01:15:10 맞았습니다!