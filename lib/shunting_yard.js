/**
 * Created by scott on 16-6-13.
 */
'use strict'

const calculableCharsRegExp = /[\d.e]/
/**
 *
 *
 * @param {String} operators
 * @param {String} leftAssociatedOperators
 * @param {Object} operatorsPrecedence
 * @constructor
 */
function ShuntingYard(operators, leftAssociatedOperators, operatorsPrecedence) {
	this.operators = operators
	this.operatorsPrecedence = operatorsPrecedence
	this.leftAssociateOperators = leftAssociatedOperators

	this.calculableRegExp = new RegExp(`?<=[${operators}])|(?=[${operators}]`)
}

ShuntingYard.prototype.constructor = ShuntingYard

ShuntingYard.prototype.transform = function (expression) {
	const output = []
	const operatorStack = []
	const tokens = this.splitExpression(expression)

	for (let token of expression) {
		if (this.isCalculable(token)) {
			output.push(token)
		} else if (this.isOperator(token)) {
			let lastStackItem = operatorStack[operatorStack.length - 1]
			if (this.isOperator(lastStackItem) &&
				((this.isLeftAssociatedOperator(token) && this.operatorsPrecedence[token] <= this.operatorsPrecedence[lastStackItem]) ||
				(!this.isLeftAssociatedOperator(token) && this.operatorsPrecedence[token] < this.operatorsPrecedence[lastStackItem]))){
				
			}
				operatorStack.push(token)
		} else if (token === '(') {
			operatorStack.push(token)
		} else if () {

		} else {
		}
	}
}

ShuntingYard.prototype.isOperator = function (token) {
	return this.operators.indexOf(token) >= 0
}

ShuntingYard.prototype.isLeftAssociatedOperator = function (operator) {
	return this.isLeftAssociatedOperator.indexOf(operator) >= 0
}

ShuntingYard.prototype.isCalculable = function (token) {
	return calculableCharsRegExp.test(token)
}

ShuntingYard.prototype.splitExpression = function (expression) {
	return expression.match(/[^\d]+|[\d.]+/g)
}

module.exports = ShuntingYard














