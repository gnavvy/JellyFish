
import numpy as np
import matplotlib.pyplot as plt
import jelly_fish.Optimal as opt

angles = np.loadtxt('angles.txt')


angles = opt.rotate(angles)
print len(angles)


r = np.linspace(1.0 / len(angles), 1.0, len(angles))
print r

for angle in angles.T:
    x = np.sin(angle) * r
    y = np.cos(angle) * r
    # plt.plot(x, y)
    x = np.insert(x, 0, 0)
    y = np.insert(y, 0, 0)
    plt.plot(x, y)

plt.show()
