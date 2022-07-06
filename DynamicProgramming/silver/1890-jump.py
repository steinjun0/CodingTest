from collections import deque

N = int(input())
board = []
dp = []
for _ in range(N):
    board.append(list(map(int, input().split())))
    dp.append([0 for _ in range(N)])


def checkAvailable(i, j):
    if i < N and j < N:
        return True
    else:
        return False


deq = deque()


def appendNextPoint(i, j):
    poten = board[i][j]

    if checkAvailable(i+poten, j):
        deq.appendleft((i+poten, j))

    if checkAvailable(i, j+poten):
        deq.appendleft('*')
        deq.appendleft((i, j+poten))
    return False


for i in range(2, N+1):
    deq.append((N-i, N-i))
    path = []
    while deq:
        point = deq.popleft()
        # for dd in dp:
        #     print(dd)
        # print(deq)
        # print(path)
        # print(point)
        # print()

        if point == (N-1, N-1):
            for p in path:
                dp[p[0]][p[1]] += 1
            path.pop()
            continue

        if point == '*':
            path.pop()
            continue

        if dp[point[0]][point[1]] != 0:
            for p in path:
                dp[p[0]][p[1]] += dp[point[0]][point[1]]
            # path.pop()
            continue
        path.append(point)

        if point[0] >= N or point[1] >= N:
            path.pop()
            continue
        else:
            if not appendNextPoint(point[0], point[1]):
                pass
                # deq.append('*')
print(dp[0][0])

# cnt = 0
# while deq:
#     point = deq.leftpop()

#     if point == (N-1, N-1):
#         cnt += 1
#         continue
#     else:
#         appendNextPoint(point[0], point[1])

# print(cnt)

# 00:16:19 시간 초과
# 01:38:00 dp 적용 -> 6% 틀림
# 01:43:33 가장 작은 범위에서 dp 실행 안된것 발견 -> 6% 틀림 -> 포기
