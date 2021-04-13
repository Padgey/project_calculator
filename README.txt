//README//

/TODO

To add brackets may need to refactor whole application to not have a global string to process??
Add Brackets 
	- Needs to account for do brackets before other calculations - RECURSION?
	- Needs to correctly understand brackets inside each other - Open bracket and then it keeps tally of any other brackets opening and closing before it reaches its correct closer, then this is calculating BODMAS ON
	- What if operator between bracket and previous value
	- What if value directly before bracket
	- What if value directly after bracket

Multiplication and Division pass works with correctly with double negatives
	- The way addition and subtraction works may be the way to go
		- when multiplying or dividing work out whether the operator on each side is positive or negative
			- If both positive then sweet
			- If both negative then prefix final value with plus
			- If one of each then prefix final value with negative

Setup adequate testing- mocha??
	- Testing at bottom may be adequate for now