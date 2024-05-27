/* MIT license */
// @ts-check
import colorNames from 'color-name';
import { clamp, isValidColorName } from './helpers';

export function get(input) {
	const prefix = input.substring(0, 3).toLowerCase();
	let value;
	let model;
	switch (prefix) {
		case 'hsl':
			model = prefix;
			value = getHSL(input);
			break;
		case 'hwb':
			model = prefix;
			value = getHWB(input);
			break;
		default:
			model = 'rgb';
			value = getRGB(input);
			break;
	}

	if (!value) {
		return null;
	}

	return { model, value };
}

export function getRGB(input) {
	if (!input) {
		return null;
	}

	const abbr = /^#([a-f0-9]{3,4})$/i;
	const hex = /^#([a-f0-9]{6})([a-f0-9]{2})?$/i;
	const rgba =
		/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
	const per =
		/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/;
	const keyword = /^(\w+)$/;

	let rgb = [0, 0, 0, 1];
	let match;
	let i;
	let hexAlpha;

	if ((match = input.match(hex))) {
		hexAlpha = match[2];
		match = match[1];

		for (i = 0; i < 3; i++) {
			// https://jsperf.com/slice-vs-substr-vs-substring-methods-long-string/19
			let i2 = i * 2;
			rgb[i] = parseInt(match.slice(i2, i2 + 2), 16);
		}

		if (hexAlpha) {
			rgb[3] = parseInt(hexAlpha, 16) / 255;
		}
	} else if ((match = input.match(abbr))) {
		match = match[1];
		hexAlpha = match[3];

		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i] + match[i], 16);
		}

		if (hexAlpha) {
			rgb[3] = parseInt(hexAlpha + hexAlpha, 16) / 255;
		}
	} else if ((match = input.match(rgba))) {
		for (i = 0; i < 3; i++) {
			rgb[i] = parseInt(match[i + 1], 0);
		}

		if (match[4]) {
			if (match[5]) {
				rgb[3] = parseFloat(match[4]) * 0.01;
			} else {
				rgb[3] = parseFloat(match[4]);
			}
		}
	} else if ((match = input.match(per))) {
		for (i = 0; i < 3; i++) {
			rgb[i] = Math.round(parseFloat(match[i + 1]) * 2.55);
		}

		if (match[4]) {
			if (match[5]) {
				rgb[3] = parseFloat(match[4]) * 0.01;
			} else {
				rgb[3] = parseFloat(match[4]);
			}
		}
	} else if ((match = input.match(keyword))) {
		if (match[1] === 'transparent') {
			return [0, 0, 0, 0];
		}

		if (!isValidColorName(match[1])) {
			return null;
		}

		rgb = colorNames[match[1]];
		rgb[3] = 1;

		return rgb;
	} else {
		return null;
	}

	for (i = 0; i < 3; i++) {
		rgb[i] = clamp(rgb[i], 0, 255);
	}
	rgb[3] = clamp(rgb[3], 0, 1);

	return rgb;
}

export function getHSL(input) {
	if (!input) {
		return null;
	}

	const hsl =
		/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
	const match = input.match(hsl);

	if (match) {
		const alpha = parseFloat(match[4]);
		const h = ((parseFloat(match[1]) % 360) + 360) % 360;
		const s = clamp(parseFloat(match[2]), 0, 100);
		const l = clamp(parseFloat(match[3]), 0, 100);
		const a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);

		return [h, s, l, a];
	}

	return null;
}

export function getHWB(input) {
	if (!input) {
		return null;
	}

	const hwb =
		/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/;
	const match = input.match(hwb);

	if (match) {
		const alpha = parseFloat(match[4]);
		const h = ((parseFloat(match[1]) % 360) + 360) % 360;
		const w = clamp(parseFloat(match[2]), 0, 100);
		const b = clamp(parseFloat(match[3]), 0, 100);
		const a = clamp(isNaN(alpha) ? 1 : alpha, 0, 1);
		return [h, w, b, a];
	}

	return null;
}
