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
        let parIdx = curIdx / 2 >> 0

        while (curIdx > 1 && this.heap[parIdx] > this.heap[curIdx]) {
            this.swap(parIdx, curIdx)
            curIdx = parIdx
            parIdx = curIdx / 2 >> 0
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


const T = input[0]

let startIndex = 2
let res = ''
for (let i = 0; i < T; i++) {
    let lastIndex = 0
    const minHeap = new MinHeap()
    const maxHeap = new MaxHeap()
    let insertCount = 0
    let deleteCount = 0
    for (let j = startIndex; j < startIndex + +input[startIndex - 1]; j++) {
        // if (j % 1000 === 0) console.log(j)
        query = [input[j].split(' ')[0], +input[j].split(' ')[1]]

        // console.log('query', query)
        if (query[0] === 'I') {

            minHeap.heapPush(query[1])
            maxHeap.heapPush(query[1])
        }
        else if (query[0] === 'D') {

            if (query[1] === 1) {
                maxHeap.heapPop()
            }
            else if (query[1] === -1) {
                minHeap.heapPop()
            }
        }
        // console.log(maxHeap.heap)
        lastIndex = j
    }

    if (insertCount <= deleteCount) {
        res += 'EMPTY'

    } else {
        res += `${maxHeap.heap[1]} ${minHeap.heap[1]}`
    }
    res += '\n'

    startIndex = lastIndex + 2
}

console.log(res)
// 00:41:33 메모리 초과 -> splisce 제거
// 00:53:16 시간 초과(3%) -> insert/delete count 체크
// 01:21:00 시간 초과(3%) -> 오타 수정(this 없어야하는곳에 붙임)
// 01:29:00 틀렸습니다 (22%) -> delete/insert count 같으면 heap 초기화
// 01:35:51 틀렸습니다 (24%) -> 소수점 계산 처리 변경(~~ -> >> 0)
// 01:42:00 틀렸습니다 (24%) -> chat gpt에게 오타 검수(this 없어야하는곳에 붙임)
// 01:47:53 틀렸습니다 (24%) -> chat gpt에게 오타 검수(minHeap에 없는 변수 사용함)
// 01:51:53 틀렸습니다 (24%) -> chat gpt에게 오타 검수(minHeap에 없는 변수 사용함)
// 01:58:38 포기