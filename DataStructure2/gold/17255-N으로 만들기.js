const N = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()

function dfs(start,end,history){
    if(start === 0 && end===N.length){
        return [history]
    }else{
        const result = []
        const substring = N.slice(start,end)
        if(start > 0){
            result.push(...dfs(start-1,end,history+'*'+substring))
        }
        if(end < N.length){
            result.push(...dfs(start,end+1,history+'*'+substring))
        }
        return result
    }
}

const result = new Set()
for(let i=0;i<N.length;i++){
    const seqs = dfs(i,i+1,'')
    for(const seq of seqs){
        result.add(seq)
    }
}
console.log(result.size)

// 00:14:32 맞았습니다!