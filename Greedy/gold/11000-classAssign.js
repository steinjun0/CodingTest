function solve(input) {
    const N = input[0]
    const timeTable = []
    for (const time of input.slice(1)
        .sort((a, b) => {
            if (a[0] != b[0])
                return a[0] - b[0]
            else
                return b[1] - a[1]
        })) {
        if (timeTable[time[0]] === undefined)
            timeTable[time[0]] = []
        timeTable[time[0]].push(time[1])
    }

    let start = Reflect.ownKeys(timeTable)[0]
    let end = 0
    let step = 1
    let result = 1

    end = timeTable[start].shift()
    step++
    if (timeTable[start].length === 0) {
        Reflect.deleteProperty(timeTable, start)
    }

    if (timeTable[end] !== undefined) {
        start = end
        end = 0
    } else {
        for (const e in timeTable) {
            if (+e >= end) {
                start = +e
                end = 0
                break
            }
        }
    }
    console.log(0, process.memoryUsage())

    do {
        console.log(1, process.memoryUsage())
        if (end !== 0) {
            result += 1
            end = 0
            if (Object.keys(timeTable).length !== 0)
                start = Object.keys(timeTable)[0]
        }
        console.log(2, process.memoryUsage())

        end = timeTable[start].shift()
        step++
        if (timeTable[start].length === 0) {
            Reflect.deleteProperty(timeTable, start)
        }
        console.log(3, process.memoryUsage())

        if (timeTable[end] !== undefined) {
            start = end
            end = 0
        } else {
            for (const e in timeTable) {
                if (+e >= end) {
                    start = +e
                    end = 0
                    break
                }
            }
        }
        console.log(4, process.memoryUsage())

    } while (step <= N)
    return result;
}

const filePath =
    process.platform === "linux" ? "/dev/stdin" : "/Users/seogjun-yeong/Desktop/Programming/CodingTest/testcase.txt";
const input = require("fs")
    .readFileSync(filePath)
    .toString()
    .trim()
    .split("\n")
    .map((row) => row.split(" ").map((num) => +num))


console.log(
    solve(input)
);

// 57:30 (4%)메모리 초과 -> times 변수 제거
// 01:00:03 (4%)메모리 초과
// 01:26:05 포기