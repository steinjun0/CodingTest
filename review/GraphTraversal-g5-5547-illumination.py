from collections import deque
W, H = map(int, input().split())

houses = []
for _ in range(H):
    row = list(map(int, input().split()))
    houses.append(row)


visited = [[False for _ in range(W)]for _ in range(H)]


def check_inner(i, j):
    if visited[i][j]:
        return
    deq = deque()
    deq.append((i, j))
    sector = []
    while deq:
        (x, y) = deq.pop()
        if houses[x][y] == 0:
            visited[x][y] = True
            sector.append((x, y))
            for np in [(x, y+1), (x, y-1)]:
                if 0 <= np[0] < H and 0 <= np[1] < W and not visited[np[0]][np[1]]:
                    deq.append(np)
            if x % 2 == 0:
                for np in [(x-1, y), (x-1, y+1), (x+1, y), (x+1, y+1)]:
                    if 0 <= np[0] < H and 0 <= np[1] < W and not visited[np[0]][np[1]]:
                        deq.append(np)
            elif x % 2 == 1:
                for np in [(x-1, y), (x-1, y-1), (x+1, y), (x+1, y-1)]:
                    if 0 <= np[0] < H and 0 <= np[1] < W and not visited[np[0]][np[1]]:
                        deq.append(np)
    isInner = True
    # print(sector)
    # print()
    for point in sector:
        if point[0] == 0 or point[0] == (H-1) or point[1] == 0 or point[1] == (W-1):
            isInner = False

    if isInner:
        for point in sector:
            houses[point[0]][point[1]] = 1


cnt = 0


def get_outline(i, j):
    global cnt
    if visited[i][j]:
        return
    deq = deque()
    deq.append((i, j))
    sector = []
    while deq:
        (x, y) = deq.pop()
        if houses[x][y] == 1:
            visited[x][y] = True
            sector.append((x, y))
            for np in [(x, y+1), (x, y-1)]:
                if 0 <= np[0] < H and 0 <= np[1] < W and not visited[np[0]][np[1]]:
                    deq.append(np)
            if x % 2 == 0:
                for np in [(x-1, y), (x-1, y+1), (x+1, y), (x+1, y+1)]:
                    if 0 <= np[0] < H and 0 <= np[1] < W and not visited[np[0]][np[1]]:
                        deq.append(np)
            elif x % 2 == 1:
                for np in [(x-1, y), (x-1, y-1), (x+1, y), (x+1, y-1)]:
                    if 0 <= np[0] < H and 0 <= np[1] < W and not visited[np[0]][np[1]]:
                        deq.append(np)
    # print(sector)
    # print()
    sector = list(set(sector))
    for point in sector:
        x = point[0]
        y = point[1]
        next_points = [(x, y+1), (x, y-1)]
        if x % 2 == 0:
            for np in [(x-1, y), (x-1, y+1), (x+1, y), (x+1, y+1)]:
                next_points.append(np)
        elif x % 2 == 1:
            for np in [(x-1, y), (x-1, y-1), (x+1, y), (x+1, y-1)]:
                next_points.append(np)

        for np in next_points:
            if 0 > np[0] or np[0] >= H or 0 > np[1] or np[1] >= W:
                cnt += 1
                continue
            if 0 <= np[0] < H and 0 <= np[1] < W:
                if houses[np[0]][np[1]] == 0:
                    cnt += 1


for i in range(H):
    for j in range(W):
        if houses[i][j] == 0:
            check_inner(i, j)

# for row in houses:
#     print(row)

visited = [[False for _ in range(W)]for _ in range(H)]

for i in range(H):
    for j in range(W):
        if houses[i][j] == 1:
            get_outline(i, j)

print(cnt)

# 01:04:26 맞았습니다!
# x,y가 뒤집히고, 문제 설명에 적힌 지도 제작 방법이
# 너무 헷갈리게 적혀있어서 구현에서 시간을 많이 씀
# 다음에는 x,y를 그냥 맞게 쓰자. 수식을 구현하기가 힘들다.
