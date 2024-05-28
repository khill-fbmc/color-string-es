// @ts-check
import { describe, test, deepEqual, normalizeAlpha } from './testing.js';

import * as cs from '../dist/index.js';

describe('with alpha', () => {
	test('getRGB()', () => {
		deepEqual(normalizeAlpha(cs.getRGB('#fffa')), [255, 255, 255, '0.67']);
		deepEqual(cs.getRGB('#c814e933'), [200, 20, 233, 0.2]);
		deepEqual(cs.getRGB('#c814e900'), [200, 20, 233, 0]);
		deepEqual(cs.getRGB('#c814e9ff'), [200, 20, 233, 1]);
		deepEqual(cs.getRGB('rgba(200, 20, 233, 0.2)'), [200, 20, 233, 0.2]);
		deepEqual(cs.getRGB('rgba(200 20 233 / 0.2)'), [200, 20, 233, 0.2]);
		deepEqual(cs.getRGB('rgba(200 20 233 / 20%)'), [200, 20, 233, 0.2]);
		deepEqual(cs.getRGB('rgba(200, 20, 233, 0)'), [200, 20, 233, 0]);
		deepEqual(cs.getRGB('rgba(200 20 233 / 0)'), [200, 20, 233, 0]);
		deepEqual(cs.getRGB('rgba(200 20 233 / 0%)'), [200, 20, 233, 0]);
		deepEqual(cs.getRGB('rgba(100%, 30%, 90%, 0.2)'), [255, 77, 229, 0.2]);
		deepEqual(cs.getRGB('rgba(100% 30% 90% / 0.2)'), [255, 77, 229, 0.2]);
		deepEqual(cs.getRGB('rgba(100% 30% 90% / 20%)'), [255, 77, 229, 0.2]);
	});

	test('getHSL()', () => {
		deepEqual(cs.getHSL('hsla(200, 20%, 33%, 0.2)'), [200, 20, 33, 0.2]);
		deepEqual(cs.getHSL('hsla(200, 20%, 33%, 1e-7)'), [200, 20, 33, 1e-7]);
		deepEqual(cs.getHSL('hsl(200 20% 33% / 0.2)'), [200, 20, 33, 0.2]);
		deepEqual(cs.getHSL('hsl(200 20% 33% / 1e-7)'), [200, 20, 33, 1e-7]);
	});

	test('getHWB()', () => {
		deepEqual(cs.getHWB('hwb(200, 20%, 33%, 0.2)'), [200, 20, 33, 0.2]);
		deepEqual(cs.getHWB('hwb(200, 20%, 33%, 1e-7)'), [200, 20, 33, 1e-7]);
	});
});
