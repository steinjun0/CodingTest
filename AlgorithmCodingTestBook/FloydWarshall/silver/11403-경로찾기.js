const [[N],...links] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString().trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

// console.table(links)
for(let i=0;i<N;i++){
    links[i] = links[i].map(e=>e===0?Infinity:1)
}
for(let k=0;k<N;k++){
    for(let i=0;i<N;i++){
        for(let j=0;j<N;j++){
            if(links[i][j] > links[i][k] + links[k][j]){
                links[i][j] =links[i][k] + links[k][j]
            }
        }
    }
}

for(let i=0;i<N;i++){
    links[i] = links[i].map(e=>e===Infinity?0:1).join(' ')
}

console.log(links.join('\n'))

// 00:08:10 