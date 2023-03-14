const input  = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const [N, K] = input[0].split(' ').map(Number)
const beltData = input[1].split(' ').map(Number)

class CircularArray {
    constructor(data){
        this.arr = data
        this.head = 0
        this.tail = (data.length/2)-1
    }

    get(i){
        let index = this.head+i
        if(index > this.arr.length-1){
            index-=this.arr.length
        }
        return this.arr[index]
    }

    set(i,value){
        let index = this.head+i
        if(index > this.arr.length-1){
            index-=this.arr.length
        }
        this.arr[index] = value
    }

    decrease(i){
        let index = this.head+i
        if(index > this.arr.length-1){
            index-=this.arr.length
        }
        this.arr[index] -= 1
    }

    rotate(){
        if(this.head===0){
            this.head = this.arr.length-1
            this.tail--
        }else if(this.tail === 0){
            this.head--
            this.tail = this.arr.length-1
        }else{
            this.head--
            this.tail--
        }
    }
}

function solve(){
    const belt = new CircularArray(beltData)
    const robots = new CircularArray(Array(N).fill(false))
    robots.tail = N-1
    let step = 1
    let zeroCount = 0
    while(true){
        belt.rotate()

        robots.rotate()
        robots.set(N-1,false)
    
        for(let i=N-2;i>=0;i--){
            if(robots.get(i)){
                if(!robots.get(i+1) && belt.get(i+1)>0){
                    robots.set(i,false)
                    if(i+1!==N-1){
                        robots.set(i+1,true)
                    }
                    const temp =belt.get(i+1)-1
                    if(temp===0) zeroCount++
                    belt.set(i+1,temp)
                }
            }
        }
    
        if(belt.get(0) !== 0){
            robots.set(0,true)
            const temp = belt.get(0)-1
            if(temp===0) zeroCount++
            belt.set(0,temp)
        }
        
        // if(belt.arr.filter(e=>e===0).length>=K){
        if(zeroCount>=K){
            return step
        }else{
            step++
        }
    }
}

console.log(solve())

// 01:10:50 맞았습니다!(엄청나게 느림)(13MB, 4052ms) -> filter에서 count로 변경
// 01:18:30 맞았습니다!(그래도 느림)(15MB, 2324ms) -> 테스트용 코드 지움...
// 01:24:50 맞았습니다! (11MB, 308ms)