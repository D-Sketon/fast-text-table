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
clk: ~4.18 GHz
cpu: 13th Gen Intel(R) Core(TM) i5-13400F
runtime: node 24.1.0 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• table - small dataset
------------------------------------------- -------------------------------
fast-text-table                4.99 µs/iter   4.87 µs  █▂
                        (4.67 µs … 5.95 µs)   5.92 µs ▅██▇▂▂▁▁▁▁▁▁▁▁▁▁▃▃▄▃▂
                  gc(  2.41 ms …   4.42 ms)  13.29 kb ( 13.25 kb… 13.37 kb)

text-table                    20.23 µs/iter  20.24 µs        ██
                      (19.48 µs … 21.52 µs)  21.01 µs █▁▁█▁█▁████▁▁▁█▁▁▁▁▁█
                  gc(  2.47 ms …   4.59 ms)   3.13 kb (  3.08 kb…  3.17 kb)

summary
  fast-text-table
   4.05x faster than text-table

• table - middle dataset
------------------------------------------- -------------------------------
fast-text-table              263.47 µs/iter 276.20 µs    ▇▆ █▂
                    (194.60 µs … 465.30 µs) 436.00 µs ▂▂███▆██▃▄▃▂▂▃▂▁▁▁▁▁▁
                  gc(  2.29 ms …   5.08 ms) 543.81 kb (210.00 kb…801.07 kb)

text-table                     7.05 ms/iter   7.16 ms    █ ▄ ▆▃       ▄
                        (6.82 ms … 7.39 ms)   7.33 ms ▄▆▇███▆██▇█▇▇▆▆▆█▂▅▅▂
                  gc(  2.27 ms …   2.99 ms)   1.89 mb (  1.89 mb…  1.89 mb)

summary
  fast-text-table
   26.76x faster than text-table

• table - large dataset
------------------------------------------- -------------------------------
fast-text-table               10.39 ms/iter  10.51 ms  ▂   ▅█ ▂▂
                      (10.01 ms … 11.01 ms)  10.93 ms ▂█▇▃▄██▇██▆▆▃▂▇▁▆▂▃▃▃
                  gc(  2.32 ms …   3.02 ms)  34.06 mb ( 34.03 mb… 34.14 mb)

text-table                      5.43 s/iter    5.45 s     █
                          (5.38 s … 5.53 s)    5.47 s █▁▁██▁█▁▁█▁█▁▁█▁▁█▁██
                  gc(  2.64 ms …   3.78 ms)  75.76 mb ( 75.76 mb… 75.76 mb)

summary
  fast-text-table
   523.01x faster than text-table
```

## License

MIT
