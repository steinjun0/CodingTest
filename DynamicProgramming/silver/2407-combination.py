n, m = map(int, input().split())

# n, n-1, ..., n-(m-1)
# m, m-1, ..., 1

dp = [0] * 101
dp[0] = 1
dp[1] = 1
for i in range(2, 101):
    dp[i] = dp[i-1] * i

# print(dp)

temp = int(dp[n]//dp[n-m])
print(int(temp//dp[m]))


# print(dp)
# i = 1
# son = n
# mom = m
# while i < m:
#     son *= n-i
#     mom *= m-i
#     i += 1

# print(int(son/mom))

# 00:40:00 걸림. 몫으로 나누어야 하는걸 몰랐음(추후 찾아봐야함)
