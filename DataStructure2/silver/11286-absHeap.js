const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')
  .map(e => +e)


function printHeap(heap) {
  for (i of heap) {
    console.log(i)
  }
}

function sortHeap(heap, i, j) {
  // console.log(i - 1, j / 2, heap[i - 1][j / 2], heap[i][j])
  const ni = i - 1, nj = ~~(j / 2)
  if (Math.abs(heap[ni][nj]) > Math.abs(heap[i][j]) || (Math.abs(heap[ni][nj]) == Math.abs(heap[i][j]) && heap[ni][nj] > heap[i][j])) {
    const temp = heap[ni][nj]
    heap[ni][nj] = heap[i][j]
    heap[i][j] = temp
    if (ni === 0) {
      return
    } else {
      sortHeap(heap, ni, nj)
    }
  }
}

function sortHeapPop(heap, i, j) {
  // printHeap(heap)
  if (heap[i + 1][j * 2] === null && heap[i + 1][j * 2 + 1] !== null) {
    heap[i][j] = heap[i + 1][j * 2 + 1]
    heap[i + 1][j * 2 + 1] = null
  } else if (heap[i + 1][j * 2] !== null && heap[i + 1][j * 2 + 1] === null) {
    heap[i][j] = heap[i + 1][j * 2]
    heap[i + 1][j * 2] = null
  } else if (heap[i + 1][j * 2] === null && heap[i + 1][j * 2 + 1] === null) {
    return
  } else {
    if (Math.abs(heap[i + 1][j * 2]) < Math.abs(heap[i + 1][j * 2 + 1])) {
      heap[i][j] = heap[i + 1][j * 2]
      heap[i + 1][j * 2] = null
      sortHeapPop(heap, i + 1, j * 2)
    } else if (Math.abs(heap[i + 1][j * 2]) > Math.abs(heap[i + 1][j * 2 + 1])) {
      heap[i][j] = heap[i + 1][j * 2 + 1]
      heap[i + 1][j * 2 + 1] = null
      sortHeapPop(heap, i + 1, j * 2 + 1)
    } else {
      if (heap[i + 1][j * 2] <= heap[i + 1][j * 2 + 1]) {
        heap[i][j] = heap[i + 1][j * 2]
        heap[i + 1][j * 2] = null
        sortHeapPop(heap, i + 1, j * 2)
      } else if (heap[i + 1][j * 2] > heap[i + 1][j * 2 + 1]) {
        heap[i][j] = heap[i + 1][j * 2 + 1]
        heap[i + 1][j * 2 + 1] = null
        sortHeapPop(heap, i + 1, j * 2 + 1)
      }
    }
  }
}

function pushNode(heap, element, index) {
  const i = Math.floor(Math.log2(index + 1))
  const j = (index + 1) % (i + 1)
  heap[i][j] = element
  if (i > 0)
    sortHeap(heap, i, j)
}

function popNode(heap, element, index) {
  const min = heap[0][0]
  heap[0][0] = null
  sortHeapPop(heap, 0, 0)
  return min
}

function solve(input) {
  const N = input[0]
  const numbers = input.slice(1)
  const logN = Math.ceil(Math.log2(N))
  const heap = []
  for (let i = 0; i <= logN; i++) {
    heap.push(Array(2 ** i).fill(null))
  }
  let heapLength = 0
  for (let i = 0; i < numbers.length; i++) {
    const element = numbers[i]
    if (element === 0) {
      if (heapLength === 0) {
        console.log(0)
      } else {
        heapLength -= 1
        console.log(popNode(heap))
      }
    } else {
      heapLength += 1
      pushNode(heap, element, heapLength - 1)
    }
    // printHeap(heap)
  }
}

solve(input)

// 00:42:00 heap 잘못 짜고 있다는걸 꺠달음
// 01:01:25 heap sort 구현 완료(애매)
// 01:10:00 heap sort pop 구현 완료(애매)
// 01:32:32 출력 초과(실수)
// 01:33:40 틀렸습니다
