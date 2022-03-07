import sys


def input():
    return sys.stdin.readline().rstrip()


encode = input()


def converter(str_list):
    result_string = ''
    for string_number in str_list:
        if string_number[-1] == 'K':
            result_string += str((10 ** (len(string_number)-1)) * 5)
        else:
            result_string += str((10 ** (len(string_number)-1)))
    return int(result_string)

# 최대


def getMaximum():
    tempString = ''
    result = []
    for letter in encode:
        if letter == 'M':
            tempString += 'M'
        if letter == 'K':
            tempString += 'K'
            result.append(tempString)
            tempString = ''

    if tempString != '':
        for M in tempString:
            result.append(M)

    return converter(result)

# 최소


def getMinimum():
    tempString = ''
    result = []
    for letter in encode:
        if letter == 'M':
            tempString += 'M'
        if letter == 'K':
            if tempString != '':
                result.append(tempString)
            result.append('K')
            tempString = ''

    if tempString != '':
        result.append(tempString)

    return converter(result)


print(getMaximum())
print(getMinimum())


# 00:37:21
# 필기하면서 품. 조금 더 시간이 걸린듯
# 그런데도 todo list를 만들지 않았다. 습관을 잘 들이자.
