#import numpy as np
#from jelly_fish import half_circle as hc
from jelly_fish import Optimal as op
#from jelly_fish import orthogonal as ort


def read_data(filename):
    f = open(filename)

    title = f.readline().split(',')
    titles = {}
    sample = f.readline().split(',')
    for i in range(len(title)):
        titles[title[i]] = i
        sample[i] = [i, sample[i]]
    print "sample\n", sample
    # Not used in this script, so all data are uniform colored.
    color_row = raw_input(
        "Choose one row to initial color the data (if non, input -1): ")
    color_row = int(color_row) - 1
    # Help to get rid of non-numerical rows, but maybe updated as automatical
    # later.
    str_row = raw_input("Get rid of non-numerical rows (if non, input -1): ")
    rid_row = map(lambda x: int(x) - 1, str_row.strip().split())
    # Not using the non-numerical and color row for projection or correlation
    # calculation.
    non_used_rows = list(rid_row) + [color_row]
    print non_used_rows

    # parse the data based on the above information
    # Using feature scaling normalization: bring all values into the range [0,1], (x-x_min)/(x_max-x_min) for each attribute
    # This normalization method may be changed in the future, depending on needs.
    # average=[0]
    maximum = [0]
    mininum = [0]
    data = []
    f.seek(0)
    f.readline()
    for s in f:
        data_row = s.strip().split(',')
        # print data_row
        data.append(
            [float(elt) for num, elt in enumerate(data_row) if not num in non_used_rows])
        # average=map(lambda x,y: x+y, data[-1], average if not average==[0]
        # else average*len(data[-1]))  # To be validated
        maximum = map(
            max, data[-1], maximum if not maximum == [0] else maximum * len(data[-1]))
        mininum = map(
            min, data[-1], mininum if not mininum == [0] else mininum * len(data[-1]))

    # Normalize the data
    #average=map(lambda x: x/len(data),average)
    #print data[0]
    #print data[1]

    #results = hc.angle(data, 20)
    results = op.angles(data, 20)
    print results

    f = open("Optimal.txt", 'w')
    print >>f, results
    f.close()


if __name__ == "__main__":

    # add easygui or tkinter or wx here for file dialog
    # Is there a way to use the home directory say: ~/ ?
    filename = "../../CS/ecs/web-correlation/parkinsons.data"
    read_data(filename)
