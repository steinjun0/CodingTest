n = int(input())

stairs = [-1]

for _ in range(n):
    stairs.append(int(input()))

dp = [[-1, -1]]
if n == 1:
    print(stairs[1])

if n == 2:
    print(stairs[1]+stairs[2])

if n > 2:
    dp.append([stairs[1], -1])
    dp.append([stairs[2], stairs[1]+stairs[2]])
    for i in range(3, n+1):
        dp.append([max(dp[i-2]) + stairs[i], dp[i-1][0] + stairs[i]])

    print(max(dp[n]))

# 00:13:59
# 무난하게 풀었다.
