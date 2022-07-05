from itertools import permutations
import math
K, M = list(map(int, input().split()))


prime_numbers = [True for _ in range(10**K)]
prime_numbers[0] = False
prime_numbers[1] = False
prime_numbers[2] = True

for i in range(10**K)[2:]:
    if prime_numbers[i]:
        for j in range(i*2, (10**K), i):
            prime_numbers[j] = False


def get_maximum_prime_numbers_index(num):
    for index, value in enumerate(prime_numbers):
        if value > num:
            return index


def first_condition(num):
    for i in range(2, num):
        if prime_numbers[i] and prime_numbers[num - i] and (num-i != i):
            return True
    return False


second_condition_list = [False for _ in range(10**K)]


def second_condition(num):
    while num % M == 0:
        num = int(num/M)
    if prime_numbers[num]:
        return False
    if second_condition_list[num]:
        return True

    for i in range(2, int(math.sqrt(num))+1):
        if num % i == 0:
            if prime_numbers[i] and prime_numbers[int(num/i)]:
                second_condition_list[num] = True
                return True
    return False


basic_numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
numbers = permutations(basic_numbers, K)
cnt = 0
for i in numbers:
    n = ''
    for j in i:
        n += str(j)
    if n[0] == '0':
        continue
    n = int(n)
    if first_condition(n):
        if second_condition(n):
            # print(n)

            cnt += 1

print(cnt)

# 1.
# 소수를 뽑아서 계산을 진행하는 것 보다
# 모든 숫자를 뽑아서 계산하기 전에 해당 숫자가 소수인지 판별하는게
# 훨씬 빠르게 계산된다.
# 웬만하면
#   if x in list
# 는 쓰지말자. dp형식으로
#   if list[x]
# 로 사용하자. 훠---------얼씬 빠르다
#
# 2.
# 시간제한이 2초인데, 5 11을 넣으면 로컬에서 계산해도 2초가 훨씬 넘게 걸린다
# 하지만 통과했다. 이게 뭘까..
#
# 3.
# 시간복잡도가 K*N의 형태일 때, K를 1,2,3... 이렇게 줄이는건
# 크게 효과가 없을지라도, log scale로 줄이는건 의미가 있다(N을 줄이는게 아니더라도)
#
# 4.
# itertools를 잘쓰자
#
# 5.
# sqrt는 math에 있다(기본이 아니다)
#
# 6.
# queue(stack)에 넣었다 빼는건 큰 연산이다
#
# 7.
# 에라토스테네스의 체 외우자(지금 사용한것 처럼 짧은 버전으로)
