import sys


def input():
    return sys.stdin.readline().rstrip()


N = int(input())

image = []
for _ in range(N):

    image.append(list(map(int, input())))

result = '('


def check(sp, ep):
    # print([sp, ep])
    global result
    first_range = (sp, [(ep[0]-sp[0]+1)//2 + sp[0] -
                   1, (ep[1]-sp[1]+1)//2 + sp[1] - 1])
    second_range = ([sp[0], (ep[1]-sp[1]+1)//2 + sp[1]],
                    [(ep[0]-sp[0]+1)//2 + sp[0] - 1, ep[1]])
    third_range = ([(ep[0]-sp[0]+1)//2 + sp[0], sp[1]],
                   [ep[0], (ep[1]-sp[1]+1)//2 + sp[1] - 1])
    fourth_range = ([(ep[0]-sp[0]+1)//2 + sp[0],
                    (ep[1]-sp[1]+1)//2 + sp[1]], ep)

    queue = [first_range, second_range, third_range, fourth_range]
    for nsp, nep in queue:
        flag = image[nsp[0]][nsp[1]]
        for i in range(nsp[0], nep[0]+1):
            for j in range(nsp[1], nep[1]+1):
                if image[i][j] != flag:
                    result += '('
                    check(nsp, nep)
                    result += ')'
                    flag = -1
                    break
            if flag == -1:
                break
        if flag != -1:
            result += str(flag)


flag = image[0][0]
for i in range(N):
    for j in range(N):
        if image[i][j] != flag:
            flag = -1
            break
    if flag == -1:
        break

if flag != -1:
    print(f'{image[0][0]}')
else:
    check([0, 0], [N-1, N-1])
    result += ')'
    print(result)

# 00:51:09 81% -> 틀렸습니다
# 00:59:10 N이 1일 때 예외처리 -> 대기만 3분 이상 -> 85% 틀렸습니다
# 01:10:37 전체가 같은 숫자일 때, 규칙 다른 부분 수정 -> 대기만 3분 이상(왜 이렇게 길지) -> 맞았습니다!
