import itertools
import sys
N = int(input())

stats = []
for _ in range(N):
    stats.append(list(map(int, input().split())))

total_perm = list(itertools.permutations(range(N), 2))
minimum = 100*20
for i in range(N):
    combs = list(itertools.combinations(range(N), i+1))
    # print(combs)

    for a_comb in combs:
        b_comb = []
        for i in range(N):
            if i not in a_comb:
                b_comb.append(i)
        a_perm = list(itertools.permutations(a_comb, 2))
        b_perm = list(itertools.permutations(b_comb, 2))
        A_total = 0
        B_total = 0
        # print(['a_perm',a_perm])
        for partner in a_perm:
            A_total += stats[partner[0]][partner[1]]
        for partner in b_perm:
            B_total += stats[partner[0]][partner[1]]
        # for partner in total_perm:
        #     if partner in perm:
        #         A_total += stats[partner[0]][partner[1]]
        #     else:
        #         B_total += stats[partner[0]][partner[1]]
        # print(abs(A_total-B_total))
        minimum = min(abs(A_total-B_total), minimum)
        if minimum == 0:
            print(0)
            sys.exit()
print(minimum)

# 00:27:28 맞았습니다!
# perm,comb에 좀 더 익숙해질 필요는 있어보인다.
