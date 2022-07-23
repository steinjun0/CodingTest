import itertools

N = int(input())

origin_eggs = []
for _ in range(N):
    origin_eggs.append(list(map(int, input().split())))


perms = itertools.product(range(N), repeat=N)


# print(list(perms))
max_cnt = 0
for perm in perms:
    print(perm)
    eggs = [i[:] for i in origin_eggs]
    cnt = 0
    for i in range(N):
        if N-i + cnt < max_cnt:
            break
        if i == perm[i]:
            continue

        if eggs[i][0] <= 0:
            continue
        else:
            if eggs[perm[i]][0] <= 0:
                continue
            else:
                eggs[perm[i]][0] -= eggs[i][1]
                eggs[i][0] -= eggs[perm[i]][1]
                if eggs[perm[i]][0] <= 0:
                    cnt += 1
                if eggs[i][0] <= 0:
                    cnt += 1
    # for i in range(N):
    #     if eggs[i][0] <= 0:
    #         cnt += 1
    # if cnt == 3:
    #     print(perm)
    #     print(eggs)
    #     print(cnt)
    max_cnt = max(max_cnt, cnt)

print(max_cnt)
