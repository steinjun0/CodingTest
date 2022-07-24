from math import log


N = int(input())
rule = [[True, True, True], [True, False, True], [True, True, True]]
basic = [['*', '*', '*'], ['*', ' ', '*'], ['*', '*', '*']]
shapes = [[[' ' for _ in range(3**i)]
           for _ in range(3**i)] for i in range(8)]
shapes[1] = basic
pow = 1
for pow in range(2, round(log(N, 3)+1)):
    for i in range(3):
        for j in range(3):
            start = (i*(3**(pow-1)), j*(3**(pow-1)))
            for x in range(3**(pow-1)):
                for y in range(3**(pow-1)):
                    if 3**(pow-1) <= x+start[0] <= 2*(3**(pow-1))-1 and 3**(pow-1) <= y+start[1] <= 2*(3**(pow-1))-1:
                        continue
                    # print([pow, start, x, y])
                    shapes[pow][x+start[0]][y+start[1]] = shapes[pow-1][x][y]
for s in shapes[pow]:
    temp = ''
    for k in s:
        temp += k
    print(temp)

# 00:53:57 틀렸습니다. ???
# 00:59:00 log연산에 반올림추가  -> 100%에서 runtime 에러. ????
# 01:01:10 N=3일때 예외처리 -> 정답
# 은근히 초반에 많이 헤맨 문제.
# 이 방식을 잊지말자
# (근데 좀 시간복잡도를 많이 먹는 방식으로 느껴짐)
