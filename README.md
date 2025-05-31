# fast-text-table

![npm bundle size](https://img.shields.io/bundlephobia/min/fast-text-table) ![npm](https://img.shields.io/npm/v/fast-text-table) ![NPM](https://img.shields.io/npm/l/fast-text-table)  

Rewrite of [text-table](https://www.npmjs.com/package/text-table) in TypeScript, making it faster and smaller.

## Install

```sh
npm install fast-text-table
```

## Usage

```js
import table from "fast-text-table";
// or
const table = require("fast-text-table");

const t = table([
  ["master", "0123456789abcdef"],
  ["staging", "fedcba9876543210"],
]);
console.log(t);
```

Output:

```txt
master   0123456789abcdef
staging  fedcba9876543210
```

### left-right align

```js
table(
  [
    ["beep", "1024"],
    ["boop", "33450"],
    ["foo", "1006"],
    ["bar", "45"],
  ],
  { align: ["l", "r"] }
);
```

```txt
beep   1024
boop  33450
foo    1006
bar      45
```

### dotted align

```js
table(
  [
    ["beep", "1024"],
    ["boop", "334.212"],
    ["foo", "1006"],
    ["bar", "45.6"],
    ["baz", "123."],
  ],
  { align: ["l", "."] }
);
```

```txt
beep  1024
boop   334.212
foo   1006
bar     45.6
baz    123.
```

### centered

```js
table(
  [
    ["beep", "1024", "xyz"],
    ["boop", "3388450", "tuv"],
    ["foo", "10106", "qrstuv"],
    ["bar", "45", "lmno"],
  ],
  { align: ["l", "c", "l"] }
);
```

```txt
beep    1024   xyz
boop  3388450  tuv
foo    10106   qrstuv
bar      45    lmno
```

## API

### `table(rows, [opts])`

- `rows` `any[][]` - Array of rows to format.
- `opts` `object` - Optional options object.
  - `opts.hsep` `string` - Horizontal separator. Default: `"  "`.
  - `opts.align` `string[]` - Array of alignment types for each column. Default: `["l", "l", ..., "l"]`.
    - `l` - Left
    - `r` - Right
    - `c` - Center
    - `.` - Dotted
  - `opts.stringLength` `function` - Custom string length function. Default: `s => s.length`.

## Benchmarks

```
clk: ~4.20 GHz
cpu: 13th Gen Intel(R) Core(TM) i5-13400F
runtime: node 20.13.1 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• table - small dataset
------------------------------------------- -------------------------------
table                          5.54 µs/iter   5.58 µs   █
                        (5.32 µs … 6.27 µs)   5.96 µs   █ ▃  ▃
                    (324.99  b … 808.72  b) 416.06  b █▄█▄█▄▄█▄▄▁▄▄▄▁▁▁▁▁▄▄

text-table                    18.29 µs/iter  18.11 µs    █ █ █
                      (17.62 µs … 21.29 µs)  18.92 µs ▅ ▅█▅█ █  ▅         ▅
                    (  3.49 kb …   3.78 kb)   3.64 kb █▁████▁█▁▁█▁▁▁▁▁▁▁▁▁█

summary
  table
   3.3x faster than text-table

• table - large dataset
------------------------------------------- -------------------------------
table                         91.17 µs/iter  87.90 µs ▇█
                     (78.60 µs … 489.80 µs) 245.60 µs ██
                    ( 46.41 kb … 575.92 kb) 315.63 kb ██▅▂▂▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁

text-table                     3.63 ms/iter   3.80 ms  █▃
                        (3.40 ms … 4.49 ms)   4.29 ms ▂██
                    (157.80 kb …   1.70 mb)   1.36 mb ███▇▄▆▃▆▃▃█▆▃▃▃▂▃▃▁▁▂

summary
  table
   39.81x faster than text-table
```

## License

MIT
