from collections import deque

n = int(input())
houses = []
flag = 1
for i in range(n):
    houses.append(list(input()))


def bfs(i, j):
    deq = deque()
    deq.append([i, j])
    while deq:
        p = deq.pop()
        x = p[0]
        y = p[1]
        houses[x][y] = flag

        if x-1 >= 0 and houses[x-1][y] == '1':
            deq.append([x-1, y])
        if y-1 >= 0 and houses[x][y-1] == '1':
            deq.append([x, y-1])
        if x+1 < n and houses[x+1][y] == '1':
            deq.append([x+1, y])
        if y+1 < n and houses[x][y+1] == '1':
            deq.append([x, y+1])


for i in range(n):
    for j in range(n):
        if houses[i][j] == '1':
            bfs(i, j)
            flag += 1


counts = []
for i in range(flag-1):
    temp = 0
    for row in houses:
        temp += row.count(i+1)
    counts.append(temp)

counts.sort()

print(flag-1)
for i in counts:
    print(i)


# 00:15:00
# 무난했다. 기억이 가까워서 더 쉬운 느낌도 있음
