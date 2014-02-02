should = require \should
test = it # Avoid trying to call the `it` keyword.

describe 'tests' ->
	test 'should run a test' ->
		should true .ok
