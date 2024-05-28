// @ts-check
import { describe, test, deepEqual } from './testing.js';

import * as cs from '../dist/index.js';

describe('range', () => {
	test('getRGB()', () => {
		deepEqual(cs.getRGB('rgba(300, 600, 100, 3)'), [255, 255, 100, 1]);
		deepEqual(cs.getRGB('rgba(300 600 100 / 3)'), [255, 255, 100, 1]);
		deepEqual(cs.getRGB('rgba(8000%, 100%, 333%, 88)'), [255, 255, 255, 1]);
		deepEqual(cs.getRGB('rgba(8000% 100% 333% / 88)'), [255, 255, 255, 1]);
	});

	test('getHSL()', () => {
		deepEqual(cs.getHSL('hsla(400, 10%, 200%, 10)'), [40, 10, 100, 1]);
		deepEqual(cs.getHSL('hsl(400 10% 200% / 10)'), [40, 10, 100, 1]);
	});

	test('getHWB()', () => {
		deepEqual(cs.getHWB('hwb(400, 10%, 200%, 10)'), [40, 10, 100, 1]);
	});
});
