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
clk: ~3.98 GHz
cpu: 13th Gen Intel(R) Core(TM) i5-13400F
runtime: node 24.1.0 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• table - small dataset
------------------------------------------- -------------------------------
fast-text-table                4.73 µs/iter   4.74 µs ▇█   ▅
                        (4.29 µs … 5.86 µs)   5.83 µs ██▆▇▆█▇▃▃▁▁▁▁▁▁▃▁▄▄▄▄
                  gc(  2.26 ms …   5.90 ms)  13.29 kb ( 13.24 kb… 13.36 kb)

text-table-fast                6.44 µs/iter   6.59 µs  █▂▄        ▂        
                        (6.20 µs … 7.28 µs)   6.87 µs ▅███▅▇▃▃▁▁▅▃█▁▁▃▃▃▁▅▃
                  gc(  2.38 ms …   6.62 ms)   6.93 kb (  6.90 kb…  6.99 kb)

text-table                    54.27 µs/iter  55.70 µs ▅█▆▄
                     (44.10 µs … 130.10 µs) 106.20 µs ████▄▂▆▄▂▂▂▂▁▂▁▁▁▁▁▁▁
                  gc(  2.40 ms …   6.63 ms)  38.61 kb ( 35.77 kb…156.05 kb)

summary
  fast-text-table
   1.36x faster than text-table-fast
   11.48x faster than text-table

• table - middle dataset
------------------------------------------- -------------------------------
fast-text-table              255.38 µs/iter 273.00 µs     █▄  ▅
                    (197.80 µs … 406.80 µs) 363.60 µs ▂▂▇███▅▂███▄▂▂▂▂▂▁▂▁▁
                  gc(  2.43 ms …   4.89 ms) 545.78 kb (139.41 kb…775.73 kb)

text-table-fast              417.48 µs/iter 416.10 µs ▃█
                    (382.70 µs … 781.60 µs) 763.70 µs ██▆▄▂▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁▁
                  gc(  2.12 ms …   4.20 ms)   1.67 mb (  1.34 mb…  1.67 mb)

text-table                     6.58 ms/iter   6.65 ms  ▃ ▃▆  █
                        (6.44 ms … 6.91 ms)   6.89 ms ▆███████▆▅▇█▆▂▂▃▂▁▁▁▂
                  gc(  2.17 ms …   3.25 ms)   1.86 mb (  1.41 mb…  2.00 mb)

summary
  fast-text-table
   1.63x faster than text-table-fast
   25.77x faster than text-table

• table - large dataset
------------------------------------------- -------------------------------
fast-text-table               10.06 ms/iter  10.33 ms  ▅▅      ▆█▆▃        
                       (9.39 ms … 11.05 ms)  10.90 ms ████▄█▄██████▄███▄▄▄▃
                  gc(  2.34 ms …   3.05 ms)  34.06 mb ( 34.03 mb… 34.09 mb)

text-table-fast               45.36 ms/iter  45.75 ms   ▂   █
                      (44.25 ms … 47.36 ms)  47.04 ms ▄▇█▁▄▄█▄▇▁▄▇▄▁▁▄▁▁▁▄▄
                  gc(  2.47 ms …   3.68 ms)  73.94 mb ( 73.94 mb… 73.94 mb)

text-table                      5.36 s/iter    5.36 s  ██     █
                          (5.28 s … 5.55 s)    5.47 s ███▁██▁▁█▁▁▁▁▁█▁▁▁▁▁█
                  gc(  2.59 ms …   4.32 ms)  75.75 mb ( 75.74 mb… 75.75 mb)

summary
  fast-text-table
   4.51x faster than text-table-fast
   532.14x faster than text-table
```

## License

MIT
