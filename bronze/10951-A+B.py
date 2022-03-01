import sys

while True:
    try:
        input = sys.stdin.readline()
        print(int(input[0])+int(input[2]))
    except:
        break
