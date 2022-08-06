import sys

N = int(input())
if N == 1:
    print(0)
    sys.exit()

rocks = []
for _ in range(N-1):
    rocks.append(list(map(int, input().split())))

K = int(input())

dp = [100001 for _ in range(N)]
dp[0] = 0
minimum = 100001

if N > 3:
    for k in range(N-3):
        for i in range(N-1):
            if i == k:
                dp[i+3] = min(dp[i+3], dp[i]+K)
            if i < N-1:
                dp[i+1] = min(dp[i+1], dp[i]+rocks[i][0])
            if i < N-2:
                dp[i+2] = min(dp[i+2], dp[i]+rocks[i][1])
            # print(dp)
        minimum = min(dp[N-1], minimum)
        dp = [100001 for _ in range(N)]
        dp[0] = 0
else:
    for i in range(N-1):
        if i < N-1:
            dp[i+1] = min(dp[i+1], dp[i]+rocks[i][0])
        if i < N-2:
            dp[i+2] = min(dp[i+2], dp[i]+rocks[i][1])
        # print(dp)
        minimum = min(dp[N-1], minimum)
        dp = [100001 for _ in range(N)]
        dp[0] = 0

print(minimum)

# 00:18:38 90% 쯤 -> 틀렸습니다.
# 00:24:02 -> N에 따라 예외처리해줌
