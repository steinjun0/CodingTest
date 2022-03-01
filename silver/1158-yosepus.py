N, K = list(map(int, input().split()))

member = list(range(1, N+1))
outList = []
yosepList = []


memberIndex = 0


def calculateOverflow(a):
    if a % N != 0:
        return a % N
    return N


for i in range(N):
    memberIndex += K
    if memberIndex > N:
        memberIndex -= N

    print(list(range(memberIndex-K+1, memberIndex+1)))
    inputRange = list(
        map(calculateOverflow, range(memberIndex-K+1, memberIndex+1)))
    isBreak = False
    for index, j in enumerate(inputRange):
        if j in outList:
            memberIndex += 1
        if index == (len(inputRange) - 1) and calculateOverflow(memberIndex) not in inputRange:
            inputRange.append(calculateOverflow(memberIndex))

    yosepList.append(memberIndex)
    outList.append(memberIndex)

print('<'+str(yosepList)[1:-1]+'>')

# 01:12
