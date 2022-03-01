T = int(input())
result = []
for i in range(T):
    M, N, K = (map(int, input().split(' ')))
    position = []
    for i in range(K):
        position.append(list(map(int, input().split(' '))))

    areas = []
    for index, pos in enumerate(position):
        if index == 0:
            areas.append([pos])
            continue
        else:
            for area in areas:
                for p_index, p in enumerate(area):
                    if (pos[0] == p[0] and pos[1]-1 == p[1]) or \
                        (pos[0]+1 == p[0] and pos[1] == p[1]) or \
                        (pos[0] == p[0] and pos[1]+1 == p[1]) or \
                            (pos[0]-1 == p[0] and pos[1] == p[1]):
                        area.append(pos)
                        break
                        # print(pos)
                    else:
                        if p_index == (len(area)-1):
                            areas.append([pos])
                break
    print(len(areas))
