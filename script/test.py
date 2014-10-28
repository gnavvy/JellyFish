import numpy as np

def sortCorr(corrM):
	num=len(corrM)
	first_row=[0]*num
	for i in range(num):
		first_row[i]=[i,corrM[0,i]]

	first_row.sort(key=lambda d: d[1],reverse=True)
	index=np.array(first_row)[:,0]
	print index
	print corrM
	corrM_buf=np.zeros([3,3])
	corrM_buf[index]=corrM
	print corrM
	corrM[:,index]=corrM_buf
	print corrM

	return index


if __name__=="__main__":

	corrM=[[1,0,1],[0,1,0],[0,0,1]]
	corrM=np.array(corrM)
	index=sortCorr(corrM)
	print "index: ",index

	angles=np.linalg.solve(corrM,index)
	print angles
	#print "correlation Matrix: ",corrM

