N = int(input())
soils = []
prices_map = []
prices = []
for _ in range(N):
    soils.append(list(map(int, input().split())))
    prices_map.append([False]*N)


def get_price(i, j):
    movements = [(0, 1), (1, 0), (-1, 0), (0, -1)]
    price = 0
    for move in movements:
        nx = i+move[0]
        ny = j+move[1]
        if 0 <= nx < N and 0 <= ny < N:
            price += soils[nx][ny]
        else:
            return False
    return price


for i in range(N):
    for j in range(N):
        prices_map[i][j] = get_price(i, j)
        if prices_map[i][j]:
            prices.append((prices_map[i][j], (i, j)))

for price in prices_map:
    print(price)

prices.sort()

solutions = []

for i in range(len(prices)):
    temp = [prices[i]]

    for j in range(i, len(prices)):
        cx = prices[j][1][0]
        cy = prices[j][1][1]
        able = True
        for old in temp:
            ox = old[1][0]
            oy = old[1][1]
            if abs(ox-cx)+abs(oy-cy) < 3:
                able = False
                break
        if able:
            temp.append(prices[j])
        if len(temp) == 3:
            break

    if len(temp) == 3:
        solutions.append(temp)
        # s = 0
        # for t in temp:
        #     s+=t[0]
        # solutions.append(s)

for sol in solutions:
    print(sol)

print(min(solutions))

# 00:30:28 2,3,5가 되면 안되는데 solutions에 추가되어있음
