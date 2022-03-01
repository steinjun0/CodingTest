def combCount(t, n):
    top = 1
    bottom = 1
    for i in range(t-n+1, t+1):
        if i == 0:
            continue
        top *= i

    for i in range(n+1):
        if i == 0:
            continue
        bottom *= i

    return int(top/bottom)


T = int(input())
result = []
for i in range(T):
    N, M = (map(int, input().split(' ')))
    result.append(combCount(M, M-N))

for r in result:
    print(r)
