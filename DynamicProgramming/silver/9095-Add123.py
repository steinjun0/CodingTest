T = int(input())


dp = [0] * 12
dp[1] = 1
dp[2] = 2
dp[3] = 3
for _ in range(T):
    n = int(input())
    for i in range(n):
        dp[i+1] = dp[i] + 1

# 00:30:00 포기
