import sys
from collections import deque


def input():
    return sys.stdin.readline().rstrip()


F, S, G, U, D = map(int, input().split())

my_pos = S

is_upper_bigger = U > D


is_close = False


if my_pos < G:
    is_upgoing = True
elif my_pos > G:
    is_upgoing = False

visited = []
step = 0
while my_pos != G:
    if my_pos == G:
        print(step)
        break

    elif U == 0 and D == 0 and S != G:
        print('use the stairs')
        break

    elif U == 0 and S < G:
        print('use the stairs')
        break

    elif D == 0 and S > G:
        print('use the stairs')
        break

    else:
        if not is_close:
            # print(f'1my_pos: {my_pos}, step: {step}')
            if my_pos < G:
                # overflow
                if my_pos + U * (((G - S)//U) + 1) > F:
                    my_pos += (U * ((G - S)//U))
                    step += ((G - S)//U)
                    is_upgoing = False
                    is_close = True
                    continue
                my_pos += U * (((G - S)//U) + 1)
                step += ((G - S)//U) + 1

            elif my_pos > G:
                # underflow
                if my_pos - (D * (((S-G)//D) + 1)) <= 0:
                    my_pos -= D * ((S-G)//D)
                    step += ((S-G)//D)
                    is_upgoing = True
                    is_close = True
                    continue
                my_pos -= (D * (((S-G)//D) + 1))
                step += ((S-G)//D) + 1

            is_close = True

        # changed direction
        else:
            # print(f'2my_pos: {my_pos}, step: {step}')
            if my_pos in visited:
                print('use the stairs')
                break

            if is_upgoing:
                # print(f'(my_pos-G)//D: {(my_pos-G)//D}')
                visited.append(my_pos)
                # underflow
                if my_pos - D <= 0:
                    step += 1
                    my_pos += U
                    is_upgoing = True
                    continue

                # step += ((my_pos-G)//D)
                # my_pos -= D * ((my_pos-G)//D)
                step += 1
                my_pos -= D
                is_upgoing = False

            else:
                # print(f'G: {G}, my_pos: {my_pos}, U: {U}')
                # print(f'(G-my_pos)//U: {(G-my_pos)//U}')
                visited.append(my_pos)
                # overflow
                if my_pos + U > F:
                    step += 1
                    my_pos -= D
                    is_upgoing = False
                    continue
                # step += ((G-my_pos)//U)
                # my_pos += U * ((G-my_pos)//U)
                step += 1
                my_pos += U
                is_upgoing = True

if my_pos == G:
    print(step)
