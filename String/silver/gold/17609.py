from collections import deque
import sys


def input():
    return sys.stdin.readline().rstrip()


N = int(input())


def check_palin(string):
    while len(string) > 1:
        head = string.popleft()
        tail = string.pop()
        if head != tail:
            string.append(tail)
            string.appendleft(head)
            return [False, string]
    return [True]


for _ in range(N):
    string = deque(input())

    check_result = check_palin(string)
    # print(check_result)
    if not check_result[0]:
        head_delete_string = check_result[1].copy()
        head_delete_string.popleft()
        tail_delete_string = check_result[1].copy()
        tail_delete_string.pop()
        check_result = check_palin(head_delete_string)

        if not check_result[0]:
            check_result = check_palin(tail_delete_string)
            if not check_result[0]:
                print(2)
            else:
                print(1)
        else:
            print(1)
    else:
        print(0)

# 00:17:36 맞았습니다!
