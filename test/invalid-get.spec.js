// @ts-check
import { test, deepEqual, strictEqual } from './testing.js';

import * as cs from '../dist/index.js';

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
