import sys
from collections import deque

m, n = map(int, input().split())

tomatos = []
for i in range(n):
    tomatos.append(list(map(int, input().split())))

deq = deque()

for i in range(n):
    for j in range(m):
        if tomatos[i][j] == 1:
            deq.append((i, j))

day = 0
while True:
    presents = []
    while deq:
        presents.append(deq.pop())

    for present in presents:
        for movement in [(0, 1), (1, 0), (-1, 0), (0, -1)]:
            dx = present[1]+movement[1]
            dy = present[0]+movement[0]
            if dx >= 0 and dx < m and dy >= 0 and dy < n:
                if tomatos[dy][dx] == 0:
                    tomatos[dy][dx] = 1
                    deq.append((dy, dx))

    if len(deq) == 0:
        break

    day += 1

for i in range(n):
    for j in range(m):
        if tomatos[i][j] == 0:
            print(-1)
            sys.exit()

print(day)

# 00:18:49 통과
