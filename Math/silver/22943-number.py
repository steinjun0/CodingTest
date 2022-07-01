from itertools import permutations


K, M = map(int, input().split())
basic_nums = [i for i in range(10)]

temp_list = basic_nums[:]
nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]


for _ in range(K-1):
    temp = []
    for i in basic_nums:
        for j in nums:
            if i != 0 and str(i) not in str(j):
                temp.append(int(str(i)+str(j)))
    nums = temp


if K == 1:
    nums.remove(0)


prime_nums_result = [2]
prime_nums = [i+1 for i in range(10**K)[2::2]]

while len(prime_nums) > 0:
    prime_nums_result.append(prime_nums[0])
    delete_list = []
    for i, v in enumerate(prime_nums):
        if v % prime_nums_result[-1] == 0:
            delete_list.append(i-len(delete_list))

    for i in delete_list:
        prime_nums.pop(i)

count = 0

for num_str in permutations(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], K):
    if(num_str[0] == '0'):
        continue
    num = int(''.join(num_str))
    first_condition = False
    second_condition = False
    index = len(prime_nums_result)
    for i, value in enumerate(prime_nums_result):
        if value > num:
            index = i
            break

    for j in range(index):
        for k in range(index)[j+1:]:
            if prime_nums_result[j]+prime_nums_result[k] == num:
                first_condition = True
                break
        if first_condition:
            break

    if first_condition:
        temp = num
        while temp % M == 0:
            temp /= M
        for j in range(index):
            for k in range(index)[j:]:
                if prime_nums_result[j]*prime_nums_result[k] == temp:
                    second_condition = True
                    count += 1
                    break
            if second_condition:
                break
print(count)

# 01:04:05 틀렸습니다(25%)
# 01:10:40 num을 temp에 담음 -> 틀렸습니다(25%)
# 01:25:40 모르겠다. 실패
# 왜틀린지 알아보려고 테스트 -> permutation을 잘못 만들어내고 있었음
