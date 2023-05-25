const [N, ...numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(Number)

class AbsHeap{
    constructor(){
        this.arr = [null]
    }

    swap(a,b){
        [this.arr[a],this.arr[b]] = [this.arr[b],this.arr[a]]
    }
    push(value){
        this.arr.push(value)
        this.upsort(this.arr.length-1)
    }
    upsort(index){
        if(index > 1 && 
            (   (Math.abs(this.arr[~~(index/2)]) > Math.abs(this.arr[index])) || 
                (Math.abs(this.arr[~~(index/2)]) === Math.abs(this.arr[index]) && this.arr[~~(index/2)] > this.arr[index])
            )){
            this.swap(index,~~(index/2))
            this.upsort(~~(index/2))
        }
    }
    pop(){
        if(this.arr.length === 1){
            return 0
        }else if(this.arr.length === 2){
            return this.arr.pop()
        }else{
            const result = this.arr[1]
            this.arr[1] = this.arr.pop()
            this.downsort(1)
            return result
        }
    }
    downsort(index){
        const current = Math.abs(this.arr[index])
        const left = Math.abs(this.arr[index*2])
        const right = Math.abs(this.arr[index*2+1])
        if(current>=left && current>=right){
            if(left < right){
                this.swap(index, index*2)
                this.downsort(index*2)
            }else if(left > right){
                this.swap(index, index*2+1)
                this.downsort(index*2+1)
            }else if(left === right){
                if(this.arr[index*2] < this.arr[index*2+1]){
                    if(current > left){
                        this.swap(index, index*2)
                        this.downsort(index*2)
                    }
                }else{
                    if(current > right){
                        this.swap(index, index*2+1)
                        this.downsort(index*2+1)
                    }
                }
            }
            
        }else if(
            current>left || 
            ((current ===left) && (this.arr[index] > this.arr[index*2]))
        ){
            this.swap(index, index*2)
            this.downsort(index*2)
        }else if(
            current>right || 
            (current === right && (this.arr[index] > this.arr[index*2+1]))
        ){
            this.swap(index, index*2+1)
            this.downsort(index*2+1)
        }
    }
}

const heap = new AbsHeap()
const result = []
for(const num of numbers){
    if(num === 0){
        result.push(heap.pop())
    }else{
        heap.push(num)
    }
}
console.log(result.join('\n'))

// 00:34:15 맞았습니다!