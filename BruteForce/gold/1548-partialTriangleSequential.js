const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const N = input[0]
const originNums = input[1].split(' ').map(e => +e).sort((a, b) => a - b)

function isTri(i, j, nums) {
    return nums[i] + nums[i + 1] > nums[j]
}

function solve(N, nums) {
    if (nums.length <= 2) {
        return nums.length
    }
    let result = 2
    for (let i = 0; i < nums.length; i++) {
        for (let j = nums.length - 1; j >= i + 2; j--) {
            if (isTri(i, j, nums))
                result = Math.max(result, j - i + 1)
        }
    }
    return result

}

console.log(solve(N, originNums))

// 24:15 틀렸습니다 (0%) -> nums.length가 <=2 면 무조건 출력
// 26:10 틀렸습니다 (0%) -> for 범위 변경
// 33:40 틀렸습니다 (0%) -> 최대값 pop도 넣음
// 40:00 틀렸습니다 (0%) -> 반례 확인함
// 01:12:00 틀렸습니다 (0%) -> 진짜 다 찾음
// 01:25:00 맞았습니다!
// 반례 힌트를 얻어서 아쉽다.
// 다 찾아도 시간 복잡도가 문제가 없다면 정말로 다 찾자.
// 동질함을 찾을 필요는 없다!


// let nums = [...originNums].sort((a, b) => b - a)
// let max = nums[0]
// for (let i = nums.length - 1; i >= 2; i--) {
//     for (let j = i - 1; j >= 1; j--) {
//         // console.log(nums[i], nums[j], nums[i] + nums[j] <= max)
//         if (nums[i] + nums[j] <= max) {
//             nums.pop()
//             i = nums.length
//             break
//         }
//     }
//     if (nums.length <= 2) {
//         break
//     }
// }
// console.log(nums)

// let result = nums.length

// nums = [...originNums].sort((a, b) => a - b)
// let min = nums[0] + nums[1]
// for (let i = nums.length - 1; i >= 2; i--) {
//     if (nums[i] >= min) {
//         nums.pop()
//         i = nums.length
//     }
//     if (nums.length <= 2) {
//         break
//     }
// }
// console.log(nums)
// console.log(result, nums.length)
// result = Math.max(result, nums.length)
// return result


// let i = 0;
// let j = nums.length - 1
// let sequence = 0
// while (nums.length > 2 && nums[i] + nums[i + 1] <= nums[j]) {
//     if (sequence === 0) {
//         i++
//         sequence = 1
//     } else if (sequence === 1) {
//         i--
//         j--
//         sequence = 2
//     } else {
//         i++
//         sequence = 0
//     }
// }
// console.log(i, j, nums[i], nums[j])
// console.log(nums)
// if (nums.length <= 2) {
//     return nums.length
// } else {
//     return j - i + 1
// }