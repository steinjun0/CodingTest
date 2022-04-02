import sys
import collections


def input():
    return sys.stdin.readline().rstrip()


n = int(input())

numbers = list(map(int, input().split()))

turning_numbers = [numbers[0]]
max_number = -9999
for num in numbers[1:]:
    if turning_numbers[-1] * num > 0:  # 부호가 같다면
        turning_numbers[-1] += num

    else:  # 부호가 다르다면
        if max_number < turning_numbers[-1]:
            max_number = turning_numbers[-1]
        turning_numbers.append(num)

# print(turning_numbers)
# print(max_number)

if len(turning_numbers) > 1 and turning_numbers[0] < 0:
    turning_numbers = turning_numbers[1:]

if len(turning_numbers) == 1 and turning_numbers[0] < 0:
    turning_numbers = [max(numbers)]

# print(turning_numbers)

deq = collections.deque()


temp = []
max_list = []
if len(turning_numbers) >= 2:
    temp = turning_numbers[0]
    # print(f'{turning_numbers[0]},')

    for index, num in enumerate(turning_numbers[2::2]):
        # print(f'now: {turning_numbers[2*index+2]}')
        # print(f'{turning_numbers[2*index+2-1]},')
        # print(f'{turning_numbers[2*index+2]},')
        if temp+turning_numbers[2*index+2-1] <= 0:
            max_list.append(temp)
            # print(f'0: {temp}')
            temp = turning_numbers[2*index+2]
        elif turning_numbers[2*index+2-1] + turning_numbers[2*index+2] >= 0:
            temp += turning_numbers[2*index+2-1] + turning_numbers[2*index+2]
            # print(f'1: {temp}')
        else:
            max_list.append(temp)
            # print(f'2: {temp}')
            temp = turning_numbers[2*index+2]
            # print(f'3: {temp}')

    max_list.append(temp)
    if max_number < max(max_list):
        print(max(max_list))
    else:
        print(max_number)

else:
    if turning_numbers[0] < max_number:
        print(max_number)
    else:
        print(turning_numbers[0])


# 첫 제출 00:47:15 틀렸습니다
# 제출 2 00:53:21(모두 음수일때 처리안함)
# 제출 3 01:09:00 (최초에 구한 max number도 조건에 넣어줌(의미 없어보임))
# 제출 4 01:15:00 (등호 넣어줌)
# 01:24:12 (포기)
