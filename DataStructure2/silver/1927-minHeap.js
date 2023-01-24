const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

// const input = [1, 800000, ...Array(500000).fill(0).map((_, i) => `I ${i}`), ...Array(300000).fill(0).map((_, i) => `D ${i % 2 === 1 ? 1 : -1}`)]

class MinHeap {
    constructor() {
        this.heap = [null]
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }

    heapPush(element) {
        this.heap.push(element)
        let curIdx = this.heap.length - 1
        let parIdx = curIdx / 2 | 0

        while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
            this.swap(parIdx, curIdx)
            curIdx = parIdx
            parIdx = curIdx / 2 | 0
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

const minHeap = new MinHeap()
res = ''
for (let i = 1; i < input.length; i++) {

    if (+input[i] !== 0) {
        minHeap.heapPush(+input[i])
    } else {
        let num = minHeap.heapPop()
        if (num === null)
            res += '0'
        else
            res += num
        res += '\n'
    }
}
console.log(res)