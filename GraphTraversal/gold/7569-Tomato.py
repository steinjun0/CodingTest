from collections import deque
import sys
M, N, H = map(int, input().split())

tomatos = []
deq = deque()
for h, _ in enumerate(range(H)):
    floor = []
    for y, _ in enumerate(range(N)):
        row = list(map(int, input().split()))
        for x, i in enumerate(row):
            if i == 1:
                deq.append((h, y, x))
        floor.append(row)
    tomatos.append(floor)


def proceed(tomato):
    movements = [(-1, 0, 0), (1, 0, 0), (0, 0, -1),
                 (0, 0, 1), (0, 1, 0), (0, -1, 0)]
    for move in movements:
        nh = move[0]+tomato[0]
        ny = move[1]+tomato[1]
        nx = move[2]+tomato[2]

        if nh >= 0 and nh < H and ny >= 0 and ny < N and nx >= 0 and nx < M:
            if tomatos[nh][ny][nx] == 0:
                deq.append((nh, ny, nx))
                tomatos[nh][ny][nx] = 1


cnt = 0
deq.append('*')
while len(deq) > 1:
    tomato = deq.popleft()

    if tomato == '*':
        deq.append('*')
        cnt += 1
        continue

    proceed(tomato)

for i in range(H):
    for j in range(N):
        for k in range(M):
            if tomatos[i][j][k] == 0:
                print(-1)
                sys.exit()
print(cnt)

# 00:19:50 통과
