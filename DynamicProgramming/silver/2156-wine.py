N = int(input())
wines = []

for i in range(N):
    wines.append(int(input()))
dp = [0 for _ in range(N)]
dp[0] = wines[0]

cnt = 1
for i in range(1, N):
    if cnt < 2:
        dp[i] = (dp[i-1]+wines[i])
        cnt += 1
    elif cnt == 2:
        first = dp[i-1]
        second = dp[i-3] + wines[i-2] + wines[i]
        third = dp[i-3] + wines[i-1] + wines[i]
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
print(dp)
print(dp[-1])

# 00:29:40 틀렸습니다
# 01:04:09 -> 시간 다 돼서 일시정지
