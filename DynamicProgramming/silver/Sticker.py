T = int(input())

stickers_list = []
n_list = []
for _ in range(T):
    n_list.append(int(input()))

    stickers = []
    for _ in range(2):
        stickers.append(list(map(int, input().split())))
    stickers_list.append(stickers)

for index_stickers, stickers in enumerate(stickers_list):
    n = n_list[index_stickers]
    search_list = [[0], [1], [2], [3]]
    for i in range(T):
        next_list = []
        for serial in search_list:
            temp = serial[:]
            for j in range(3):
                if serial[-1] + j + 2 < n:
                    next_list.append(temp+[serial[-1] + j + 2])
                elif next_list[-1] != temp:
                    next_list.append(temp)
        search_list = next_list[:]

    print(search_list)

    best = 0
    for first_line in search_list:
        sum = 0
        for index, i in enumerate(first_line):
            sum += stickers[0][i]
            t = sum

            if i == 1:
                sum += stickers[1][0]

            if index == 0 and i == 2:
                sum += stickers[1][0]

            if index == 0 and i == 3:
                sum += stickers[1][2]+stickers[0][0]

            if index >= 3 and first_line[index] - first_line[index-1] == 4:
                sum += max([stickers[1][i-2], stickers[1]
                            [i-3], stickers[1][i-4]])
            elif index >= 2 and first_line[index] - first_line[index-1] == 3:
                sum += max([stickers[1][i-2], stickers[1]
                            [i-3], stickers[1][i-4]])
            elif index >= 1 and first_line[index] - first_line[index-1] == 2:
                sum += stickers[1][i-1]

            if index+1 == len(first_line):
                if (n-1)-i == 1:
                    sum += stickers[1][n-1]
                elif (n-1)-i == 2:
                    sum += max(stickers[1][n-1], stickers[1][n-2])
                elif (n-1)-i == 2:
                    sum += max(stickers[1][n-2]+stickers[0][n], stickers[1]
                               [n-3] + stickers[1][n-1] + stickers[0][n-2])

            # print(sum-t)

        if sum > best:
            best = sum

    print(best)
    # first_try = 0
    # try_history = [[[0] for _ in range(T)] for _ in range(2)]
    # for i in range(T):
    #     if i == 0:
    #         try_history[0][0] = stickers[0][0]

    #     if i % 2 == 0:
    #         try_history[0][i] += stickers[1][i-1]
    #     else:
    #         try_history[1][i] += stickers[0][i-1]

    # if (T-1)%2 == 0:
    #     is_even = True

    # for i in range(T)[::-1]:
    #     if i == 0:
    #         try_history[0][0] = stickers[0][0]

    #     if i % 2 == 0:
    #         try_history[0][i]
    #     else:
    #         try_history[1][i] += stickers[0][i-1]

# 01:47:38 실패(포기)
