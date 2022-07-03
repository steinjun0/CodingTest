import sys
stones = []
for _ in range(19):
    stones.append(list(map(int, input().split())))


def checkSuccess(i, j):
    color = stones[i][j]
    for m in [(-1, 1), (1, 0), (1, 1), (0, 1)]:
        count = 1
        point = (i, j)

        while True:
            if point[0]+m[0] >= 0 and point[0]+m[0] < 19 and point[1]+m[1] >= 0 and point[1]+m[1] < 19:
                if stones[point[0]+m[0]][point[1]+m[1]] == color:
                    count += 1
                    point = (point[0]+m[0], point[1]+m[1])
                else:
                    break
            else:
                break
        if count == 5:
            if i-m[0] >= 0 and i-m[0] < 19 and j-m[1] >= 0 and j-m[1] < 19:
                if stones[i-m[0]][j-m[1]] == color:
                    break
            return (i, j)
    return False


for i in range(19):
    for j in range(19):
        if stones[i][j] != 0:
            result = checkSuccess(i, j)
            if result != False:
                print(stones[i][j])
                print(f'{i+1} {j+1}')
                sys.exit(0)

print(0)

# 00:17:32 틀렸습니다(17%)
# 00:18:30 실수발견 -> 틀렸습니다(11%)
# 00:23:10 6목 처리 안된거 발견 -> 틀렸습니다 11%
# 00 29:51 부등호 등호 빠진거 확인(>0 -> >=0) -> 틀렸습니다 11%
# 00:31:30 color 값이 잘 못 초기화되는 부분 발견 -> unboundLocalError
# 00:32:30 실수 수정 -> 틀렸습니다 11%
# 00:37:26 다음 돌 계산 부분 범위 제한 조건 없어서 추가 -> 틀렸습니다 11%
# 01:00:00 실패. 못찾겠다.

# -> 방향 벡터 잘못 설정했던거...

# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 1 1 1 1 0 0 2 1 1 0 0 0 0 0 0 0 0 0 0
# 1 0 1 2 2 0 0 0 1 0 0 0 0 0 0 0 0 0 0
# 1 1 2 1 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 1 2 0 0 2 1 2 0 0 0 0 0 0 0 0 0 0 0 0
# 1 1 1 1 0 2 2 0 0 0 0 0 0 0 0 0 0 0 0
# 1 0 0 0 0 0 2 1 0 0 0 0 0 0 0 0 0 0 0
# 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
# 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
