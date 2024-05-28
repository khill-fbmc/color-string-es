// @ts-check
import { describe, test, equal, deepStrictEqual } from './testing.js';

import * as cs from '../dist/index.js';

describe('generators', () => {
	test('toHex()', () => {
		equal(cs.toHex([255, 10, 35]), '#FF0A23');
		equal(cs.toHex([255, 10, 35, 1]), '#FF0A23');
		equal(cs.toHex([255, 10, 35], 1), '#FF0A23');
		equal(cs.toHex([255, 10, 35, 0.3]), '#FF0A234D');
		equal(cs.toHex([255, 10, 35], 0.3), '#FF0A234D');
		equal(cs.toHex([255, 10, 35, 0]), '#FF0A2300');
		equal(cs.toHex([255, 10, 35], 0), '#FF0A2300');
	});

	test('toRGB()', () => {
		equal(cs.toRGB([255, 10, 35]), 'rgb(255, 10, 35)');
		equal(cs.toRGB([255, 10, 35, 0.3]), 'rgba(255, 10, 35, 0.3)');
		equal(cs.toRGB([255, 10, 35], 0.3), 'rgba(255, 10, 35, 0.3)');
		equal(cs.toRGB([255, 10, 35, 0.3]), 'rgba(255, 10, 35, 0.3)');
		equal(cs.toRGB([255, 10, 35], 0.3), 'rgba(255, 10, 35, 0.3)');
		equal(cs.toRGB([255, 10, 35]), 'rgb(255, 10, 35)');
		equal(cs.toRGB([255, 10, 35, 0]), 'rgba(255, 10, 35, 0)');
	});

	test('toPercentRGB()', () => {
		equal(cs.toPercentRGB([255, 10, 35]), 'rgb(100%, 4%, 14%)');
		equal(cs.toPercentRGB([255, 10, 35, 0.3]), 'rgba(100%, 4%, 14%, 0.3)');
		equal(cs.toPercentRGB([255, 10, 35], 0.3), 'rgba(100%, 4%, 14%, 0.3)');
		equal(cs.toPercentRGB([255, 10, 35, 0.3]), 'rgba(100%, 4%, 14%, 0.3)');
		equal(cs.toPercentRGB([255, 10, 35], 0.3), 'rgba(100%, 4%, 14%, 0.3)');
		equal(cs.toPercentRGB([255, 10, 35]), 'rgb(100%, 4%, 14%)');
	});
	test('toHSL()', () => {
		equal(cs.toHSL([280, 40, 60]), 'hsl(280, 40%, 60%)');
		equal(cs.toHSL([280, 40, 60, 0.3]), 'hsla(280, 40%, 60%, 0.3)');
		equal(cs.toHSL([280, 40, 60], 0.3), 'hsla(280, 40%, 60%, 0.3)');
		equal(cs.toHSL([280, 40, 60, 0.3]), 'hsla(280, 40%, 60%, 0.3)');
		equal(cs.toHSL([280, 40, 60], 0.3), 'hsla(280, 40%, 60%, 0.3)');
		equal(cs.toHSL([280, 40, 60], 0), 'hsla(280, 40%, 60%, 0)');
		equal(cs.toHSL([280, 40, 60]), 'hsl(280, 40%, 60%)');
	});

	test('toHWB()', () => {
		equal(cs.toHWB([280, 40, 60]), 'hwb(280, 40%, 60%)');
		equal(cs.toHWB([280, 40, 60, 0.3]), 'hwb(280, 40%, 60%, 0.3)');
		equal(cs.toHWB([280, 40, 60], 0.3), 'hwb(280, 40%, 60%, 0.3)');
		equal(cs.toHWB([280, 40, 60], 0), 'hwb(280, 40%, 60%, 0)');
	});

	test('toKeyword()', () => {
		equal(cs.toKeyword([255, 255, 0]), 'yellow');
		equal(cs.toKeyword(['constructor']), undefined);
		equal(cs.toKeyword([100, 255, 0]), undefined);
	});
});
