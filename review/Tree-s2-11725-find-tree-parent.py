from collections import deque
n = int(input())


nodes = {}
parents = {}
deq = deque()

for _ in range(n-1):
    connection = list(map(int, input().split()))

    if 1 in connection:
        if connection[0] == 1:
            child = connection[1]
        else:
            child = connection[0]
        parents[child] = 1
        deq.append(child)
        continue

    if connection[0] not in nodes:
        nodes[connection[0]] = [connection[1]]
    else:
        nodes[connection[0]].append(connection[1])

    if connection[1] not in nodes:
        nodes[connection[1]] = [connection[0]]
    else:
        nodes[connection[1]].append(connection[0])


while deq:
    parent = deq.popleft()
    if parent in nodes:
        children = nodes[parent]
    else:
        continue
    for child in children:
        parents[child] = parent
        nodes[child].remove(parent)
        deq.append(child)

for i in range(n-1):
    if i+2 in parents:
        print(parents[i+2])

# 00:27:30 제출 -> 7% key error
# 00:34:10 필요없는 구문 하나 제거(parent 빈 배열로 초기화) -> 7% key error
# 00:36:07 출력 구문에 key error 검사 코드 추가 -> 7% key error
# 00:38:31 말단 노드에 대해서 key error 검사 -> 통과
