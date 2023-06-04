const [N,...numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(Number)

if(N === 1){
    return console.log(0)
}
else if(N == 2){
    return console.log(numbers[0]+numbers[1])    
}

class Heap {
    constructor(){
        this.arr = [null]
    }
    swap(a,b){
        [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]]
    }
    push(value){
        this.arr.push(value)
        this.upsort(this.arr.length-1)
    }
    upsort(index){
        if(index > 1){
            if(this.arr[~~(index/2)] > this.arr[index]){
                this.swap(~~(index/2),index)
                this.upsort(~~(index/2))
            }
        }
    }
    pop(){
        if(this.arr.length === 1) return null
        else if(this.arr.length === 2) return this.arr.pop()
        const result = this.arr[1]
        this.arr[1] = this.arr.pop()
        this.downsort(1)
        return result
    }
    downsort(index){
        const left = index*2 
        const right = index*2+1

        if(this.arr[left]<this.arr[index] || this.arr[right]<this.arr[index]){
            if(this.arr[left] < this.arr[index] && this.arr[right]<this.arr[index]){
                if(this.arr[left] < this.arr[right]){
                    this.swap(left,index)
                    this.downsort(left)
                }else{
                    this.swap(right,index)
                    this.downsort(right)
                }
            }else if(this.arr[left] < this.arr[index]){
                this.swap(left,index)
                this.downsort(left)
            }else if(this.arr[right] < this.arr[index]){
                this.swap(right,index)
                this.downsort(right)
            }
        }
    }
}

let count = 0
const heap = new Heap()
for(let i=0;i<N;i++){
    heap.push(numbers[i])
}
while(true){
    const a =heap.pop()
    const b =heap.pop()
    if(b === null){
        break   
    }
    count+=a+b
    heap.push(a+b)
}
console.log(count)

// 00:04:07 틀렸습니다(4%) -> 2개 이하일 때 예외처리
// 00:05:48 틀렸습니다(4%) -> 로직 완전 수정
// 00:13:19 틀렸습니다(4%) -> 수식으로 변경
// 00:27:35 틀렸습니다(4%) -> 힙 써야하는걸 깨달음(ㅁㄴㅇㄹ)
// 00:39:14 맞았습니다! ->