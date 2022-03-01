import sys


def input():
    return sys.stdin.readline().rstrip()


def findLCM(a, b):
    i = 1
    j = 1
    while True:
        aLCM = a*i
        bLCM = b*j

        if aLCM == bLCM:
            return aLCM
        if aLCM > bLCM:
            j += 1
            continue
        i += 1


def findCF(num):
    CFs = {}
    for i in range(num+1)[2:]:
        while True:
            if num % (i) == 0:
                if (i) in CFs:
                    CFs[i] += 1
                else:
                    CFs[i] = 1
                num /= i
            else:
                break
    return CFs


T = int(input())
for i in range(T):
    a, b = map(int, input().split())
    aCF = findCF(a)
    bCF = findCF(b)

    LCFSet = aCF
    for i in bCF:
        if i in LCFSet:
            if LCFSet[i] < bCF[i]:
                LCFSet[i] = bCF[i]
        else:
            LCFSet[i] = bCF[i]

    LCF = 1
    for factor in LCFSet:
        LCF *= (factor**LCFSet[factor])
    # print(LCFSet)
    print(LCF)
    # CFs = aCF + bCF

    # for cf in aCF:
    #     if cf in bCF:
    #         bCF.remove(cf)
    # for cf in bCF:
    #     if cf in aCF:
    #         aCF.remove(cf)

    # result = 1
    # for i in aCF:
    #     result *= i
    # for i in bCF:
    #     result *= i

    # for i in CFs:
    #     result *= i
    # print(result)

    # print(findLCM(a, b))

# 00:08:00(python 실패, pypy3통과 380ms)(그냥 일일이 곱하기)
# 00:47:00(python 실패, pypy3통과 1760ms)(약수들 구해서 모두 더함)
