/* MIT license */
// @ts-check
import swizzle from 'simple-swizzle';
import { hexDouble, reverseNames } from './helpers';

export const toHex = swizzle.wrap((rgba) => {
	const r = hexDouble(rgba[0]);
	const g = hexDouble(rgba[1]);
	const b = hexDouble(rgba[2]);
	const a = rgba[3] < 1 ? hexDouble(Math.round(rgba[3] * 255)) : '';
	return ['#', r, g, b, a].join('');
});

export const toRGB = swizzle.wrap((rgba) => {
	const [r, g, b, a] = rgba.map(Math.round);
	return typeof a === 'undefined' || isNaN(a) || a === 1
		? `rgb(${r}, ${g}, ${b})`
		: `rgba(${r}, ${g}, ${b}, ${a})`;
});

export const toPercentRGB = swizzle.wrap((rgba) => {
	const r = Math.round((rgba[0] / 255) * 100);
	const g = Math.round((rgba[1] / 255) * 100);
	const b = Math.round((rgba[2] / 255) * 100);

	return rgba.length < 4 || rgba[3] === 1
		? `rgb(${r}%, ${g}%, ${b}%)`
		: `rgba(${r}%, ${g}%, ${b}%, ${rgba[3]})`;
});

export const toHSL = swizzle.wrap((hsla) => {
	return hsla.length < 4 || hsla[3] === 1
		? `hsl(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%)`
		: `hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${hsla[3]})`;
});

// hwb is a bit different than rgb(a) & hsl(a) since there is no alpha specific syntax
// (hwb have alpha optional & 1 is default value)
export const toHWB = swizzle.wrap((hwba) => {
	let a = '';
	if (hwba.length >= 4 && hwba[3] !== 1) {
		a = ', ' + hwba[3];
	}

	return `hwb(${hwba[0]}, ${hwba[1]}%, ${hwba[2]}%${a})`;
});

export const toKeyword = (rgb) => reverseNames[rgb.slice(0, 3)];
