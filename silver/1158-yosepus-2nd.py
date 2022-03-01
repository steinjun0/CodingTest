N, K = list(map(int, input().split()))

member = list(range(1, N+1))
yosepList = []


memberIndex = -1


for i in range(N):
    memberIndex += K
    memberIndex %= len(member)

    def calculateOverflow(a):
        if a % len(member) != 0:
            return a % len(member)
        return len(member)

    yosepList.append(member[memberIndex])
    member.remove(member[memberIndex])
    memberIndex -= 1
    if memberIndex < 0:
        memberIndex += len(member)

print('<'+str(yosepList)[1:-1]+'>')

# about 01:30:00
