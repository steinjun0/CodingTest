const [[N], ...reqsInput] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))
if(N===0) return console.log(0)

class Heap{
    constructor(){
        this.arr = [null]
    }
    swap(a,b){
        [this.arr[a],this.arr[b]]=[this.arr[b],this.arr[a]]
    }
    push(value){
        this.arr.push(value)
        this.upsort(this.arr.length-1)
    }
    upsort(index){
        const current = this.arr[index]
        const parent = this.arr[~~(index/2)]
        if(parent > current){
            this.swap(index,~~(index/2))
            if(~~(index/2) > 1){
                this.upsort(~~(index/2))
            }
        }
    }
    pop(){
        if(this.arr.length === 1){
            return null
        }else if(this.arr.length === 2){
            return this.arr.pop()
        }else{
            this.arr[1] = this.arr.pop()
            this.downsort(1)
        }
    }
    downsort(index){
        const current = this.arr[index]
        const left = this.arr[index*2]
        const right = this.arr[index*2+1]
        if(left&&!right){
            if(current > left){
                this.swap(index,index*2)
                this.downsort(index*2)
            }
        }else if(current > left || current > right){
            if(current > left && current < right){
                this.swap(index,index*2)
                this.downsort(index*2)
            }else if(current < left && current > right){
                this.swap(index,index*2+1)
                this.downsort(index*2+1)
            }else{
                if(left > right){
                    this.swap(index,index*2+1)
                    this.downsort(index*2+1)
                }else{
                    this.swap(index,index*2)
                    this.downsort(index*2)
                }
            }
        }
    }
}

reqsInput.sort((a,b)=>a[1]-b[1])
const result = new Heap()
let lastD = reqsInput[0][1]
for(const [p,d] of reqsInput){
    if(d !== lastD){
        while(result.arr.length-1 > lastD){
            result.pop()
        }
        lastD = d
    }
    result.push(p)
}
while(result.arr.length-1 > lastD){
    result.pop()
}

console.log(result.arr.reduce((sum,e)=>sum+e,0))

// 00:05:26 틀렸습니다(3%) -> 로직 변경
// 00:23:35 런타임에러(96%) -> reduce 초기값 넣어줌
// 00:25:13 맞았습니다(1788ms) -> heap으로 변경
// 00:49:47 틀렸습니다 -> heap downsort 오류 수정
// 00:58:05 틀렸습니다 -> ??? -> heap downsort 빠진 경우 추가
// 01:01:30 틀렸습니다 -> downsort 예외사항 더 추가
// 01:04:45 틀렸습니다 -> 아... 테스트 코드 제거
// 01:05:14 맞았습니다(296ms) -> heap 롤백
// 01:06:20 틀렸습니다 -> 조건 순서 변경
// 01:07:14 맞았습니다(316ms) -> maxD 추가
// 01:08:16 맞았습니다(252ms) -> heap 다시 자세하게
// 01:11:03 맞았습니다(272ms) -> 롤백 -> heap 조건식 간략화, pop return 제거, d로 나눈 구조 변경
// 01:19:45 틀렸습니다 -> lastD 추가
// 01:21:28 틀렸습니다 -> lastD 로직 변경
// 01:25:42 틀렸습니다 -> 마지막 pop 추가
// 01:27:44 틀렸습니다 -> heap이 문제였음
// 01:34:30 맞았습니다(260ms) ->

// result = [...result,...reqs[d]]
// result.sort((a,b)=>b-a)
// result = result.slice(0,d)


// const reqs = Array.from(Array(10001),()=>[])
// let maxD = 0
// for(const [p,d] of reqsInput){
//     reqs[d].push(p)
//     if(d>maxD) maxD = d
// }
// let result = new Heap()
// for(let d=1;d<=maxD;d++){
//     for(const p of reqs[d]){
//         result.push(p)
//     }
//     while(result.arr.length-1 > d){
//         result.pop()
//     }
// }