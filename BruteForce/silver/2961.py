import itertools

N = int(input())

foods = []
for _ in range(N):
    foods.append(list(map(int, input().split())))

minimum = 1000000000
for i in range(N):
    # print(list(itertools.combinations(range(N), i+1)))
    combs = list(itertools.combinations(range(N), i+1))
    for comb in combs:
        total_s = 1
        total_b = 0
        for food_index in comb:
            [s, b] = foods[food_index]
            total_s *= s
            total_b += b
        minimum = min(abs(total_s-total_b), minimum)
print(minimum)

# 00:10:57 너무 단순한 문제, 한 문제 더 풀기