// @ts-check
import { describe, test, deepEqual } from './testing.js';

import * as cs from '../dist/index.js';

describe('getters', () => {
	test('getRGB()', () => {
		deepEqual(cs.getRGB('#fef'), [255, 238, 255, 1]);
		deepEqual(cs.getRGB('#fffFEF'), [255, 255, 239, 1]);
		deepEqual(cs.getRGB('rgb(244, 233, 100)'), [244, 233, 100, 1]);
		deepEqual(cs.getRGB('rgb(244 233 100)'), [244, 233, 100, 1]);
		deepEqual(cs.getRGB('rgb(100%, 30%, 90%)'), [255, 77, 229, 1]);
		deepEqual(cs.getRGB('rgb(100% 30% 90%)'), [255, 77, 229, 1]);
		deepEqual(cs.getRGB('transparent'), [0, 0, 0, 0]);
	});

	test('getHSL()', () => {
		deepEqual(cs.getHSL('hsl(240, 100%, 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHSL('hsl(240 100% 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHSL('hsl(240deg, 100%, 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHSL('hsl(240deg 100% 50.5%)'), [240, 100, 50.5, 1]);
	});

	test('getHWB()', () => {
		deepEqual(cs.getHWB('hwb(240, 100%, 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHWB('hwb(240deg, 100%, 50.5%)'), [240, 100, 50.5, 1]);
	});
});
