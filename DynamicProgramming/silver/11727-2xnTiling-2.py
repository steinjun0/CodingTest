n = int(input())

dp = [0]*(n+1)
dp[1] = 1
if n == 1:
    print(1)

if n > 1:
    dp[2] = 3

    # 0
    # 1
    # 11, 2
    # 111, 112, 121, 211, 22
    # 1이냐 2냐, 2면 * 2
    for i in range(3, n+1):
        dp[i] = dp[i-2] + dp[i-1] + (dp[i-2])

    print(dp[n] % 10007)

# 00:20:05 첫제출(채점시간 오래걸림) -> 99% index error 발생
# 00:25:30 두 번째 제출

# 00:29:10
