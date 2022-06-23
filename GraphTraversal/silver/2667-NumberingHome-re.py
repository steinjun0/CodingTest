from collections import deque


N = int(input())
map_data = []
for i in range(N):
    map_data.append(list(input()))

flag = 1

deq = deque()

count_table = {}


def dfs(i, j):
    deq.append([i, j])
    count_table[flag] = 0
    while deq:
        p = deq.pop()
        if map_data[p[0]][p[1]] == '1':
            count_table[flag] += 1
        map_data[p[0]][p[1]] = flag

        # print(f'{p[0]},{p[1]} = {flag}')
        if p[0]+1 < N:
            if map_data[p[0]+1][p[1]] == '1':
                deq.append([p[0]+1, p[1]])
        if p[1]+1 < N:
            if map_data[p[0]][p[1]+1] == '1':
                deq.append([p[0], p[1]+1])
        if p[0]-1 >= 0:
            if map_data[p[0]-1][p[1]] == '1':
                deq.append([p[0]-1, p[1]])
        if p[1]-1 >= 0:
            if map_data[p[0]][p[1]-1] == '1':
                deq.append([p[0], p[1]-1])


# for i in map_data:
#     print(i)

i = 0
while i < N:
    j = 0
    while j < N:
        if map_data[i][j] == '0':
            pass
        if map_data[i][j] == '1':
            dfs(i, j)
            flag += 1
        else:
            pass
        j += 1
    i += 1

counts = list(count_table.values())
counts.sort()

print(len(counts))
for i in counts:
    print(i)


# 00:40:21 solve


# bfs 구현에 실수가 몇 개 있었음. 익숙해져야한다.
