N, K = map(int, input().split())

coins = []
for _ in range(N):
    coin = int(input())
    if coin <= K:
        coins.append(coin)

coins = list(set(coins))
coins.sort()

dp = {}


def add_row(divided):
    row = []
    for coin in coins:
        row.append([divided // coin, divided % coin])
    dp[divided] = row

    for i in row:
        if i[1] != 0 and i[1] not in dp:
            add_row(i[1])


add_row(K)

dp_sorted_keys = list(dp.keys())
dp_sorted_keys.sort()

for key in dp_sorted_keys:
    # print(['dp', dp])
    # 나머지와 같은 값의 동전이 존재하면 최소 동전 개수=1
    if key in coins:
        dp[key] = 1
        continue

    # 동전에 나머지가 처리되지 못한경우, 이전 dp값으로 대체 가능하면 갱신
    for i, v in enumerate(dp[key]):
        if v[1] != 0 and v[1] != key:
            if v[1] in dp:
                dp[key][i][0] += dp[v[1]]
                dp[key][i][1] = 0

    minimum_cnt = 100001
    flag = False
    for i in dp[key]:
        if i[1] == 0:
            minimum_cnt = min(minimum_cnt, i[0])
            flag = True

    if flag:
        dp[key] = minimum_cnt
    else:
        del dp[key]


# print(['dp', dp])
if K not in dp:
    print(-1)
else:
    print(dp[K])

# 01:07:37 30%부근에서 틀렸습니다.
# 01:12:37 동전 개수 최소값 상수 변경 -> 30%부근에서 틀렸습니다.
# 01:19:14 K보다 큰 동전이 들어올 시 coins에 넣지않음 -> 30%부근에서 틀렸습니다.
# 01:27:09 minimum_cnt -> flag로 변경 -> 30%부근에서 틀렸습니다. -> 포기
# 너무 아쉽구만...
# 정답을 봤는데, 점화식을 세우는 걸로, 쭉 나열해보더라.
# 나도 점화식으로 또 접근해보자.
