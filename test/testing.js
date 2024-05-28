// @ts-check
import { assert } from 'vitest';

export { test, describe } from 'vitest';

export const { deepEqual, strictEqual, equal, deepStrictEqual } = assert;

export function normalizeAlpha(res) {
	if (res.model === 'rgb' && res.value.length >= 4) {
		res.value[3] = res.value[3].toFixed(2);
	} else if (res.length >= 4) {
		res[3] = res[3].toFixed(2);
	}
	return res;
}
