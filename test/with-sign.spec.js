// @ts-check
import { test, deepEqual } from './testing.js';

import * as cs from '../dist/index.js';

test('with sign', () => {
	deepEqual(cs.getRGB('rgb(-244, +233, -100)'), [0, 233, 0, 1]);
	deepEqual(cs.getRGB('rgb(-244 +233 -100)'), [0, 233, 0, 1]);
	deepEqual(cs.getHSL('hsl(+240, 100%, 50.5%)'), [240, 100, 50.5, 1]);
	deepEqual(cs.getHSL('hsl(+240 100% 50.5%)'), [240, 100, 50.5, 1]);
	deepEqual(cs.getRGB('rgba(200, +20, -233, -0.0)'), [200, 20, 0, 0]);
	deepEqual(cs.getRGB('rgba(200 +20 -233 / -0.0)'), [200, 20, 0, 0]);
	deepEqual(cs.getRGB('rgba(200, +20, -233, -0.0)'), [200, 20, 0, 0]);
	deepEqual(cs.getRGB('rgba(200 +20 -233 / -0.0)'), [200, 20, 0, 0]);
	deepEqual(cs.getHSL('hsla(+200, 100%, 50%, -0.2)'), [200, 100, 50, 0]);
	deepEqual(cs.getHSL('hsla(+200, 100%, 50%, -1e-7)'), [200, 100, 50, 0]);
	deepEqual(cs.getHSL('hsl(+200 100% 50% / -0.2)'), [200, 100, 50, 0]);
	deepEqual(cs.getHSL('hsl(+200 100% 50% / -1e-7)'), [200, 100, 50, 0]);
	deepEqual(cs.getHSL('hsl(+200 100% 50% / -2.e7)'), [200, 100, 50, 0]);
	deepEqual(cs.getHSL('hsl(+200 100% 50% / +1e7)'), [200, 100, 50, 1]);
	deepEqual(cs.getHSL('hsl(+200 100% 50% / 127.88e4)'), [200, 100, 50, 1]);
	deepEqual(cs.getHSL('hsl(+200 100% 50% / 0.2e3)'), [200, 100, 50, 1]);
	deepEqual(cs.getHSL('hsl(+200 100% 50% / .1e-4)'), [200, 100, 50, 1e-5]);
	deepEqual(cs.getHSL('hsla(-10.0, 100%, 50%, -0.2)'), [350, 100, 50, 0]);
	deepEqual(cs.getHSL('hsl(-10.0 100% 50% / -0.2)'), [350, 100, 50, 0]);
	deepEqual(cs.getHSL('hsla(.5, 100%, 50%, -0.2)'), [0.5, 100, 50, 0]);
	deepEqual(cs.getHSL('hsl(.5 100% 50% / -0.2)'), [0.5, 100, 50, 0]);
	deepEqual(cs.getHWB('hwb(+240, 100%, 50.5%)'), [240, 100, 50.5, 1]);
	deepEqual(cs.getHWB('hwb(-240deg, 100%, 50.5%)'), [120, 100, 50.5, 1]);
	deepEqual(
		cs.getHWB('hwb(-240deg, 100%, 50.5%, +0.6)'),
		[120, 100, 50.5, 0.6],
	);
	deepEqual(
		cs.getHWB('hwb(-240deg, 100%, 50.5%, +1e-7)'),
		[120, 100, 50.5, 1e-7],
	);
	deepEqual(
		cs.getHWB('hwb(-240deg, 100%, 50.5%, -2.e7)'),
		[120, 100, 50.5, 0],
	);
	deepEqual(
		cs.getHWB('hwb(-240deg, 100%, 50.5%, +1e7)'),
		[120, 100, 50.5, 1],
	);
	deepEqual(
		cs.getHWB('hwb(-240deg, 100%, 50.5%, +1e7)'),
		[120, 100, 50.5, 1],
	);
	deepEqual(
		cs.getHWB('hwb(-240deg, 100%, 50.5%, 127.88e4)'),
		[120, 100, 50.5, 1],
	);
	deepEqual(
		cs.getHWB('hwb(-240deg, 100%, 50.5%, 0.2e3)'),
		[120, 100, 50.5, 1],
	);
	deepEqual(
		cs.getHWB('hwb(-240deg, 100%, 50.5%, .1e-4)'),
		[120, 100, 50.5, 1e-5],
	);
	deepEqual(cs.getHWB('hwb(10.0deg, 100%, 50.5%)'), [10, 100, 50.5, 1]);
	deepEqual(cs.getHWB('hwb(-.5, 100%, 50.5%)'), [359.5, 100, 50.5, 1]);
	deepEqual(
		cs.getHWB('hwb(-10.0deg, 100%, 50.5%, +0.6)'),
		[350, 100, 50.5, 0.6],
	);
});
