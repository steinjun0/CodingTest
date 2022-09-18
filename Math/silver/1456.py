import math
from collections import deque
A, B = map(int, input().split())
sqrt_B = int(math.sqrt(B))

is_prime = [True for _ in range(sqrt_B+1)]
is_almost_prime = []

for i in range(2, sqrt_B+1):
    if is_prime[i]:
        for j in range(i+i, sqrt_B+1, i):
            if j <= B:
                is_prime[j] = False

# print([i for i, v in enumerate(is_prime) if v])
for i in range(2, sqrt_B+1):
    if is_prime[i]:
        n = 2
        j = i**n
        while j <= B:
            if j >= A:
                is_almost_prime.append(j)
            n += 1
            j = i**n


is_almost_prime.sort()
is_almost_prime = deque(is_almost_prime)
# print(is_almost_prime)

# cnt = 0
# for i in range(A, B+1):
#     if i <= 1:
#         continue
#     if not is_almost_prime:
#         break
#     if i == is_almost_prime[0]:
#         cnt += 1
#         is_almost_prime.popleft()
print(len(is_almost_prime))

# 00:14:17 메모리 초과
# 00:24:05 B범위의 절반만으로 소수 생성 -> 컴파일 에러
# 00:27:03 마지막 코드 필요없는걸 확인(길이만 출력하면됨) -> 맞았습니다!

# 문제를 제대로 읽고, 범위에 대해서 좀 더 민감하게 받아들일 필요가 있다
# (10의 제곱수를 바로 KB,MB,GB 단위로 변환해서 읽는걸 연습)
# 10^3 = 1KB
# 10^6 = 1MB (이번 문제는 10^7 -> 10MB)
# 10^9 = 1GB (이쯤되면 의심해봐야한다. 보통 큰 경우가 512MB 제한 메모리)
