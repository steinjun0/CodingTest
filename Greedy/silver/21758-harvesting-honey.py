import sys
from collections import deque


def input():
    return sys.stdin.readline().rstrip()


N = int(input())

honey_map = list(map(int, input().split()))
if(N == 3):
    print(max(honey_map) * 2)

elif(N >= 4):
    best = 0
    sum_of_honey = sum(honey_map)

    for present_bee_home in range(N):

        for i in range(N):
            if(present_bee_home == i):
                continue
            sum_from_i_to_home = sum(honey_map[i+1:present_bee_home+1])
            sum_from_home_to_i = sum(honey_map[present_bee_home:i])
            for j in range(N-i):

                if(j == 0 or present_bee_home == j):
                    continue

                second_pos = j + i
                if(i < present_bee_home and j < present_bee_home):
                    sum_temp = sum_from_i_to_home + \
                        sum(honey_map[second_pos+1:present_bee_home+1]
                            ) - honey_map[j+i]

                elif(i < present_bee_home and present_bee_home < j+i):
                    sum_temp = sum_from_i_to_home + \
                        sum(honey_map[present_bee_home:second_pos])

                elif(i > present_bee_home and j+i > present_bee_home):
                    sum_temp = sum_from_home_to_i + \
                        sum(honey_map[present_bee_home:second_pos]
                            ) - honey_map[i]

                if(sum_temp > best):
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
