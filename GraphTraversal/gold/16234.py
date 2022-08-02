import sys
from collections import deque


def input():
    return sys.stdin.readline().rstrip()


N, L, R = map(int, input().split())

country = []
for _ in range(N):
    country.append(list(map(int, input().split())))

movements = [(1, 0), (0, 1), (-1, 0), (0, -1)]

union = [[-1 for _ in range(N)] for _ in range(N)]

flag = 0

union_dict = {}


def bfs(i, j):
    global flag
    global union_dict
    flag += 1
    deq = deque()
    deq.append((i, j))

    union[i][j] = flag
    union_dict[flag] = [(i, j)]
    while deq:
        x, y = deq.pop()
        for move in movements:
            nx = x+move[0]
            ny = y+move[1]
            if 0 <= nx < N and 0 <= ny < N:
                if union[nx][ny] == -1:
                    if L <= abs(country[nx][ny] - country[x][y]) <= R:
                        union[nx][ny] = flag
                        deq.append((nx, ny))
                        union_dict[flag].append((nx, ny))


day = 0
while True:
    union_dict = {}
    union = [[-1 for _ in range(N)] for _ in range(N)]
    for i in range(N):
        for j in range(N):
            if union[i][j] == -1:
                bfs(i, j)
    if len(union_dict.keys()) == N*N:
        break
    day += 1

    for flag in union_dict:
        total_population = 0
        for point in union_dict[flag]:
            total_population += country[point[0]][point[1]]
        each_population = total_population // len(union_dict[flag])
        for point in union_dict[flag]:
            country[point[0]][point[1]] = each_population

# for i in union:
#     print(i)

# for i in country:
#     print(i)

print(day)

# 00:31:00 맞았습니다!
