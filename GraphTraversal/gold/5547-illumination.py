from collections import deque


W, H = map(int, input().split())

houses = []


for y in range(H):
    row = list(map(int, input().split()))
    houses.append(row)

cnt = 0


def light_check(i, j):
    global cnt
    movements_odd = [(-1, -1), (-1, 0), (0, 1), (1, 0), (1, -1), (0, -1)]
    movements_even = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (0, -1)]
    if i % 2 == 0:
        movements = movements_even[:]
    else:
        movements = movements_odd[:]

    for move in movements:
        ni = i + move[0]
        nj = j + move[1]

        if ni < 0 or ni >= H or nj < 0 or nj >= W:
            cnt += 1
            continue
        if ni >= 0 and ni < H and nj >= 0 and nj < W:
            if houses[ni][nj] == 0:
                cnt += 1
                continue

# def remove_check(i,j):
#     global cnt
#     empty_cnt = 0
#     movements = [(-1, -1), (0, -1), (1, 0), (0, 1), (-1, 1), (-1, 0)]
#     for move in movements:
#         ni = i + move[0]
#         nj = j + move[1]

#         if ni < 0 or ni >= H or nj < 0 or nj >= W:
#             cnt += 1
#             continue
#         if ni >= 0 and ni < H and nj >= 0 and nj < W:
#             if houses[ni][nj] == 0:
#                 cnt += 1
#                 continue


deq = deque()


def bfs(i, j):
    deq.append((i, j))
    path = {}
    movements_odd = [(-1, -1), (-1, 0), (0, 1), (1, 0), (1, -1), (0, -1)]
    movements_even = [(-1, 0), (-1, 1), (0, 1), (1, 1), (1, 0), (0, -1)]
    movements = []
    min_y = i
    max_y = 0
    while deq:
        house = deq.pop()
        houses[house[0]][house[1]] = -1

        if house[0] > max_y:
            max_y = house[0]

        if house[0] in path:
            path[house[0]].append(house[1])
        else:
            path[house[0]] = [house[1]]

        if house[0] % 2 == 0:
            movements = movements_even[:]
        else:
            movements = movements_odd[:]

        for move in movements:
            ni = house[0] + move[0]
            nj = house[1] + move[1]

            if ni >= 0 and ni < H and nj >= 0 and nj < W:
                if houses[ni][nj] == 1:
                    deq.append((ni, nj))
    for y in range(min_y, max_y+1):
        for x in range(min(path[y]), max(path[y])+1):
            # print((x+1, y+1))
            houses[y][x] = -1


for house in houses:
    print(house)

for i in range(H):
    for j in range(W):
        if houses[i][j] == 1:
            bfs(i, j)

print()
for house in houses:
    print(house)

for i in range(H):
    for j in range(W):
        if houses[i][j] == -1:
            light_check(i, j)


print(cnt)

# 01:18:43 틀렸습니다
# 01:24:35 종료 -> 2번째 테스트 케이스에서 문제 발견
# 집중력이 떨어져서인지.. 실수로 30분은 넘게 날림
# 다시 재도전 해보기

#  0 1 1 1 0 1 1 1
# 0 1 0 0 1 1 0 0
#  1 0 0 1 1 1 1 1
# 0 1 0 1 1 0 1 0
#  0 1 1 0 1 1 0 0
