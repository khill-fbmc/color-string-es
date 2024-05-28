// @ts-check
import { describe, test, strictEqual } from './testing.js';

import * as cs from '../dist/index.js';

describe('invalid', () => {
	test('getRGB()', () => {
		strictEqual(cs.getRGB('yellowblue'), null);
		strictEqual(cs.getRGB('hsl(100, 10%, 10%)'), null);
		strictEqual(cs.getRGB('hsl(100 10% 10%)'), null);
		strictEqual(cs.getRGB('hwb(100, 10%, 10%)'), null);
		strictEqual(cs.getRGB('rgb(123, 255, 9)1234'), null);
		strictEqual(cs.getRGB('rgb(123 255 9)1234'), null);
		strictEqual(cs.getRGB('333333'), null);
		strictEqual(cs.getRGB('1'), null);
		strictEqual(cs.getRGB('1892371923879'), null);
		strictEqual(cs.getRGB('444'), null);
		strictEqual(cs.getRGB('#1'), null);
		strictEqual(cs.getRGB('#f'), null);
		strictEqual(cs.getRGB('#4f'), null);
		strictEqual(cs.getRGB('#45ab4'), null);
		strictEqual(cs.getRGB('#45ab45e'), null);
	});

	test('getHSL()', () => {
		strictEqual(cs.getHSL('hsl(41, 50%, 45%)1234'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45%)1234'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / 3)1234'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / 1e)'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / e)'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / 0e-)'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / 0e+)'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / +000e33)'), null);
	});

	test('getHWB()', () => {
		strictEqual(cs.getHWB('hwb(240, 100%, 1e'), null);
		strictEqual(cs.getHWB('hwb(240, 100%, e'), null);
		strictEqual(cs.getHWB('hwb(240, 100%, 0e-'), null);
		strictEqual(cs.getHWB('hwb(240, 100%, 0e+'), null);
		strictEqual(cs.getHWB('hwb(240, 100%, +000e33'), null);
	});
});
