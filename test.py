from fileinput import hook_encoded
import sys
from collections import deque


def input():
    return sys.stdin.readline().rstrip()


N = int(input())

honey_map = list(map(int, input().split()))

ac = [0 for _ in range(N+1)]
for i in range(1, N+1):
    ac[i] = ac[i-1] + honey_map[i-1]

if(N == 3):
    print(max(honey_map) * 2)

elif(N >= 4):
    best = 0
    sum_of_honey = sum(honey_map)

    for present_bee in range(1, N-1):
        # left home
        sum_temp = sum_of_honey + \
            ac[present_bee] - \
            honey_map[-1] - honey_map[present_bee]
        if(best < sum_temp):
            best = sum_temp

        # right home
        sum_temp = sum_of_honey + \
            ac[-1] - ac[present_bee+1] - \
            honey_map[0] - honey_map[present_bee]
        if(best < sum_temp):
            best = sum_temp

    for present_home in range(N-1):
        if(present_home == 0):
            continue
        # center
        sum_temp = sum_of_honey - \
            honey_map[-1] - honey_map[0] + honey_map[present_home]
        if(best < sum_temp):
            best = sum_temp

    # for i in range(N):
    #     if(present_bee_home == i):
    #         continue
    #     for j in range(N):

    #         if(i >= j or present_bee_home == j):
    #             continue

    #         if(i < present_bee_home and j < present_bee_home):
    #             sum_temp = sum(
    #                 honey_map[i+1:present_bee_home+1]) + sum(honey_map[j+1:present_bee_home+1]) - honey_map[j]

    #         elif(i < present_bee_home and present_bee_home < j):
    #             sum_temp = sum(
    #                 honey_map[i+1:present_bee_home+1]) + sum(honey_map[present_bee_home:j])

    #         elif(i > present_bee_home and j > present_bee_home):
    #             sum_temp = sum(
    #                 honey_map[present_bee_home:i]) + sum(honey_map[present_bee_home:j]) - honey_map[i]

    #         if(sum_temp > best):
    #             best = sum_temp

    print(best)


# 01:07:00 11점(N<=20)
# 01:34:00 포기
