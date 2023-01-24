class MinHeap {
    constructor() {
        this.heap = [null]
    }

    swap(a, b) {
        [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]
    }

    heapPush(value) {
        this.heap.push(value)
        let curIdx = this.heap.length - 1
        let parIdx = ~~(curIdx / 2)

        while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
            this.swap(parIdx, curIdx)
            curIdx = parIdx
            parIdx = ~~(curIdx / 2)
        }
    }

    heapPop() {
        const min = this.heap[1]
        if (this.heap.length === 1) return null
        else if (this.heap.length <= 2) this.heap = [null]
        else this.heap[1] = this.heap.pop()

        let curIdx = 1
        let leftIdx = 2
        let rightIdx = 3

        if (this.heap[leftIdx] === null) {
            return min
        } else if (this.heap[rightIdx] === null) {
            if (this.heap[curIdx] > this.heap[leftIdx])
                this.swap(curIdx, leftIdx)
            return min
        } else {
            while (this.heap[curIdx] > this.heap[leftIdx] || this.heap[curIdx] > this.heap[rightIdx]) {
                const minIdx = this.heap[leftIdx] > this.heap[rightIdx] ? rightIdx : leftIdx
                this.swap(minIdx, curIdx)
                curIdx = minIdx
                leftIdx = curIdx * 2
                rightIdx = curIdx * 2 + 1
            }
            return min
        }
    }
}

const minHeap = new MinHeap()
console.log(minHeap.heapPush(1))
console.log(minHeap.heapPush(2))
console.log(minHeap.heapPush(3))
console.log(minHeap.heapPush(4))
console.log(minHeap.heapPush(5))
console.log(minHeap.heapPush(100))
console.log(minHeap.heapPush(20))
console.log(minHeap.heapPush(25))
console.log(minHeap.heapPush(23))
console.log(minHeap.heapPush(29))
console.log(minHeap.heapPush(21))
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())
console.log(minHeap.heapPop())