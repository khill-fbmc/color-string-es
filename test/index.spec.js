// @ts-check
import { assert, test, describe } from 'vitest';

import * as cs from '../dist/index.js';

const { deepEqual, strictEqual, equal, deepStrictEqual } = assert;

function normalizeAlpha(res) {
	if (res.model === 'rgb' && res.value.length >= 4) {
		res.value[3] = res.value[3].toFixed(2);
	} else if (res.length >= 4) {
		res[3] = res[3].toFixed(2);
	}
	return res;
}

describe('testing color-string-es functions', () => {
	test('getters', () => {
		deepEqual(cs.getRGB('#fef'), [255, 238, 255, 1]);
		deepEqual(cs.getRGB('#fffFEF'), [255, 255, 239, 1]);
		deepEqual(cs.getRGB('rgb(244, 233, 100)'), [244, 233, 100, 1]);
		deepEqual(cs.getRGB('rgb(244 233 100)'), [244, 233, 100, 1]);
		deepEqual(cs.getRGB('rgb(100%, 30%, 90%)'), [255, 77, 229, 1]);
		deepEqual(cs.getRGB('rgb(100% 30% 90%)'), [255, 77, 229, 1]);
		deepEqual(cs.getRGB('transparent'), [0, 0, 0, 0]);
		deepEqual(cs.getHSL('hsl(240, 100%, 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHSL('hsl(240 100% 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHSL('hsl(240deg, 100%, 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHSL('hsl(240deg 100% 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHWB('hwb(240, 100%, 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHWB('hwb(240deg, 100%, 50.5%)'), [240, 100, 50.5, 1]);
	});

	test('generic .get()', () => {
		// generic .get()
		deepEqual(cs.get('#fef'), { model: 'rgb', value: [255, 238, 255, 1] });
		deepEqual(cs.get('#fffFEF'), {
			model: 'rgb',
			value: [255, 255, 239, 1],
		});
		deepEqual(cs.get('#fffFEFff'), {
			model: 'rgb',
			value: [255, 255, 239, 1],
		});
		deepEqual(cs.get('#fffFEF00'), {
			model: 'rgb',
			value: [255, 255, 239, 0],
		});
		deepEqual(normalizeAlpha(cs.get('#fffFEFa9')), {
			model: 'rgb',
			value: [255, 255, 239, '0.66'],
		});
		deepEqual(cs.get('rgb(244, 233, 100)'), {
			model: 'rgb',
			value: [244, 233, 100, 1],
		});
		deepEqual(cs.get('rgb(244 233 100)'), {
			model: 'rgb',
			value: [244, 233, 100, 1],
		});
		deepEqual(cs.get('rgb(100%, 30%, 90%)'), {
			model: 'rgb',
			value: [255, 77, 229, 1],
		});
		deepEqual(cs.get('rgb(100% 30% 90%)'), {
			model: 'rgb',
			value: [255, 77, 229, 1],
		});
		deepEqual(cs.get('transparent'), { model: 'rgb', value: [0, 0, 0, 0] });
		deepEqual(cs.get('hsl(240, 100%, 50.5%)'), {
			model: 'hsl',
			value: [240, 100, 50.5, 1],
		});
		deepEqual(cs.get('hsl(-480, 100%, 50.5%)'), {
			model: 'hsl',
			value: [240, 100, 50.5, 1],
		});
		deepEqual(cs.get('hsl(240 100% 50.5%)'), {
			model: 'hsl',
			value: [240, 100, 50.5, 1],
		});
		deepEqual(cs.get('hsl(240deg, 100%, 50.5%)'), {
			model: 'hsl',
			value: [240, 100, 50.5, 1],
		});
		deepEqual(cs.get('hsl(240deg 100% 50.5%)'), {
			model: 'hsl',
			value: [240, 100, 50.5, 1],
		});
		deepEqual(cs.get('hwb(240, 100%, 50.5%)'), {
			model: 'hwb',
			value: [240, 100, 50.5, 1],
		});
		deepEqual(cs.get('hwb(240deg, 100%, 50.5%)'), {
			model: 'hwb',
			value: [240, 100, 50.5, 1],
		});
	});

	test('invalid generic .get() calls', () => {
		deepEqual(cs.get('hsla(250, 100%, 50%, 50%)'), null);
		deepEqual(cs.get('hsl(250 100% 50% / 50%)'), null);
		deepEqual(cs.get('rgba(250, 100%, 50%, 50%)'), null);
		deepEqual(cs.get('333333'), null);
		strictEqual(cs.get('#1'), null);
		strictEqual(cs.get('#f'), null);
		strictEqual(cs.get('#4f'), null);
		strictEqual(cs.get('#45ab4'), null);
		strictEqual(cs.get('#45ab45e'), null);
		strictEqual(cs.get('rgb()'), null);
		strictEqual(cs.get('rgb(10)'), null);
		strictEqual(cs.get('rgb(10,  2)'), null);
		strictEqual(cs.get('rgb(10,  2, 2348723dskjfs)'), null);
		strictEqual(cs.get('rgb(10%)'), null);
		strictEqual(cs.get('rgb(10%,  2%)'), null);
		strictEqual(cs.get('rgb(10%,  2%, 2348723%dskjfs)'), null);
		strictEqual(cs.get('rgb(10%,  2%, 2348723dskjfs%)'), null);
		strictEqual(cs.get('rgb(10$,3)'), null);
		strictEqual(cs.get('rgba(10,  3)'), null);
	});

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
		deepEqual(
			cs.getHSL('hsl(+200 100% 50% / 127.88e4)'),
			[200, 100, 50, 1],
		);
		deepEqual(cs.getHSL('hsl(+200 100% 50% / 0.2e3)'), [200, 100, 50, 1]);
		deepEqual(
			cs.getHSL('hsl(+200 100% 50% / .1e-4)'),
			[200, 100, 50, 1e-5],
		);
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

	test('subsequent return values should not change array', () => {
		deepEqual(cs.getRGB('blue'), [0, 0, 255, 1]);
		deepEqual(cs.getRGB('blue'), [0, 0, 255, 1]);
	});

	test('alpha', () => {
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
		deepEqual(cs.getHSL('hsla(200, 20%, 33%, 0.2)'), [200, 20, 33, 0.2]);
		deepEqual(cs.getHSL('hsla(200, 20%, 33%, 1e-7)'), [200, 20, 33, 1e-7]);
		deepEqual(cs.getHSL('hsl(200 20% 33% / 0.2)'), [200, 20, 33, 0.2]);
		deepEqual(cs.getHSL('hsl(200 20% 33% / 1e-7)'), [200, 20, 33, 1e-7]);
		deepEqual(cs.getHWB('hwb(200, 20%, 33%, 0.2)'), [200, 20, 33, 0.2]);
		deepEqual(cs.getHWB('hwb(200, 20%, 33%, 1e-7)'), [200, 20, 33, 1e-7]);
	});

	test('no alpha', () => {
		deepEqual(cs.getRGB('#fef'), [255, 238, 255, 1]);
		deepEqual(cs.getRGB('rgba(200, 20, 233)'), [200, 20, 233, 1]);
		deepEqual(cs.getRGB('rgba(200 20 233)'), [200, 20, 233, 1]);
		deepEqual(cs.getHSL('hsl(240, 100%, 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getHSL('hsl(240 100% 50.5%)'), [240, 100, 50.5, 1]);
		deepEqual(cs.getRGB('rgba(0, 0, 0, 0)'), [0, 0, 0, 0]);
		deepEqual(cs.getRGB('rgba(0 0 0 / 0)'), [0, 0, 0, 0]);
		deepEqual(cs.getHSL('hsla(0, 0%, 0%, 0)'), [0, 0, 0, 0]);
		deepEqual(cs.getHSL('hsl(0 0% 0% / 0)'), [0, 0, 0, 0]);
		deepEqual(cs.getHSL('hsl(0deg 0% 0% / 0)'), [0, 0, 0, 0]);
		deepEqual(cs.getHWB('hwb(400, 10%, 200%, 0)'), [40, 10, 100, 0]);
	});

	test('range', () => {
		deepEqual(cs.getRGB('rgba(300, 600, 100, 3)'), [255, 255, 100, 1]);
		deepEqual(cs.getRGB('rgba(300 600 100 / 3)'), [255, 255, 100, 1]);
		deepEqual(cs.getRGB('rgba(8000%, 100%, 333%, 88)'), [255, 255, 255, 1]);
		deepEqual(cs.getRGB('rgba(8000% 100% 333% / 88)'), [255, 255, 255, 1]);
		deepEqual(cs.getHSL('hsla(400, 10%, 200%, 10)'), [40, 10, 100, 1]);
		deepEqual(cs.getHSL('hsl(400 10% 200% / 10)'), [40, 10, 100, 1]);
		deepEqual(cs.getHWB('hwb(400, 10%, 200%, 10)'), [40, 10, 100, 1]);
	});

	test('invalid', () => {
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
		strictEqual(cs.getHSL('hsl(41, 50%, 45%)1234'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45%)1234'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / 3)1234'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / 1e)'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / e)'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / 0e-)'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / 0e+)'), null);
		strictEqual(cs.getHSL('hsl(41 50% 45% / +000e33)'), null);
		strictEqual(cs.getHWB('hwb(240, 100%, 1e'), null);
		strictEqual(cs.getHWB('hwb(240, 100%, e'), null);
		strictEqual(cs.getHWB('hwb(240, 100%, 0e-'), null);
		strictEqual(cs.getHWB('hwb(240, 100%, 0e+'), null);
		strictEqual(cs.getHWB('hwb(240, 100%, +000e33'), null);
	});

	test('generators', () => {
		equal(cs.toHex([255, 10, 35]), '#FF0A23');
		equal(cs.toHex([255, 10, 35, 1]), '#FF0A23');
		equal(cs.toHex([255, 10, 35], 1), '#FF0A23');
		equal(cs.toHex([255, 10, 35, 0.3]), '#FF0A234D');
		equal(cs.toHex([255, 10, 35], 0.3), '#FF0A234D');
		equal(cs.toHex([255, 10, 35, 0]), '#FF0A2300');
		equal(cs.toHex([255, 10, 35], 0), '#FF0A2300');

		equal(cs.toRGB([255, 10, 35]), 'rgb(255, 10, 35)');
		equal(cs.toRGB([255, 10, 35, 0.3]), 'rgba(255, 10, 35, 0.3)');
		equal(cs.toRGB([255, 10, 35], 0.3), 'rgba(255, 10, 35, 0.3)');
		equal(cs.toRGB([255, 10, 35, 0.3]), 'rgba(255, 10, 35, 0.3)');
		equal(cs.toRGB([255, 10, 35], 0.3), 'rgba(255, 10, 35, 0.3)');
		equal(cs.toRGB([255, 10, 35]), 'rgb(255, 10, 35)');
		equal(cs.toRGB([255, 10, 35, 0]), 'rgba(255, 10, 35, 0)');

		equal(cs.toPercentRGB([255, 10, 35]), 'rgb(100%, 4%, 14%)');
		equal(cs.toPercentRGB([255, 10, 35, 0.3]), 'rgba(100%, 4%, 14%, 0.3)');
		equal(cs.toPercentRGB([255, 10, 35], 0.3), 'rgba(100%, 4%, 14%, 0.3)');
		equal(cs.toPercentRGB([255, 10, 35, 0.3]), 'rgba(100%, 4%, 14%, 0.3)');
		equal(cs.toPercentRGB([255, 10, 35], 0.3), 'rgba(100%, 4%, 14%, 0.3)');
		equal(cs.toPercentRGB([255, 10, 35]), 'rgb(100%, 4%, 14%)');

		equal(cs.toHSL([280, 40, 60]), 'hsl(280, 40%, 60%)');
		equal(cs.toHSL([280, 40, 60, 0.3]), 'hsla(280, 40%, 60%, 0.3)');
		equal(cs.toHSL([280, 40, 60], 0.3), 'hsla(280, 40%, 60%, 0.3)');
		equal(cs.toHSL([280, 40, 60, 0.3]), 'hsla(280, 40%, 60%, 0.3)');
		equal(cs.toHSL([280, 40, 60], 0.3), 'hsla(280, 40%, 60%, 0.3)');
		equal(cs.toHSL([280, 40, 60], 0), 'hsla(280, 40%, 60%, 0)');
		equal(cs.toHSL([280, 40, 60]), 'hsl(280, 40%, 60%)');

		equal(cs.toHWB([280, 40, 60]), 'hwb(280, 40%, 60%)');
		equal(cs.toHWB([280, 40, 60, 0.3]), 'hwb(280, 40%, 60%, 0.3)');
		equal(cs.toHWB([280, 40, 60], 0.3), 'hwb(280, 40%, 60%, 0.3)');
		equal(cs.toHWB([280, 40, 60], 0), 'hwb(280, 40%, 60%, 0)');

		equal(cs.toKeyword([255, 255, 0]), 'yellow');
		equal(cs.toKeyword(['constructor']), undefined);
		equal(cs.toKeyword([100, 255, 0]), undefined);
	});

	// Regression Rest, #44
	test('.get() does not return object prototype values', () => {
		Object.keys(Object.getOwnPropertyDescriptors(Object.prototype)).map(
			(property) =>
				deepStrictEqual([property, cs.get(property)], [property, null]),
		);
	});

	// Regression Rest, #25
	test('writing decimal values as hex does not cause unexpected output', () => {
		// Make sure  (regression test, #25)
		equal(cs.toHex([44.2, 83.8, 44]), '#2C542C');
	});
});
