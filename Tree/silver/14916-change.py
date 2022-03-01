import sys


def input():
    return sys.stdin.readline().rstrip()


n = int(input())
if n != 1 and n != 3:
    num_of_five = n // 5
    rest = n % 5
    if rest == 0 or rest == 2 or rest == 4:
        num_of_two = rest // 2
    elif rest == 1 or rest == 3:
        num_of_five -= 1
        num_of_two = (rest+5)//2
    print(num_of_five+num_of_two)
else:
    print(-1)

# 00:14:00
# 나머지를 활용하는건 나누는 수 보다 작은 숫자로만 케이스를 분리하면 된다
# ex) 5 -> 0,1,2,3,4
# 한 번에 통일된 규칙을 찾는 것 보다, 그냥 하나씩 다 해보는게 실수를 덜할 것 같다(개수가 적을 때)
