function binarize(num){
    const result = []
    while(num>0){
        result.push(num%2)
        num = Math.floor(num/2)
    }
    return result.reverse()
}

function search(nodes, index,seq){
    const current = index
    const left = index*2+1
    const right = index*2+2
    const parent = ~~((index-1)/2)
    
    if(nodes[left] === false){
        search(nodes,left,seq)
    }else if(nodes[left]===undefined && nodes[right]===undefined){
        nodes[current] = true
        seq.push(current)
        if(current === nodes.length-1){
            return nodes
        }
        search(nodes,parent,seq)
    }else if(nodes[current] === false){
        seq.push(current)
        nodes[current] = true
        search(nodes,right,seq)
    }else{
        search(nodes,parent,seq)
    }
    
}

function preFind(depth){
    const nodes = Array((2**depth)-1).fill(false)
    const seq = []
    search(nodes, 0,seq)
    
    return seq
}

function solution(numbers) {
    let answer = Array(numbers.length).fill(0);
    for(let numberIndex =0;numberIndex< numbers.length;numberIndex++){
        const number = numbers[numberIndex]
        const bNumArr = binarize(number)
        
        const minDetph = Math.ceil(Math.log2(bNumArr.length))
        outer1: for(let treeDepth = minDetph; treeDepth<7;treeDepth++){
            const tree = Array((2**treeDepth)-1).fill(false)
            const seq = preFind(treeDepth)
            outer2: for(let i=0;i<=((2**treeDepth-1)-bNumArr.length);i++){
                for(let j=i;j<=i+bNumArr.length;j++){
                    const index = seq[j]
                    tree[index] = bNumArr[j-i] === 1
                }
                // console.table(tree)

                // tree 검증
                for(let i=0;i<tree.length;i++){
                    const left = i*2+1
                    const right = i*2+2
                    if(!tree[i] && (tree[left] || tree[right])){
                        tree.fill(false)
                        continue outer2
                    }
                }

                // 숫자 검증
                const temp = []
                for(let i=0;i<tree.length;i++){
                    const value = tree[seq[i]]
                    if(temp.length===0 && value){
                        temp.push(1)
                    }else if(temp.length>0){
                        temp.push(value?1:0)
                    }
                }

                if(temp.join('')=== bNumArr.join('')){
                    answer[numberIndex] = 1
                    break outer1
                }
                
                tree.fill(false)
            }
        }
    }
    
    return answer;
}

// 02:1x:xx