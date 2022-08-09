import copy
N, M = map(int, input().split())

cnt = 0


def next_false_step(map_data, i, j):
    global cnt

    if j+1 < M:
        next_true_step(map_data, i, j+1)
        next_false_step(map_data, i, j+1)
    elif i+1 < N:
        next_true_step(map_data, i+1, 0)
        next_false_step(map_data, i+1, 0)
    else:
        cnt += 1


def next_true_step(map_data, i, j):
    global cnt
    # temp = copy.deepcopy(map_data)
    temp = map_data[:]
    # print((M)*i+j)
    temp[(M)*i+j] = True
    # for t in temp:
    #     print(t)
    # print()
    if 0 <= i-1 < N and 0 <= j-1 < M:
        if temp[(M)*(i-1)+(j-1)] and temp[(M)*i + (j-1)] and temp[(M)*(i-1)+j]:
            # for t in temp:
            #     print(t)
            # print()
            return

    if j+1 < M:
        next_true_step(temp, i, j+1)
        next_false_step(temp, i, j+1)
    elif i+1 < N:
        next_true_step(temp, i+1, 0)
        next_false_step(temp, i+1, 0)
    else:
        cnt += 1


map_data = [False for _ in range(M*N)]


next_false_step(map_data, 0, 0)
next_true_step(map_data, 0, 0)

print(cnt)

# 00:31:31 1% 시간초과
# 00:40:06 2차원 배열 1차원으로 변경 -> 맞았습니다!
