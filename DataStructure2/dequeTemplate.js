class Deque {
    constructor() {
        this.arr = [];
        this.head = 0;
        this.tail = 0;
    }
    push_front(item) {
        if (this.arr[0]) {
            this.arr.unshift(item)
            this.tail++
        } else {
            this.arr[this.head] = item;
            this.tail++
        }
    }
    push_back(item) {
        this.arr[this.tail++] = item;
    }
    pop_front() {
        if (this.head >= this.tail) {
            return null;
        } else {
            const result = this.arr[this.head++];
            return result;
        }
    }
    pop_back() {
        if (this.head >= this.tail) {
            return null;
        } else {
            const result = this.arr[--this.tail];
            return result;
        }
    }
}

const deq = new Deque()

// console.log(deq.arr)
// deq.push_front(2)
// console.log(deq.arr)
// deq.push_front(1)
// console.log(deq.arr)
// deq.push_back(3)
// console.log(deq.arr)
// deq.push_front(0)
// console.log(deq.arr)
// deq.push_back(4)
// console.log(deq.arr)
// console.log(deq.pop_back())
// console.log(deq.pop_front())
// console.log(deq.pop_back())
// console.log(deq.pop_front())
// console.log(deq.pop_back())
// console.log(deq.pop_front())
// console.log(deq.pop_back())
// console.log(deq.pop_front())