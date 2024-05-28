// @ts-check
import { test, deepEqual } from './testing.js';

import { normalizeAlpha } from './testing.js';

import * as cs from '../dist/index.js';

test('generic .get()', () => {
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
