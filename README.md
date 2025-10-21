# fast-text-table

![npm bundle size](https://img.shields.io/bundlephobia/min/fast-text-table) ![npm](https://img.shields.io/npm/v/fast-text-table) ![NPM](https://img.shields.io/npm/l/fast-text-table) ![npm downloads](https://img.shields.io/npm/dt/fast-text-table)  

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
clk: ~4.26 GHz
cpu: 13th Gen Intel(R) Core(TM) i5-13400F
runtime: node 24.10.0 (x64-win32)

benchmark                   avg (min … max) p75 / p99    (min … top 1%)
------------------------------------------- -------------------------------
• table - small dataset
------------------------------------------- -------------------------------
fast-text-table                4.64 µs/iter   4.74 µs  █
                        (4.24 µs … 6.03 µs)   5.91 µs ▅██▂▄▄▆▂▁▁▂▁▃▃▁▂▂▁▂▁▂
                  gc(  2.39 ms …   5.63 ms)  13.29 kb ( 13.23 kb… 13.59 kb)

text-table-fast                6.46 µs/iter   6.65 µs    █
                        (6.17 µs … 7.54 µs)   6.97 µs ████▃▃▅▃▁▅▃▁▃▅▁█▅▁▁▁▃
                  gc(  2.38 ms …   5.32 ms)   6.92 kb (  6.78 kb…  6.98 kb)

text-table                    19.30 µs/iter  19.47 µs  █
                      (18.73 µs … 20.20 µs)  20.19 µs ██▁█▁███████▁▁▁▁▁▁▁▁█
                  gc(  2.64 ms …   3.43 ms)   3.12 kb (  3.08 kb…  3.18 kb)

summary
  fast-text-table
   1.39x faster than text-table-fast
   4.15x faster than text-table

• table - middle dataset
------------------------------------------- -------------------------------
fast-text-table              255.38 µs/iter 273.20 µs      ██▇    ▅        
                    (195.00 µs … 340.20 µs) 327.80 µs ▁▁▁▂▅████▄▅██▇▅▃▂▁▃▁▂
                  gc(  2.30 ms …   5.08 ms) 551.73 kb (131.41 kb…794.92 kb)

text-table-fast              405.94 µs/iter 408.90 µs   █▃
                    (386.60 µs … 494.20 µs) 461.90 µs ▃███▇▅▅▃▃▂▁▂▂▂▂▂▁▁▂▂▂
                  gc(  2.14 ms …   2.90 ms)   1.67 mb (  1.19 mb…  1.67 mb)

text-table                     6.89 ms/iter   6.96 ms           █▃▂▇▄▂▃▃▃
                        (6.66 ms … 7.05 ms)   7.03 ms ▄▁▄▁▅▇▅▂▇▆█████████▄█
                  gc(  2.33 ms …   2.87 ms)   1.88 mb (  1.88 mb…  1.88 mb)

summary
  fast-text-table
   1.59x faster than text-table-fast
   26.98x faster than text-table

• table - large dataset
------------------------------------------- -------------------------------
fast-text-table                9.77 ms/iter   9.98 ms      ▅▃▃   ██▆  ▃ ▃  
                       (9.19 ms … 10.39 ms)  10.24 ms ▄▃█▃▆███▆▃▃█████████▄
                  gc(  2.38 ms …   3.07 ms)  34.06 mb ( 34.03 mb… 34.09 mb)

text-table-fast               44.46 ms/iter  44.66 ms    ▄    █
                      (43.58 ms … 46.49 ms)  45.85 ms ▅█▅█▅█▅▅█▅██▁▁▁▁▁▁▅▁▅
                  gc(  2.52 ms …   3.93 ms)  73.94 mb ( 73.94 mb… 73.94 mb)

text-table                      5.33 s/iter    5.30 s    █
                          (5.22 s … 6.00 s)    5.37 s ██▁██▁███▁▁██▁▁▁▁▁▁▁█
                  gc(  2.88 ms …   4.19 ms)  75.75 mb ( 75.75 mb… 75.76 mb)

summary
  fast-text-table
   4.55x faster than text-table-fast
   545.42x faster than text-table
```

## License

MIT
