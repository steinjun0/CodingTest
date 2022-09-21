N, K = map(int, input().split())
heights = list(map(int, input().split()))
height_diffs = []
for i, e in enumerate(heights):
    if i != 0:
        height_diffs.append(heights[i] - heights[i-1])

height_diffs.sort()
# print(height_diffs)
if K != 1:
    height_diffs = height_diffs[:-K+1]
# print(height_diffs)
print(sum(height_diffs))
