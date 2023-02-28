const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

let T = +input[0]



function swap(heap, i, j) {
    const temp = heap[i]
    heap[i] = heap[j]
    heap[j] = temp
}

function heapUpSort(heap, index) {
    if (index === 0)
        return
    if (heap[index] < heap[~~(index / 2)]) {
        swap(heap, index, ~~(index / 2))
        heapUpSort(heap, ~~(index / 2))
    }
}

function heapDownSort(heap, index) {
    if (index * 2 < heap.length - 1) {
        if (heap[index * 2 + 1] === undefined) {
            if (heap[index] > heap[index * 2]) {
                swap(heap, index, index * 2)
                heapDownSort(heap, index * 2)
            }
        } else {
            if (heap[index * 2] < heap[index * 2 + 1]) {
                if (heap[index] > heap[index * 2]) {
                    swap(heap, index, index * 2)
                    heapDownSort(heap, index * 2)
                }
            } else {
                if (heap[index] > heap[index * 2 + 1]) {
                    swap(heap, index, index * 2 + 1)
                    heapDownSort(heap, index * 2 + 1)
                }
            }
        }
    }
}

function heapPush(heap, value) {
    heap.push(value)
    heapUpSort(heap, heap.length - 1)
}

function heapPop(heap) {
    const result = heap[0]
    heap[0] = heap.pop()
    heapDownSort(heap, 0)
    return result
}

// function solve(K, inputPages) {
//     let pages = [...inputPages]
//     let sum = 0

//     for (let count = 0; count < K - 1; count++) {
//         let temp = pages[0] + pages[1]
//         sum += temp
//         let insertIndex = pages.length
//         for (let i = 2; i < pages.length; i++) {
//             if (pages[i] > temp) {
//                 insertIndex = i
//                 break
//             }
//         }
//         pages = [...pages.slice(2, insertIndex), temp, ...pages.slice(insertIndex)]
//     }
//     return sum
// }

function solve(heap) {
    let sum = 0
    while (heap.length > 2) {
        const temp = heapPop(heap) + heapPop(heap)
        heapPush(heap, temp)
        sum += temp
    }
    return sum + heap[0] + heap[1]


}

const result = []

for (let count = 0; count < T; count++) {
    const K = +input[count * 2 + 1]
    const pages = input[count * 2 + 2].split(' ').map(Number)
    const heap = []
    for (const page of pages) {
        heapPush(heap, page)
    }

    result.push(solve(heap))
}

console.log(result.join('\n'))

// 00:27:41 메모리 초과(1%) -> 힙 구현
// 01:03:10 맞았습니다!