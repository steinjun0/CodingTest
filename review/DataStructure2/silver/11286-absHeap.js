const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')
  .map(e => +e)

const [N, ...numbers] = input

class MinHeap {
  constructor(N) {
    this.heap = Array(N + 1).fill(null)
    this.index = 0
  }

  push(element) {

    this.index += 1
    // console.log(this.index)
    this.heap[this.index] = element
    // console.log(this.heap)
    this.pushSort(this.index)
    // console.log(this.heap)
  }

  organize() {
    let temp = this.heap[1]
    for (let i = 2; i <= this.index + 1; i++) {
      // console.log(temp, this.heap[i])
      if (temp === null && this.heap[i] === null)
        break
      else if (temp === null && this.heap[i] !== null) {
        this.swap(i - 1, i)
      }
      temp = this.heap[i]

      // if (i == 1)
      //   continue
      // if (i % 2 == 1 && this.heap[i] !== null) {
      //   if (this.heap[i - 1] === null) {
      //     this.heap[i - 1] = this.heap[i]
      //     this.heap[i] = null
      //   }

      // }
    }
  }

  pop() {
    if (this.index === 0)
      return 0
    this.index -= 1
    const temp = this.heap[1]
    this.heap[1] = null
    this.popSort(1)
    this.organize()
    return temp
  }

  pushSort(curIndex) {
    if (curIndex === 1) {
      return
    }
    const pn = this.heap[~~(curIndex / 2)]
    const cn = this.heap[curIndex]
    const cond1 = Math.abs(pn) > Math.abs(cn)
    const cond2 = ((Math.abs(pn) === Math.abs(cn)) && pn > cn)

    if (cond1 || cond2) {
      this.swap(~~(curIndex / 2), curIndex)
      this.pushSort(~~(curIndex / 2))
    }
  }

  popSort(curIndex) {
    const ln = this.heap[curIndex * 2]
    const rn = this.heap[curIndex * 2 + 1]
    // console.log(ln, rn)
    if (ln === null && rn === null) {
      return
    } else if (ln !== null && rn === null) {
      this.swap(curIndex, curIndex * 2)
      this.popSort(curIndex * 2)
    } else if (ln === null && rn !== null) {
      this.swap(curIndex, curIndex * 2 + 1)
      this.popSort(curIndex * 2 + 1)
    } else {
      if (Math.abs(ln) < Math.abs(rn) || (Math.abs(ln) === Math.abs(rn) && ln <= rn)) {
        this.swap(curIndex, curIndex * 2)
        this.popSort(curIndex * 2)
      } else if (Math.abs(rn) < Math.abs(ln) || (Math.abs(rn) === Math.abs(ln) && ln > rn)) {
        this.swap(curIndex, curIndex * 2 + 1)
        this.popSort(curIndex * 2 + 1)
      }
    }
  }

  swap(n1, n2) {
    const temp = this.heap[n1]
    this.heap[n1] = this.heap[n2]
    this.heap[n2] = temp
  }
}

function solve(N, numbers) {
  const heap = new MinHeap(N)
  for (let i of numbers) {
    // console.log('input', i)
    if (i === 0)
      console.log(heap.pop(i))
    else
      heap.push(i)
    // console.log(heap.heap)
  }
}

solve(N, numbers)

// 00:33:55 class, node별 코딩을 하다 포기. 배열 형태로 변경
// 01:53:37 포기
// 1. 배열 형태로 heap 구현
// 2. heap 좌측 정렬(organize)추가
// 3. 조건 빠진 부분 추가
// 했지만 안됐다. 디버깅하는데 시간이 너무 오래 걸림
// heap을 외우자
