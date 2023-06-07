const N = +require('fs').readFileSync(process.platform === 'linux'?'/dev/stdin':require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()

const numbers = Array(Math.floor(Math.sqrt(N))).fill(null).map((e,i)=>i)
for(let i=2;i<=N;i++){
    if(numbers[i] === i){
        for(let j=1;i*j<=N;j++){
            numbers[i*j] -= Math.floor(numbers[i*j]/i)
        }
    }
}
console.log(numbers[N])

// const numbers = Array(Math.floor(Math.sqrt(N))).fill(true)
// numbers[0] = false
// numbers[1] = false
// const primes = []
// for(let i=2;i<numbers.length;i++){
//     if(numbers[i]){
//         primes.push(i)
//         for(let j=2;i*j<numbers.length;j++){
//             numbers[i*j] = false
//         }
//     }
// }
// console.log
// let count = N
// for(const prime of primes){
//     if(N%prime ===0){
//         console.log(prime)
//         count -= N/prime
//         for(const subprime of primes){
//             if(prime*subprime <= N){
//                 count++
//             }else{
//                 break
//             }
//         }
//     }
// }
// console.log(count)
// 00:21:47 invalid range error -> 