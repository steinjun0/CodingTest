n = int(input())


def tiling():
    dp = [0] * (n+1)
    dp[1] = 1
    if n == 1:
        print(1)
        return

    dp[2] = 2
    for i in range(3, n+1):
        dp[i] = dp[i-1] + dp[i-2]

    print(dp[n] % 10007)


tiling()

# 00:22:00
# 12분 경 다 품(채점시간 오래걸림)
# 19분 경 예외처리 안넣어준 것 찾아줌
