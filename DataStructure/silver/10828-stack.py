import sys


def input():
    return sys.stdin.readline().rstrip()


N = int(input())

stack = []

for _ in range(N):
    operations = input().split()
    if operations[0] == 'push':
        stack.append(operations[1])
    elif operations[0] == 'pop':
        if len(stack) == 0:
            print(-1)
        else:
            print(stack.pop())
    elif operations[0] == 'size':
        print(len(stack))
    elif operations[0] == 'empty':
        if len(stack) == 0:
            print(1)
        else:
            print(0)
    elif operations[0] == 'top':
        if len(stack) == 0:
            print(-1)
        else:
            print(stack[-1])

# 00:10:45
