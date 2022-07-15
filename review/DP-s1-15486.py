N = int(input())

meetings = [0]
for _ in range(N):
    meetings.append(list(map(int, input().split())))

dp = [[[0, [0, 0]], [0, [0, 0]]] for _ in range(N+1)]
dp[1] = [[meetings[1][1], [1, 1+meetings[1][0]]], [0, [0, 0]]]
for i in range(2, N+1):
    duration = meetings[i][0]
    price = meetings[i][1]

    # i가 이전 dp의 종료일보다 느리거나 같을 떄
    if i >= dp[i-1][0][1][1] and i+duration <= N+1:
        dp[i][0][0] = dp[i-1][0][0] + price
        dp[i][0][1] = [i, i+duration]
        dp[i][1][0] = dp[i-1][0][0]
        dp[i][1][1] = dp[i-1][0][1]
    # i가 이전 dp의 종료일보다 빠를 때
    else:
        dp[i][0][0] = dp[i-1][0][0]
        dp[i][0][1] = dp[i-1][0][1]

        # i가 차선의 종료일 보다 느리거나 같을 때
        if i >= dp[i-1][1][1][1] and i+duration <= N+1:
            new_sum = dp[i-1][1][0] + price
            if new_sum > dp[i-1][0][0]:
                dp[i][0] = [new_sum, [i, i+duration]]
                dp[i][1][0] = dp[i-1][1][0]
                dp[i][1][1] = dp[i-1][1][1]
            else:
                dp[i][1][0] = dp[i-1][1][0] + price
                dp[i][1][1] = [i, i+duration]

        # i가 차선의 종료일 보다 빠를 때
        else:
            before_sum = 0
            before_best_date = dp[i-1][1][1][0]
            if i >= dp[before_best_date][0][1][1]:
                before_sum = dp[before_best_date][0][0] + price
            elif i >= dp[before_best_date][1][1][1]:
                before_sum = dp[before_best_date][1][0] + price
            else:
                dp[i][1][0] = dp[i-1][1][0]
                dp[i][1][1] = dp[i-1][1][1]
                continue

            if before_sum > dp[i-1][1][0] and i+duration <= N+1:
                if before_sum > dp[i-1][0][0]:
                    dp[i][0] = [before_sum, [i, i+duration]]
                    dp[i][1][0] = dp[i-1][1][0]
                    dp[i][1][1] = dp[i-1][1][1]
                else:
                    dp[i][1] = [before_sum, [i, i+duration]]
            else:
                dp[i][1][0] = dp[i-1][1][0]
                dp[i][1][1] = dp[i-1][1][1]

# for d in dp:
#     print(d)
print(dp[-1][0][0])

# 01:06:21 틀렸습니다
# 01:12:49 값 갱신 부분 실수 있었음 -> 틀렸습니다.
# 01:28:12 값 갱신 부분 실수 있었음 -> 틀렸습니다.
# 01:28:40 포기. 로직이 너무 복잡하다.
# 내일 바로 다시 풀어보기. 미래를 결정하는 dp문제
