[N, K] = input().split(' ')
N = int(N)
K = int(K)
coins = []
for i in range(int(N)):
    coins.append(int(input()))

dp = [0 for i in range(K+1)]
for coin in coins:
    for i in range(K-coin+1):
        if i==0:
            dp[i+coin]+=1
        else:
            dp[i+coin] += dp[i]

print(dp[K])
# // 00:10:33 메모리 초과 -> python으로 교체
# // 00:17:52 틀렸습니다(3%) -> 불필요 print 제거
# 00:20:12 맞았습니다