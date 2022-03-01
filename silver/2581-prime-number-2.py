import sys
import math


def input():
    return sys.stdin.readline().rstrip()


M = int(input())
N = int(input())

prime_numbers = list(range(M, N+1))

if 1 in prime_numbers:
    prime_numbers.remove(1)

a = int(math.sqrt(N+1)) + 1
for i in range(a+1)[2:]:
    for num in prime_numbers[:]:
        if num != i and num % i == 0:
            prime_numbers.remove(num)


if len(prime_numbers) == 0:
    print(-1)

else:
    result = 0
    for i in prime_numbers:
        result += i

    print(result)
    print(prime_numbers[0])

print(prime_numbers)


# 00:44:22
# 1. [에라토스테네스의 체]에서 중요한건
#   M < N 에서, M,N 사이의 숫자 중 소수를 구하기 위해서는
#   int(sqrt(M))+1 보다 작은 수로만 나눴을 때, 나눠지지 않으면 소수이다.
# 2. 1은 소수가 아니다(중요)
# 3. range 범위를 신중하게 확인해야한다.
