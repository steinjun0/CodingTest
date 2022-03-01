import sys
import math


def input():
    return sys.stdin.readline().rstrip()


M = int(input())
N = int(input())

# pNums = [2,3,5,7,11,13,17,19,23]
prime_numbers = []
for num in range(M, N+1):
    temp = num
    for i in range(num)[2:]:
        while True:
            if temp % i == 0:
                temp /= i
            else:
                break
    if temp == num:
        prime_numbers.append(num)

if len(prime_numbers) == 0:
    print(-1)
else:
    if 1 in prime_numbers:
        prime_numbers.remove(1)

    else:
        result = 0
        for i in prime_numbers:
            result += i

        print(result)
        print(prime_numbers[0])

print(prime_numbers)
