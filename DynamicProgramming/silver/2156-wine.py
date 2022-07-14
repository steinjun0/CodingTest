N = int(input())
wines = []

for i in range(N):
    wines.append(int(input()))
dp = [0 for _ in range(N)]
dp[0] = wines[0]
# dp = [[0, 0, 0] for _ in range(N)]
# dp[0] = [0, wines[0], 0]
# dp[1] = [wines[0]+wines[1], wines[0], wines[1]]

cnt = 1
for i in range(1, N):
    # dp[i] = [dp[i-1][0]+wines[i], dp[i-1][1]+wines[i], dp[i-1][2]+wines[i]]
    # dp[i][(i+1) % 3] -= wines[i]
    if cnt < 2:
        dp[i] = (dp[i-1]+wines[i])
        cnt += 1
    elif cnt == 2:
        first = dp[i-1]
        second = dp[i-1] - wines[i-1] + wines[i]
        third = dp[i-1] - wines[i-2] + wines[i]
        print([first, second, third])
        if first >= second and first >= third:
            cnt = 0
            dp[i] = first
        elif second >= first and second >= third:
            cnt = 1
            dp[i] = second
        elif third >= first and third >= second:
            cnt = 2
            dp[i] = third
        if dp[i] < dp[i-1]:
            dp[i] = dp[i-1]
print(dp)
print(dp[-1])

# 00:29:40 틀렸습니다
# 01:04:09 -> 시간 다 돼서 일시정지
# 01:28:47 포기
