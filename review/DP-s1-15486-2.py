N = int(input())
dp = [0 for _ in range(N+1)]
for i in range(N):
    T, P = map(int, input().split())

    if i != 0 and dp[i] < dp[i-1]:
        dp[i] = dp[i-1]

    if i+T < N+1 and dp[i+T] < dp[i]+P:
        dp[i+T] = dp[i]+P


dp[-1] = max(dp[-1], dp[-2])
# print(dp)
print(dp[-1])

# 00:42:48 미래의 값을 갱신해놓을 수 있다는 생각.
# 3번째(답 보고)로 도전해서야 겨우 맞춘문제.
# dp는 연습을 계속 더 하자.
