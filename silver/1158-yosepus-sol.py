import sys
from collections import deque


def input():
    return sys.stdin.readline().rstrip()


N, K = map(int, input().split())
_list = []
q = deque([i + 1 for i in range(N)])

while len(q) != 0:
    q.rotate(-K)  # 데크를 num만큼 회전한다(양수면 오른쪽, 음수면 왼쪽).
    _list.append(q.pop())  # 데크의 오른쪽 끝 엘리먼트를 가져오는 동시에 데크에서 삭제한다.

print('<' + ', '.join(map(str, _list)) + '>')
