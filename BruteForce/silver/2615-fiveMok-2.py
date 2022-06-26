from collections import deque
rocks = []
black = []
white = []
for i in range(19):
    elems = list(map(int, input().split()))
    for j, v in enumerate(elems):
        if v == 1:
            black.append([i, j])
        if v == 2:
            white.append([i, j])

    rocks.append(elems)


def check_black(start):
    movement = [[1, 0], [1, 1], [1, -1], [0, -1]]

    for vector in movement:
        group = [start]
        while True:
            if [group[-1][0] + vector[0], group[-1][1] + vector[1]] in black:
                group.append([group[-1][0] + vector[0],
                              group[-1][1] + vector[1]])
                continue
            break

        if len(group) >= 5:
            return [1, group[0]]
    return False


def check_white(start):
    movement = [[1, 0], [1, 1], [1, -1], [0, -1]]

    for vector in movement:
        group = [start]
        while True:
            if [group[-1][0] + vector[0], group[-1][1] + vector[1]] in white:
                group.append([group[-1][0] + vector[0],
                              group[-1][1] + vector[1]])
                continue
            break

        if len(group) >= 5:
            return [2, group[0]]
    return False


def check_winner():
    for i in black:
        result = check_black(i)
        if result != False:
            print(result[0])
            print(f'{result[1][0]+1} {result[1][1]+1}')
            return

    for i in white:
        result = check_white(i)
        if result != False:
            print(result[0])
            print(f'{result[1][0]+1} {result[1][1]+1}')
            return
    print(0)


check_winner()


# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 1 2 0 0 2 2 2 1 0 0 0 0 0 0 0 0 0 0
# 0 0 1 2 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0
# 0 0 0 1 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 1 2 2 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 1 1 0 2 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 2 1 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 2 1 2 1 0 0 0 0 0 0 0 0 0 0
# 0 1 0 0 0 2 0 0 1 0 0 0 0 0 0 0 0 0 0
# 0 1 0 1 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 1 0 2 1 2 2 0 0 0 0 0 0 0 0 0 0 0 0
# 0 1 2 1 0 2 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 2 0 0 0 2 1 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

# 39분경 제출 -> 오답
# 00:49:11 -> 11%에서 오답
# 01:08:03 알고리즘 변경 -> 11%에서 오답
# 01:10:32 실패
