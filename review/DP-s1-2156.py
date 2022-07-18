N = int(input())
dp = [[0, 0, 0] for _ in range(N)]
for i in range(N):
    wine = int(input())

    if i == 0:
        dp[0] = [wine, 0, 0]
        continue
    if i == 1:
        dp[1] = [dp[0][0]+wine, wine, 0]
        continue
    if i == 2:
        dp[2] = [dp[1][1]+wine, dp[0][0]+wine, dp[1][0]]
        continue

    dp[i] = [dp[i-1][1]+wine, dp[i-1][2]+wine, max(dp[i-1])]

# print(dp)
print(max(dp[-1]))

# 00:29:14 틀렸습니다.
# 00:36:51 0 들어올 때 예외처리 -> 틀렸습니다
# 00:40:51 이전 최대값을 잃지 않도록 수정 -> 맞았습니다!

# dp에 3가지 케이스를 모두 들고 다니는 접근은 맞는듯 하다
# 그중 과거의 최대값이 사라지지 않도록 하는 로직은 꼭 들어가야한다.

# 답을 쭉 살펴보니 점화식을 사용해서 dp에 max값 하나만 넣어놓은 풀이가 정석으로 보인다.
# 내가 저 방식을 택하지 않은건, 모든 경우를 커버할 수 없을 것 같아서 전부 풀어놨던 건데..
# (dp에 저장된 값은 무조건 해당 위치의 와인을 마신걸로 가정(안마셨더라도))
# ?  ?   ?   max  x
# ?  ?  max   x   o
# ? max  x    o   o
#
# 이렇게 생각하면 모든 케이스가 다 커버 되는 게 눈에 보인다.

# 연습연습
