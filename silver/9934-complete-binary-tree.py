import sys


def input():
    return sys.stdin.readline().rstrip()


K = int(input())

nodes = [-1 for _ in range(2**K-1)]


history_of_nodes = list(map(int, input().split()))

index = 0
for line in range(K)[::-1]:
    floor = []
    for fine_step in range(2**(K-line-1)):
        # nodes[(2**line-1)+fine_step*(2**(line+1))] = history_of_nodes[index]
        # floor.append(history_of_nodes[index])
        floor.append(history_of_nodes[(2**line-1)+fine_step*(2**(line+1))])
        index += 1
    print(str(floor)[1:-1].replace(',', ''))

# print(nodes)

# 00:43:43
# 적으면서 했으면 빨리했을텐데, 머리로만 한다고 좀 걸림
# 헷갈리기 좋은 문제였다
# inorder def로 recursion을 만들지 않아도 되는데, 생각없이 만들다 아닌걸 뒤늦게 깨달음
