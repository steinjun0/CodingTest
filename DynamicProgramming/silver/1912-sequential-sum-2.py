import sys
import collections


def input():
    return sys.stdin.readline().rstrip()


n = int(input())


def find_max():
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

    if len(turning_numbers) == 1:
        if turning_numbers[0] <= 0:
            print(max(numbers))
            return
        else:
            print(turning_numbers[0])

    if turning_numbers[0] <= 0:
        turning_numbers = turning_numbers[1:]

    print(turning_numbers)

    max_list = []
    temp = 0
    for index, num in enumerate(turning_numbers):
        print(f'{index} temp: {temp}, num: {num}')
        if num > 0:
            if len(turning_numbers)-1 > index:
                if num + turning_numbers[index+1] <= 0:  # 다음 음수가 양수보다 클때
                    max_list.append(temp)
                    if len(turning_numbers)-2 > index:
                        temp = turning_numbers[index+2]
                # 다음 음수가 그 다음 양수보다 클 때
                elif turning_numbers[index+1] + turning_numbers[index+2] <= 0:
                    print(f'{index} num: {num}')
                    max_list.append(temp)
                    temp = 0

                else:
                    temp += num
                    temp += turning_numbers[index+1]
    max_list.append(temp)
    print(max_list)


find_max()
# 첫 제출 00:47:15 틀렸습니다
# 제출 2 00:53:21(모두 음수일때 처리안함)
# 제출 3 01:09:00 (최초에 구한 max number도 조건에 넣어줌(의미 없어보임))
# 제출 4 01:15:00 (등호 넣어줌)
# 01:24:12 (포기)
# 2회차
# 01:57:00 (포기)
