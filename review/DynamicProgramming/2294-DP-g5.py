N, K = map(int, input().split())

coins = []
for _ in range(N):
    coin = int(input())
    if coin <= K:
        coins.append(coin)
coins = list(set(coins))
coins.sort()

results = [-1 for _ in range(K+1)]
for coin in coins:
    results[coin] = 1

for i in range(coins[0], K+1):
    if results[i] == 1:
        continue
    cnt = 10001
    for coin in coins:
        if coin > i:
            break
        if results[i - coin] != -1:
            cnt = min(cnt, results[i - coin] + 1)
    if cnt != 10001:
        results[i] = cnt

# for i, r in enumerate(results):
#     print([i, r])
print(results[-1])

# 00:29:00 인덱스 에러
# 00:30:21 중복 입력 예외처리, K보다 큰 coin 예외처리 -> 정답입니다.
# 솔루션이 어렴풋하게 기억이 나서 쉽게 풀었다.
# 혼자 힘으로 푼 느낌이 아니라 약간 찝찝.
# 어쨌든 최악의 경우가 100만 이라는 계산을 할 수 있어야 했다.
# 이 유형의 dp는 충~분히 많이 나올 것 같다. 꼭 기억하자.
