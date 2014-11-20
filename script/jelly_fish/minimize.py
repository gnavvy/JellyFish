import numpy as np
from numpy.linalg import norm
import matplotlib.pyplot as plt
import sys

# Wolfe conditions:
# f(x_k+a_k*p_k)<=f(x_k)+c_1*a_k*f'.T_k*p_k and f'(x_k+a_k*p_k).T*p_k>= c2*f'.T_k*p_k
# with 0<c_1<c_2<1, chosen c1=1e-4, and c2=0.9


def BFGS(func, x0, tol=1e-4):

    # Initialize used parameters
    m = len(x0)
    Hk = H0 = np.identity(m)
    Hk_next = np.zeros([m, m])
    kprime = np.zeros(m)
    kprime_next = np.zeros(m)
    xk = x0
    #xk_next = np.zeros(m)
    num = 0  # Iterative number

    # Factors used to update the H matrix
    #factor1 = np.zeros(m)
    #factor2 = np.zeros(m)

    c1 = 1e-4
    #c2 = 0.9
    # kprime = np.zeros(m)

    kprime = gradient(func, x0, kprime)
    #print "First value: ", func(xk)

    while norm(kprime) >= tol:

        pk = -np.dot(Hk, kprime)  # pk is a vector

        # Use line search function to find a_k, which is alpha_k satisfiying
        # wolfe condition (3.6)
        ak = 1

        #right_constant_2 = np.dot(kprime, pk)
        right_a = func(xk)
        right_b = c1 * np.dot(kprime, pk)
        right_1 = right_a + ak * right_b
        #right_constant_2 = right_constant_2 * c2

        xk_next = xk + ak * pk
        left_1 = func(xk_next)
        #left_2 = np.dot(kprime_next, pk)

        rho_low = 0.5
        rho_high = 0.9

        # or left_2 < right_constant_2:
        while left_1 > right_1:
            # print left_1 > right_constant_1
            rho = np.random.rand() * (rho_high - rho_low) + rho_low
            ak = ak * rho
            xk_next = xk + ak * pk
            left_1 = func(xk_next)
            right_1 = right_a + ak * right_b
            if ak < 1e-5:
                break

        # Debug
        # Draw a plot to see how func changes with ak
        # Draw the plot of func vs. ak
        # ak_arr = np.arange(0, 1, 0.001)
        # func_arr = []
        # for ak_v in ak_arr:
        #     temp = func(xk + ak_v * pk)
        #     func_arr.append(temp)

        # plt.plot(ak_arr, func_arr)
        # plt.show()

        # Draw the plot of func and gradient
        # func_gra_arr = []
        # h = 0.01
        # for ak_v in ak_arr:
        #     temp_xk = xk + ak_v * pk
        #     change = ak_v * h
        #     temp = func(temp_xk)
        #     func_arr.append(temp)
        #     temp_xk = temp_xk + change * pk
        #     temp = func(temp_xk)
        #     temp_xk = temp_xk - 2 * change * pk

        # plt.plot(ak_arr, func_arr)
        # plt.show()
        #############

        kprime_next = gradient(func, xk_next, kprime_next)

        # update sk, yk,xk

        # print left_1, right_constant_1, left_2, right_constant_2
        # raise
        sk = ak * pk   # sk is a vector
        #kprime_next = gradient(func, xk)

        yk = kprime_next - kprime

        rhok_inverse = np.dot(yk, sk)

        # Update the H matrix
        for i in range(m):
            for j in range(i, m):
                factor1 = - sk[i] * yk / rhok_inverse
                factor2 = - sk[j] * yk / rhok_inverse
                factor1[i] += 1
                factor2[j] += 1
                temp = np.dot(factor1, Hk)
                Hk_next[i, j] = Hk_next[j, i] = np.dot(
                    temp, factor2) + sk[i] * sk[j] / rhok_inverse

        # print kprime
        # "num,ak,func value, kprime =%d, %.3e, %.3e, %.3e, sk,yk,Hk=%.3e, %.3e, %.3e" % (
        #    num, ak, func(xk), norm(kprime), norm(sk), norm(yk), norm(Hk))
        Hk[:] = Hk_next[:]
        kprime[:] = kprime_next[:]
        xk[:] = xk_next[:]
        #kprime = gradient(func, xk, kprime)

        # if num == 1:
        #     sys.exit(0)
        num += 1
    #print num, func(xk)
    return xk


def gradient(func, x0, kp, h=0.01):
    m = len(x0)

    for i in range(m):
        change = h

        x0[i] = x0[i] + change
        temp = func(x0)
        x0[i] = x0[i] - 2 * change
        temp = temp - func(x0)
        x0[i] = x0[i] + change
        kp[i] = temp / 2 / change

    return kp


# def dot()
