const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

class Heap {
    constructor() {

        this.heap = [null]
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }



    getSize() {
        return this.heap.length
    }
}

class MinHeap extends Heap {
    constructor() {
        super()
    }

    getMinimum() {
        if (this.heap[1] === undefined)
            return null
        else
            return this.heap[1]
    }

    heapPush(element) {
        this.heap.push(element)
        let curIdx = this.heap.length - 1
        let parIdx = (curIdx / 2) | 0

        while (curIdx > 1 && this.heap[curIdx] < this.heap[parIdx]) {
            this.swap(curIdx, parIdx)
            curIdx = parIdx
            parIdx = (curIdx / 2) | 0
        }
    }

    heapPop() {
        if (this.heap.length === 1) {
            return null
        }

        const min = this.heap[1]

        if (this.heap.length === 2) {
            this.heap = [null]
            return min
        }
        else this.heap[1] = this.heap.pop()

        let curIdx = 1
        let leftIdx = 2
        let rightIdx = 3

        if (this.heap[rightIdx] === null) {
            if (this.heap[curIdx] > this.heap[leftIdx])
                this.swap(curIdx, leftIdx)
        } else {
            while (this.heap[curIdx] > this.heap[leftIdx] || this.heap[curIdx] > this.heap[rightIdx]) {
                const minIdx = this.heap[leftIdx] > this.heap[rightIdx] ? rightIdx : leftIdx
                this.swap(curIdx, minIdx)

                curIdx = minIdx
                leftIdx = minIdx * 2
                rightIdx = minIdx * 2 + 1
            }
        }
        return min

    }
}

class MaxHeap extends Heap {
    constructor() {
        super()
    }

    getMaximum() {
        if (this.heap[1] === undefined)
            return null
        else
            return this.heap[1]
    }

    heapPush(element) {
        this.heap.push(element)
        let curIdx = this.heap.length - 1
        let parIdx = (curIdx / 2) | 0

        while (curIdx > 1 && this.heap[curIdx] > this.heap[parIdx]) {
            this.swap(curIdx, parIdx)
            curIdx = parIdx
            parIdx = (curIdx / 2) | 0
        }
    }

    heapPop() {
        if (this.heap.length === 1) {
            return null
        }

        const max = this.heap[1]

        if (this.heap.length === 2) {
            this.heap = [null]
            return max
        }
        else this.heap[1] = this.heap.pop()

        let curIdx = 1
        let leftIdx = 2
        let rightIdx = 3

        if (this.heap[rightIdx] === null) {
            if (this.heap[curIdx] > this.heap[leftIdx])
                this.swap(curIdx, leftIdx)
        } else {
            while (this.heap[curIdx] < this.heap[leftIdx] || this.heap[curIdx] < this.heap[rightIdx]) {
                const maxIdx = this.heap[leftIdx] < this.heap[rightIdx] ? rightIdx : leftIdx
                this.swap(curIdx, maxIdx)

                curIdx = maxIdx
                leftIdx = maxIdx * 2
                rightIdx = maxIdx * 2 + 1
            }
        }
        return max

    }
}




function solve(N, startIndex, endIndex) {
    const minHeap = new MinHeap()
    const maxHeap = new MaxHeap()
    const countChecker = {}
    for (let i = startIndex; i <= endIndex; i++) {
        const query = [input[i].split(' ')[0], +input[i].split(' ')[1]]
        // console.log(query)
        if (query[0] === 'I') {
            minHeap.heapPush(query[1])
            maxHeap.heapPush(query[1])

            if (countChecker[query[1]] === undefined)
                countChecker[query[1]] = 1
            else
                countChecker[query[1]] += 1
        } else if (query[0] === 'D') {

            let popElement
            if (query[1] === 1) {
                popElement = maxHeap.heapPop()
                while (maxHeap.getSize() > 1 && countChecker[popElement] === undefined) {
                    popElement = maxHeap.heapPop()
                }
            }
            else if (query[1] === -1) {
                popElement = minHeap.heapPop()
                while (minHeap.getSize() > 1 && countChecker[popElement] === undefined) {
                    popElement = minHeap.heapPop()
                }
            }
            if (countChecker[popElement] !== undefined) {
                countChecker[popElement] -= 1
                if (countChecker[popElement] === 0)
                    delete countChecker[popElement]
            }
        }
        // console.log(maxHeap.heap)
    }

    let resMax
    let resMin
    // console.log(countChecker)
    let tempMax = null

    while (!(countChecker[tempMax] >= 1)) {
        tempMax = maxHeap.heapPop()
        if (tempMax === null)
            break
    }
    resMax = tempMax

    let tempMin
    tempMin = null

    while (!(countChecker[tempMin] >= 1)) {
        tempMin = minHeap.heapPop()
        if (tempMin === null)
            break
    }
    resMin = tempMin

    if (resMax === null || resMin === null)
        return `EMPTY`
    else
        return `${resMax} ${resMin}`
    // console.log('`${resMax} ${resMin}`', `${resMax} ${resMin}`)

}

const T = +input[0]

let startIndex = 1
res = []
for (let i = 0; i < T; i++) {
    const N = +input[startIndex]
    // console.log(solve(N, startIndex + 1, startIndex + N))
    res.push(solve(N, startIndex + 1, startIndex + N))
    startIndex = startIndex + N + 1
}
console.log(res.join('\n'))

// 01:08:30 틀렸습니다(3%) -> heap 수정
// 01:43:00 메모리 초과(13%) -> 모아서 출력하는 것 나눠서 출력으로 변경
// 01:45:00 

