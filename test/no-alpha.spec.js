// @ts-check
import { describe, test, deepEqual } from './testing.js';

import * as cs from '../dist/index.js';

describe('no alpha', () => {
	test('getRGB()', () => {
		deepEqual(cs.getRGB('#fef'), [255, 238, 255, 1]);
		deepEqual(cs.getRGB('rgba(200, 20, 233)'), [200, 20, 233, 1]);
		deepEqual(cs.getRGB('rgba(200 20 233)'), [200, 20, 233, 1]);
		deepEqual(cs.getRGB('rgba(0, 0, 0, 0)'), [0, 0, 0, 0]);
		deepEqual(cs.getRGB('rgba(0 0 0 / 0)'), [0, 0, 0, 0]);
	});

	test('getHSL()', () => {
		deepEqual(cs.getHSL('hsl(240, 100%, 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHSL('hsl(240 100% 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHSL('hsla(0, 0%, 0%, 0)'), [0, 0, 0, 0]);
		deepEqual(cs.getHSL('hsl(0 0% 0% / 0)'), [0, 0, 0, 0]);
		deepEqual(cs.getHSL('hsl(0deg 0% 0% / 0)'), [0, 0, 0, 0]);
	});

	test('getHWB()', () => {
		deepEqual(cs.getHWB('hwb(400, 10%, 200%, 0)'), [40, 10, 100, 0]);
	});
});
