N = int(input())
numbers = []
dp = []
for _ in range(N):
    row = list(map(int, input().split()))
    numbers.append(row)
    dp.append([False for _ in range(N)])

dp[0][0] = 1
dp[N-1][N-1] = 0

for i in range(N):
    for j in range(N):
        if i == N-1 and j == N-1:
            break

        if dp[i][j]:
            count = dp[i][j]
            power = numbers[i][j]

            next_points = [(i, j+power), (i+power, j)]
            for np in next_points:
                if 0 <= np[0] < N and 0 <= np[1] < N:
                    dp[np[0]][np[1]] += count

            # print((i, j))
            # for row in dp:
            #     print(row)
            # print()

print(dp[N-1][N-1])

# for row in dp:
#     print(row)

# 00:20:41 50%에서 틀렸습니다.
# 00:25:20 마지막 출력 dp[N-1][N-1] False -> 0으로 수정 -> 맞았습니다.
# 참 신기하다. 저번에 풀때는 끝까지 못풀었던걸 이렇게 푸는 걸 보면