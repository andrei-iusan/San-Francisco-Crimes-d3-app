#! /bin/usr/python

import numpy as np
import scipy.stats as st

def gaussian_smoothing(data, sigma=5):
	'''Given an iterable of numeric values 
	   and an optional sigma value for the gaussian filter,
	   returns a np array of smoothed values'''
	assert sigma > 0
	assert len(data) > 3*sigma
	conv_filter = lambda x: -st.norm.cdf((x-0.5)/sigma)+st.norm.cdf((x+0.5)/sigma)
	conv_mask = map(conv_filter, range(-3*sigma,3*sigma))
	normalize_factor = 1/sum(conv_mask)
	conv_mask = [normalize_factor*value for value in conv_mask]
	front_padding = list(reversed(data[:int(len(conv_mask)/2)]))
	#print len(conv_mask)
	end_padding = list(reversed(data[-1*int( len(conv_mask)/2):]))
	padded_data = front_padding + data + end_padding
	smooth_data = [np.dot(padded_data[i:i+len(conv_mask)], conv_mask)
					 for i,e in enumerate(data)]
	return smooth_data