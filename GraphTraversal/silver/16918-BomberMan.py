import sys


# def input():
#     return sys.stdin.readline().rstrip()


R, C, N = map(int, input().split())


initial_map = []
grid = []
previus_grid = [[-1 for _ in range(C)] for _ in range(R)]
for _ in range(R):
    row = list(input())
    initial_map.append(row)

    temp = []
    for index, i in enumerate(row):
        if i == 'O':
            temp.append(1)
        elif i == '.':
            temp.append(-1)

    grid.append(temp)

dx = [0, 0, 1, -1]
dy = [1, -1, 0, 0]


def update():
    global grid
    global previus_grid

    for i in range(R):
        for j in range(C):
            grid[i][j] += 1

    for i in range(R):
        for j in range(C):
            if previus_grid[i][j] == 2:
                grid[i][j] = -1
                for k in range(4):
                    if (0 <= i+dx[k] < R) and (0 <= j+dy[k] < C):
                        grid[i+dx[k]][j+dy[k]] = -1


# update()
# if N == 1 or N == 0:
#     for row in grid:
#         print(row)

# else:
#     for i in range(N-1):
#         for index, row in enumerate(grid):
#             previus_grid[index] = row[:]

#         update()
#         for row in grid:
#             print(row)
#         print()

if N == 1 or N == 0:
    for row in grid:
        for item in row:
            if item == -1:
                print('.', end='')
            else:
                print('O', end='')
        print()
else:
    for i in range(N-1):
        for index, row in enumerate(grid):
            previus_grid[index] = row[:]
        update()
    for row in grid:
        for item in row:
            if item == -1:
                print('.', end='')
            else:
                print('O', end='')
        print()
        # print('\n')

# 01:21:52 (0, O 헷갈린 시간 포함)
# 00:44:00 (순수 알고리즘 고민 및 구현 시간)
# 큰 그림을 보자. 내가 생각하는 더 나은 코드
# https://jae-eun-ai.tistory.com/15
