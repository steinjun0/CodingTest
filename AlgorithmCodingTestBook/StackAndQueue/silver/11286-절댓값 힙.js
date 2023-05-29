const [N, ...numbers] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(Number)

class AbsHeap{
    constructor(comp){
        this.arr = [null]
        this.comp = comp
    }
    swap(a,b){
        [this.arr[a],this.arr[b]] = [this.arr[b],this.arr[a]]
    }
    push(value){
        this.arr.push(value)
        this.upsort(this.arr.length-1)
    }
    upsort(index){
        const current = this.arr[index]
        const parent = this.arr[~~(index/2)]
        if(index > 1 && this.comp(current, parent)){
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
        const current = this.arr[index]
        const left = this.arr[index*2]
        const right = this.arr[index*2+1]
        if(this.comp(left,right) && this.comp(left,current)){
            this.swap(index,index*2)
            this.downsort(index*2)
        }else if(this.comp(right,left) && this.comp(right,current)){
            this.swap(index,index*2+1)
            this.downsort(index*2+1)
        }
    }
}

const heap = new AbsHeap(
    (a,b)=>{
        if(a===undefined) return false
        if(b===undefined) return true
        if(Math.abs(a) < Math.abs(b)){
            return true
        }else if(Math.abs(a) > Math.abs(b)){
            return false
        }else{
            if(b<a)return false
            else return true
        }
    }
)
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
