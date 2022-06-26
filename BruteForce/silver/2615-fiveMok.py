from collections import deque
rocks = []
for i in range(19):
    rocks.append(list(map(int, input().split())))


def bfs(color, in_i, in_j):
    deq = deque()
    deq.append([in_i, in_j])
    group = []
    movement = [[1, 0], [1, 1], [1, -1], [0, 1],
                [0, -1], [-1, 0], [-1, 1], [-1, -1]]
    # movement = [[1, 0], [1, 1], [0, 1], [-1, 1]]
    while deq:
        [i, j] = deq.pop()
        group.append([i, j])

        for m in movement:
            if i+m[0] > 0 and i+m[0] < 19 and j+m[1] > 0 and j+m[1] < 19:
                if rocks[i+m[0]][j+m[1]] == color and [i+m[0], j+m[1]] not in group:
                    deq.append([i+m[0], j+m[1]])

    print(group)
    for vector in movement:
        is_win = True
        length = 1
        for i, v in enumerate(group):
            # print([group[i][0] + vector[0], group[i][1]+vector[1]])
            # print(group[i+1])
            if [group[i][0] + vector[0], group[i][1]+vector[1]] in group:
                length += 1
                continue
            is_win = False
            break

        # checker = group[0]
        # while True:
        #     print([checker[0] + vector[0], checker[1]+vector[1]])
        #     if [checker[0] + vector[0], checker[1]+vector[1]] in group:
        #         continue
        #     is_win = False
        #     break

        if is_win and length >= 5:
            return [color, group[0]]
    return False


def check_winner():

    for i in range(19):
        for j in range(19):
            if rocks[i][j] != 0:
                # print(rocks[i][j], i, j)
                result = bfs(rocks[i][j], i, j)
                if result != False:
                    print(result[0])
                    print(f'{result[1][0]+1} {result[1][1]+1}')
                    print()
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
