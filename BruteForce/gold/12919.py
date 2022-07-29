import sys

S = input()
T = input()


def disassemble(t):
    # print(t)
    # print(['t[:-1]', t[:-1]])
    # print(['t[1::-1]', t[-1:0:-1]])
    if len(t) > len(S):
        if t[-1] == 'A':
            disassemble(t[:-1])
        if t[0] == 'B':
            disassemble(t[-1:0:-1])
    elif len(t) == len(S):
        if t == S:
            print(1)
            sys.exit()


disassemble(T)
print(0)

# 00:27:47 맞았습니다!
# 아이디어는 금방 생각해냈는데, 이상한데서 실수 하고 있었음(BAB에서 B를 떼고 뒤집으면 AB지!!(BA가 맞다))
# 너~무 예제로 생각하면 실수하기 쉽다. 집중 집중
