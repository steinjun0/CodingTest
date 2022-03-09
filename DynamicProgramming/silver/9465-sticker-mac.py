T = int(input())
for _ in range(T):
    stickers = []
    n = int(input())

    stickers.append(list(map(int, input().split())))
    stickers.append(list(map(int, input().split())))

    dp = [0] * (n)
    dp[0] = 0
    dp[1] = max(stickers[0][0]+stickers[1][1], stickers[1][0]+stickers[0][1])
    dp[2] = max(stickers[0][0]+stickers[1][1]+stickers[0][2],
                stickers[1][0]+stickers[0][1]+stickers[1][2],
                stickers[0][0]+stickers[1][2],
                stickers[1][0]+stickers[0][2])
    for i in range(3, n):
        dp[i] = max(dp[i-1] + stickers[0][i],
                    dp[i-1] + stickers[1][i],
                    dp[i-2] + stickers[0][i],
                    dp[i-2] + stickers[1][i])
    print(dp[n-1])
