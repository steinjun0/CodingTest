import sys
N = int(input())

dp = [[0, 1, 1, 1, 1, 1, 1, 1, 1, 1]]


def get_before_numbers(n):
    if n == 0:
        return [1]
    if n == 9:
        return [8]
    else:
        return [n+1, n-1]


if N == 1:
    print(sum(dp[-1]))
    sys.exit()
for i in range(1, N):
    dp.append([0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
    for number in range(10):
        before_numbers = get_before_numbers(number)
        for before_number in before_numbers:
            dp[i][number] += dp[i-1][before_number]
    # for d in dp:
    #     print(d)
    # print()
print(sum(dp[-1]) % 1000000000)

# 00:25:20 맞았습니다!
