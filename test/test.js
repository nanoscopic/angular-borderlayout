/**
 * Created by scott on 16-6-13.
 */
'use strict'

const ShuntingYard = require('../lib/shunting_yard')
const expect = require('chai').expect

describe('Shunting Yard Algorithm test', function() {
    it('test 1', function() {
	    const operators = '+-*/%&'
	    const precedence = {
		    '+': 0,
		    '-': 0,
		    '*': 1,
		    '/': 1,
		    '%': 2
	    }
	    
        const algor1 = new ShuntingYard(operators, precedence)
    })
})
