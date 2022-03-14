def xor(i):
    if i == 0:
        return 1
    else:
        return 0


T = int(input())
for _ in range(T):
    stickers = []
    n = int(input())

    stickers.append(list(map(int, input().split())))
    stickers.append(list(map(int, input().split())))

    dp = [[0, 0, 0] for _ in range(n)]
    dp[0] = [stickers[0][0], stickers[1][0], 0]
    if n == 1:
        print(max(dp[n-1]))
        continue
    dp[1] = [dp[0][0] + stickers[1][1],
             dp[0][1] + stickers[0][1],
             max(dp[0])]

    if n == 2:
        print(max(dp[n-1]))
        continue
    # dp[2] = [dp[1][0] + stickers[0][2],
    #          dp[1][1] + stickers[1][2],
    #          max(dp[1])]

    for i in range(2, n):
        dp[i] = [max(dp[i-1][0] + stickers[xor((i-1) % 2)][i],
                 dp[i-1][2] + stickers[xor((i-1) % 2)][i]),
                 max(dp[i-1][1] + stickers[(i-1) % 2][i],
                     dp[i-1][2] + stickers[(i-1) % 2][i]),
                 max(dp[i-1])]
    # print()
    # print(dp)
    print(max(dp[n-1]))
