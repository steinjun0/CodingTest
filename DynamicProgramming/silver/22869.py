N, K = map(int, input().split())

A = list(map(int, input().split()))

rocks = [False for _ in range(N)]

rocks[0] = True

for i in range(N):
    if rocks[i]:
        for j in range(i+1, i+K+1):
            if j >= N:
                break
            if rocks[j]:
                continue
            if (j - i)*(1+abs(A[i]-A[j])) <= K:
                rocks[j] = True
# print(rocks)
if rocks[-1]:
    print('YES')
else:
    print('NO')

# 00:09:42 틀렸습니다.
# 00:11:21 수식 잘못 적은 것 수정 -> 맞았습니다!