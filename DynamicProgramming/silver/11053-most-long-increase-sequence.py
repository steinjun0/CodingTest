# import sys


# def input():
#     return sys.stdin.readline().rstrip()


# N = int(input())
# A = list(map(int, input().split()))

# dp = []
# value_dp = []
# for index_o, num_o in enumerate(A):
#     for sequence in dp:
#         if index_o in sequence:
#             continue

#     temp = []
#     value_temp = []
#     for index_i, num_i in enumerate(A[index_o:]):

#         if index_i == 0:
#             temp = [index_i+index_o]
#             value_temp = [num_i]
#         else:
#             # print()
#             # print(temp)
#             # print(f'A[temp[-1]]: {A[temp[-1]]}')
#             # print(f'num_i: {num_i}')
#             if not num_i in value_temp:
#                 if A[temp[-1]] < num_i:
#                     temp.append(index_i+index_o)
#                     value_temp.append(num_i)
#                 # else:
#                 #     if A[temp[-1]] > num_i > A[temp[0]]:
#                 #         temp.append(index_i+index_o)
#                 #         value_temp.append(num_i)
#                 #         biggest = temp[-2]
#                 #         temp[-1] = temp[-2]
#                 #         temp[-2] = temp[-1]

#     dp.append(temp)
#     value_dp.append(value_temp)

# print(dp)
# print(value_dp)
# print(max(list(map(lambda sequence: len(sequence), dp))))
# 5
# 1 5 2 4 3

# 1 5
# 1 2 4

# 00:50:00

# -> 다른날 추가로 9분 고민하고 다른 방법 생각해냄(이어붙이기)

import sys


def input():
    return sys.stdin.readline().rstrip()


N = int(input())
A = list(map(int, input().split()))

dp = [[A[0]]]
number_list = {1: [A[0]]}

length_max = 1
for number in A[1:]:
    temp = []
    for series in dp:
        if number_list[1][0] > number:
            temp.append([number])
            dp.remove(number_list[1])
            number_list[1] = [number]

        if series[-1] < number:

            if len(number_list) < len(series) + 1:
                temp.append(series+[number])
                number_list[len(series) + 1] = series+[number]

            if number_list[len(series) + 1][-1] > number:
                dp.remove(number_list[len(series) + 1])
                temp.append(series+[number])
                number_list[len(series) + 1] = series+[number]

            if len(series) + 1 > length_max:
                length_max = len(series) + 1

    if len(temp) > 0:
        dp += temp
# print(number_list)
# print(dp)
print(length_max)

# 00:50:00 + 00:53:14 성공
