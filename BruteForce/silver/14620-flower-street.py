N = int(input())
soils = []
prices_map = []
for _ in range(N):
    soils.append(list(map(int, input().split())))
    prices_map.append([False]*N)


def get_price(i, j):
    movements = [(0, 1), (1, 0), (-1, 0), (0, -1)]
    price = soils[i][j]
    for move in movements:
        nx = i+move[0]
        ny = j+move[1]
        if 0 <= nx < N and 0 <= ny < N:
            price += soils[nx][ny]
        else:
            return False
    return price


prices_dict = {}
for i in range(N):
    for j in range(N):
        prices_map[i][j] = get_price(i, j)
        if prices_map[i][j]:
            if prices_map[i][j] not in prices_dict:
                prices_dict[prices_map[i][j]] = (i, j)
            else:
                prices_dict[prices_map[i][j]].append((i, j))

prices_keys = list(set(prices_dict.keys()))
prices_keys.sort()

prices = []
for i in range(N):
    for j in range(N):
        prices_map[i][j] = get_price(i, j)
        if prices_map[i][j]:
            prices.append((prices_map[i][j], (i, j)))

for price in prices_map:
    print(price)
for price in prices:
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
        #     s += t[0]
        # solutions.append(s)


print(min(solutions))

# 00:30:28 2,3,5가 되면 안되는데 solutions에 추가되어있음
# 00:52:31 위에거 되도됨...  -> 40%에서 틀렸습니다
# 01:16:04 포기 -> 같은 값이 중복으로 존재하면 위 알고리즘으로 해결하지 못하는 케이스가 발생
# 문제는 발견했는데 해결을 못했다.
