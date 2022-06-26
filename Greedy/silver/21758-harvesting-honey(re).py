n = int(input())
honey = list(map(int, input().split()))


# case1
sum1 = 0
temp_honey = honey[1:]
for i in temp_honey:
    sum1 += i

p_sum = [0]
for i in temp_honey:
    p_sum.append(p_sum[-1]+i)

max_sub_sum1 = 0
for index, value in enumerate(temp_honey):
    b2_start = index
    temp = -value
    temp += p_sum[-1] - p_sum[index+1]
    if max_sub_sum1 < temp:
        max_sub_sum1 = temp

sum1 += max_sub_sum1


# case2
sum2 = 0
temp_honey = honey[1:-1]
for i in temp_honey:
    sum2 += i

home_pos = max(temp_honey)

sum2 += home_pos

# case3
sum3 = 0
temp_honey = honey[:-1]
for i in temp_honey:
    sum3 += i

p_sum = [0]
for i in temp_honey[::-1]:
    p_sum.append(p_sum[-1]+i)
p_sum.reverse()

max_sub_sum3 = 0
for index, value in enumerate(temp_honey):
    b3_start = index
    temp = -value
    temp += p_sum[0] - p_sum[index]
    if max_sub_sum3 < temp:
        max_sub_sum3 = temp

sum3 += max_sub_sum3

# print([sum1, sum2, sum3])
print(max([sum1, sum2, sum3]))

# 00:22:23 -> 오답 -> case 3안함(1에서 반전)
# 00:27:11 -> 55점(N이 5000개 이하에 대해서만 시간 맞춤)
# 00:33:30 -> 누적합 적용 -> 정답
