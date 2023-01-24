const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')


class MaxHeap {
    constructor() {
        this.heap = [null]
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }

    heapPush(element) {
        this.heap.push(element)
        let curIdx = this.heap.length - 1
        let parIdx = curIdx / 2 >> 0

        while (curIdx > 1 && this.heap[parIdx] < this.heap[curIdx]) {

            this.swap(parIdx, curIdx)
            curIdx = parIdx
            parIdx = curIdx / 2 >> 0
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
            if (this.heap[curIdx] < this.heap[leftIdx])
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


const maxHeap = new MaxHeap()
res = ''
for (let i = 1; i < input.length; i++) {

    if (+input[i] !== 0) {
        maxHeap.heapPush(+input[i])
    } else {
        let num = maxHeap.heapPop()
        if (num === null)
            res += '0'
        else
            res += num
        res += '\n'
    }
}
console.log(res)