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
clk: ~3.96 GHz
cpu: 13th Gen Intel(R) Core(TM) i5-13400F
runtime: node 20.13.1 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• table - small dataset
------------------------------------------- -------------------------------
fast-text-table                5.33 µs/iter   5.41 µs                 █    
                        (5.02 µs … 6.32 µs)   5.51 µs ▃▃▅▅▇▅▅▃▃▁▃▃▇▇▇██▇▁▇▅
                  gc(  2.52 ms …   3.67 ms)   1.50 kb (  1.42 kb…  1.96 kb)

text-table-fast                7.51 µs/iter   7.60 µs                █▃    
                        (7.13 µs … 7.80 µs)   7.75 µs ▄▁▄▄▄▄▁▄█▁▄▆█▆▆██▆▄▁▄
                  gc(  2.62 ms …   5.52 ms)   3.26 kb (  3.26 kb…  3.36 kb)

text-table                    62.74 µs/iter  72.40 µs ▃█
                     (44.50 µs … 203.50 µs) 177.00 µs ██▄▂▃▃▂▃▂▁▂▁▁▁▁▁▁▁▁▁▁
                  gc(  2.70 ms …   3.87 ms)  70.66 kb (  4.10 kb…384.29 kb)

summary
  fast-text-table
   1.41x faster than text-table-fast
   11.78x faster than text-table

• table - middle dataset
------------------------------------------- -------------------------------
fast-text-table              331.39 µs/iter 354.10 µs   ▃▅▆▇▅▅█▂
                    (241.40 µs … 595.60 µs) 506.60 µs ▂█████████▄▄▅▂▅▂▃▁▃▂▂
                  gc(  2.48 ms …   5.67 ms) 531.96 kb (  3.59 kb…979.93 kb)

text-table-fast              564.85 µs/iter 583.30 µs      ▄ ▃█▃
                    (466.30 µs … 743.20 µs) 719.80 µs ▃▃▃▂▅█████▇▄▃▃▂▁▃▃▁▁▁
                  gc(  2.31 ms …   5.19 ms)   1.75 mb (  1.22 mb…  2.27 mb)

text-table                     6.63 ms/iter   6.63 ms   █▆
                        (6.15 ms … 8.48 ms)   8.28 ms ▄████▄▃▃▂▁▁▃▁▁▁▂▁▂▂▂▂
                  gc(  2.34 ms …   3.88 ms)   1.96 mb (  1.45 mb…  2.47 mb)

summary
  fast-text-table
   1.7x faster than text-table-fast
   20x faster than text-table

• table - large dataset
------------------------------------------- -------------------------------
fast-text-table               20.54 ms/iter  20.69 ms     █▆
                      (19.30 ms … 24.13 ms)  23.04 ms ▂▂▄▁███▇▅▄▄▂▂▄▁▁▁▁▁▁▂
                  gc(  1.89 ms …   4.71 ms)  31.51 mb ( 31.38 mb… 31.61 mb)

text-table-fast               62.06 ms/iter  61.68 ms  ▃ ██▃
                      (59.40 ms … 73.18 ms)  67.49 ms ▆█▆███▆▆▁▁▁▁▆▁▁▁▁▁▁▁▆
                  gc(  1.99 ms …   4.02 ms)  30.94 mb ( 30.75 mb… 31.09 mb)

text-table                      5.36 s/iter    5.44 s ▃▃█             ▃
                          (5.28 s … 5.59 s)    5.49 s ███▁▆▁▁▁▁▁▁▁▁▁▁▁█▁▁▁▆
                  gc(  2.05 ms …   4.67 ms)  31.93 mb ( 31.76 mb… 31.97 mb)

summary
  fast-text-table
   3.02x faster than text-table-fast
   260.82x faster than text-table
```

## License

MIT
