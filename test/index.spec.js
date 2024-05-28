// @ts-check
import {
	describe,
	test,
	equal,
	deepEqual,
	deepStrictEqual,
} from './testing.js';

import * as cs from '../dist/index.js';

describe('array mutation', () => {
	test('subsequent return values should not change array', () => {
		deepEqual(cs.getRGB('blue'), [0, 0, 255, 1]);
		deepEqual(cs.getRGB('blue'), [0, 0, 255, 1]);
	});
});

describe('Regression tests', () => {
	test('#44 | .get() does not return object prototype values', () => {
		Object.keys(Object.getOwnPropertyDescriptors(Object.prototype)).map(
			(property) =>
				deepStrictEqual([property, cs.get(property)], [property, null]),
		);
	});

	test('#25 | writing decimal values as hex does not cause unexpected output', () => {
		// Make sure  (regression test, #25)
		equal(cs.toHex([44.2, 83.8, 44]), '#2C542C');
	});
});
