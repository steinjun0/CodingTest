from itertools import permutations
K, M = list(map(int, input().split()))

prime_numbers = [2]
numbers = list(range(10**K))[3:int('98765'[:K])+2:2]
while numbers:
    prime_number = numbers[0]
    prime_numbers.append(prime_number)
    remove_index = []
    for index, value in enumerate(numbers):

        if value % prime_number == 0:
            remove_index.append(index-len(remove_index))

    for i in remove_index:
        numbers.pop(i)

# print(prime_numbers)

# print(prime_numbers)
# print(len(prime_numbers))
# first_condition_list = []
# for i in permutations(prime_numbers, 2):
#     n = int(i[0]) + int(i[1])
#     first_condition_list.append(n)
    # print(n)

# for index, value in enumerate(prime_numbers):
#     for value2 in prime_numbers[index+1:]:
#         num = value+value2
#         # print(['fisrt_list', num, index])
#         if num not in first_condition_list:
#             first_condition_list.append(num)


def get_maximum_prime_numbers_index(num):
    for index, value in enumerate(prime_numbers):
        if value > num:
            return index


def first_condition(num):
    if num in prime_numbers:
        return False

    maximum_index = get_maximum_prime_numbers_index(num)
    for index, value in enumerate(prime_numbers[:maximum_index]):
        for value2 in prime_numbers[index+1:maximum_index]:
            if (value + value2) == num:
                return True
    return False
    # if num in first_condition_list:
    #     return True
    # else:
    #     return False


def second_condition(num):
    while num % M == 0:
        num /= M

    if num in prime_numbers:
        return False
    maximum_index = get_maximum_prime_numbers_index(num)

    for index, value in enumerate(prime_numbers[:maximum_index]):
        for value2 in prime_numbers[index:maximum_index]:
            if (value * value2) == num:
                return True
    return False


basic_numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
numbers = permutations(basic_numbers, K)
cnt = 0
print(len(list(numbers)))
for i in numbers:
    n = ''
    for j in i:
        n += str(j)
    if n[0] == '0':
        continue
    n = int(n)
    # print(n)
    if first_condition(n):
        if second_condition(n):
            cnt += 1

print(cnt)

# 00:21:07 30% 시간초과
# 00:24:35 최대 prime_number를 구함 -> 30% 시간초과
# 2번째 조건 최대 index 구하는 부분 조금 더 최적화(실수 수정)
# 01:03:56 실패 -> 수학적인 특성을 몰라서 구현을 못하겠다.
