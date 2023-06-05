const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()


let a = 0
let b = 0
let current = ''
let isNeg = false
for(const char of input){
    if(char === '+'){
        b += Number(current)
        current = ''
    }else if(char === '-'){
        b += Number(current)
        if(isNeg){
            a-=b
        }else{
            a=b
        }
        b=0
        isNeg = true
        current = ''
    }else{
        current += char
    }
    // console.log(current,a,b)
}
b+=Number(current)
if(isNeg){
    console.log(a-b)
}else{
    console.log(a+b)
}
// 00:08:55 맞았습니다