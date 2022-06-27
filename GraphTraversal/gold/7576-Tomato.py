import sys
from collections import deque


m, n = map(int, input().split())

tomatos = []
goods = []
for i in range(n):
    row = list(map(int, input().split()))
    for index, tom in enumerate(row):
        if tom == 1:
            goods.append((i, index))
    tomatos.append(row)

# 전부 익어 있을 때
if len(goods) == m*n:
    print(0)
    sys.exit(0)

# 익은게 없을 때
if len(goods) == 0:
    print(-1)
    sys.exit(0)

starts = goods[:]
starts = deque(starts)
starts.append('*')
day = 0
while True:
    start = starts.popleft()
    if start == '*':
        if len(starts) == 0:
            break
        day += 1
        starts.append('*')
        continue

    movements = [(1, 0), (-1, 0), (0, 1), (0, -1)]
    for movment in movements:
        nx = movment[0]+start[0]
        ny = movment[1]+start[1]

        if nx >= 0 and nx < n and ny >= 0 and ny < m and tomatos[nx][ny] == 0:
            tomatos[nx][ny] = 1
            # if (nx, ny) not in starts:
            starts.append((nx, ny))

for i in tomatos:
    for j in i:
        if j == 0:
            print(-1)
            sys.exit(0)
print(day)

# 00:30:09 시간초과 -> while 탈출 조건 변경
# 00:32:00 시간초과 -> deque push 조건 제거
# 00:40:15 성공
# while 탈출 조건 잘 못 설정했었음. 수정 후 성공
