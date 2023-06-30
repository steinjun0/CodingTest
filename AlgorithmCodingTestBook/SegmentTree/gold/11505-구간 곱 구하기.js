const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const [N,M,K] = input[0].split(' ').map(Number)
const numbers = input.slice(1,N+1).map(BigInt)
const cases = input.slice(N+1).map(e=>e.split(' ').map(Number))
const mod = 1000000007n

class SegmentTree{
    constructor(origin){
        this.origin = [null,...origin]
        this.tree = [null]
    }

    init(left,right,node){
        if(left < right){
            const mid = ~~((left+right)/2)
            this.tree[node] = (this.init(left,mid,node*2) * this.init(mid+1,right,node*2+1)) % mod
            
        }else if(left === right){
            this.tree[node] = this.origin[left]
        }
        return this.tree[node]
    }

    update(node,value){
        this.tree[node] = value
        if(node === 1) return
        if(node % 2 === 0){
            this.update(~~(node/2),(this.tree[node]*this.tree[node+1])%mod)
        }else{
            this.update(~~(node/2),(this.tree[node-1]*this.tree[node])%mod)
        }
    }

    find(index){
        const findIter = (left,right,node)=>{
            if(left === right){
                return node
            }else{
                const mid = ~~((left+right)/2)
                if(index <= mid){
                    return findIter(left,mid,node*2,index)
                }else{
                    return findIter(mid+1,right,node*2+1,index)
                }
            }
        }
        return findIter(1,N,1)
    }

    get(left,right){
        const getIter = (a,b,node) => {
            if(a > right || b < left) return 1n
            else if(left <= a && b <= right) return this.tree[node] %mod
            else{
                const mid = ~~((a+b)/2)
                return (getIter(a,mid,node*2)*getIter(mid+1,b,node*2+1))%mod
            }
        }
        return getIter(1,N,1)%mod
    }
}

const ST = new SegmentTree(numbers)
ST.init(1,N,1)

const result = []
for(const [a,b,c] of cases){
    if(a===1){
        ST.update(ST.find(b),BigInt(c))
    }else if(a === 2){
        result.push(ST.get(b,c))
    }
}

console.log(result.join('\n'))

// 00:39:48 틀렸습니다(2%) -> getIter 출력시 mod 적용
// 00:41:26 틀렸습니다(2%) -> BigInt로 변경
// 00:47:35 맞았습니다!