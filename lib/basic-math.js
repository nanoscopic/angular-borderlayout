/**
 * Created by scott on 16-6-13.
 */
'use strict'

function add(a,b){
	return a+b
}

function subtract(a,b){
	return a-b
}

function multiple(a,b){
	return a*b
}

function divide(a,b){
	return a/b
}

function mod(a,b){
	return a%b
}

module.exports = {
	'+': add,
	'-': subtract,
	'*': multiple,
	'/': divide,
	'%': mod
}
