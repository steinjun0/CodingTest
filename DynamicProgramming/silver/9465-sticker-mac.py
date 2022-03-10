T = int(input())
for _ in range(T):
    stickers = []
    n = int(input())

    stickers.append(list(map(int, input().split())))
    stickers.append(list(map(int, input().split())))

    if n == 1:
        print(max(stickers[0][0], stickers[1][0]))
        continue

    if n == 2:
        print(max(stickers[0][0]+stickers[1][1],
              stickers[1][0] + stickers[0][1]))
        continue

    if n == 3:
        print(max(max(stickers[0][0]+stickers[1][1]+stickers[0][2], stickers[1][0]+stickers[0][2]),
                  max(stickers[1][0]+stickers[0][1]+stickers[1][2], stickers[0][0]+stickers[1][2])))
        continue

    dp = [[0, 0, 0] for _ in range(n)]
    dp[0] = [stickers[0][0], stickers[0][1], 0]
    dp[1] = [stickers[0][0]+stickers[1][1], stickers[1][0] +
             stickers[0][1], max(stickers[0][0], stickers[1][1])]
    dp[2] = [max(stickers[0][0]+stickers[1][1]+stickers[0][2], stickers[1][0]+stickers[0][2]),
             max(stickers[1][0]+stickers[0][1]+stickers[1]
                 [2], stickers[0][0]+stickers[1][2]),
             max(max(stickers[0][0]+stickers[1][1], stickers[1][0]), max(stickers[1][0]+stickers[0][1], stickers[0][0]))]
    for i in range(3, n):
        dp[i][0] = max(dp[i-1][0] + stickers[0][i], dp[i-2][1] + stickers[0]
                       [i], dp[i-1][2] + stickers[0][i], dp[i-2][2] + stickers[0][i])
        dp[i][1] = max(dp[i-1][1] + stickers[1][i], dp[i-2][0] + stickers[1]
                       [i], dp[i-1][2] + stickers[1][i], dp[i-2][2] + stickers[1][i])
        dp[i][0] = max(dp[i-1][0], dp[i-2][1], dp[i-1][1], dp[i-2][0])

    print(max(dp[n-1]))
