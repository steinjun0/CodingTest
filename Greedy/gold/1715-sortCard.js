const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
// const cards = input.slice(1).map(Number)

class MinHeap {
    constructor() {
        this.heap = []
    }

    swap(i, j) {
        const temp = this.heap[i]
        this.heap[i] = this.heap[j]
        this.heap[j] = temp
    }

    upSort(index) {
        if (index === 0) {
            return
        } else {
            if (this.heap[index] < this.heap[~~(index / 2)]) {
                this.swap(index, ~~(index / 2))
                this.upSort(~~(index / 2))
            }
        }
    }

    downSort(index) {
        if (this.heap[index * 2 + 1] === undefined) {
            if ((this.heap[index * 2] !== undefined) && this.heap[index * 2] < this.heap[index]) {
                this.swap(index, index * 2)
                this.downSort(index * 2)
            }
        } else {
            if (this.heap[index * 2] < this.heap[index * 2 + 1]) {
                if (this.heap[index * 2] < this.heap[index]) {
                    this.swap(index, index * 2)
                    this.downSort(index * 2)
                }
            } else {
                if (this.heap[index * 2 + 1] < this.heap[index]) {
                    this.swap(index, index * 2 + 1)
                    this.downSort(index * 2 + 1)
                }
            }
        }
    }

    push(value) {
        this.heap.push(value)
        this.upSort(this.heap.length - 1)
    }

    pop() {
        if (this.heap.length === 0) {
            return null
        } else if (this.heap.length === 1) {
            return this.heap.pop()
        }
        else {
            const result = this.heap[0]
            this.heap[0] = this.heap.pop()
            this.downSort(0)
            return result
        }

    }
}

const minHeap = new MinHeap()
for (let i = 1; i <= N; i++) {
    minHeap.push(+input[i])
}
// for (const card of cards) {
//     minHeap.push(card)
// }

let result = 0
while (minHeap.heap.length > 1) {
    const temp = minHeap.pop() + minHeap.pop()
    minHeap.push(temp)
    result += temp
}
console.log(result)

// function solve(input) {
//     const minHeap = new MinHeap()
//     for (let i = 1; i <= N; i++) {
//         minHeap.push(+input[i])
//     }
//     // for (const card of cards) {
//     //     minHeap.push(card)
//     // }

//     let result = 0
//     while (minHeap.heap.length > 1) {
//         const temp = minHeap.pop() + minHeap.pop()
//         minHeap.push(temp)
//         result += temp
//     }
//     return result
// }

// console.log(solve(input))


// 00:19:35 minHeap 완료
// 00:23:20 맞았습니다!
// input을 다른 변수에 넣는건(특히 slice) 메모리를 훨씬 많이 쓰게 된다
// 함수로 감싸는건 크게 성능에 영향을 미치지는 않으나, 시간이 조금 더 줄어드는 것 같긴함