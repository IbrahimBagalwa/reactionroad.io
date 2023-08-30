---
title: "JavaScript's Immutable Arrays Revolution."
date: "04-07-2023"
description: "Javascript introduced the powerful feature of changing elements, sort,reverse and splice arrays without changing the original, thus giving it immutability."
---

Javascript introduced the powerful feature of changing elements, sort,reverse and splice arrays without changing the original, thus giving it immutability.

Four new methods allow you to change arrays without having to create a copy first.

The new methods are:
<br/><br/>

# 1. with()

`with()` method creates a copy and allows changing the value at a specific **index**. It produces a new array where the element at the specified index is replaced by the provided value.

```javascript
const arr = ["I", "B", "R", "A", "H", "I", "M"]
console.log(arr.with(2, "b")) // ["I", "B", "b", "A", "H", "I", "M"]
// replace the second index with the provided value "b"
console.log(arr) // ["I", "B", "R", "A", "H", "I", "M"];
```

# 2. toSorted()

`toSorted` method returns a brand new array, and the elements in that array are arranged in ascending order.

```javascript
const arr = ["I", "B", "R", "A", "H", "I", "M"]
console.log(arr.toSorted()) // ['A', 'B', 'H', 'I', 'I', 'M', 'R']
console.log(arr) // ["I", "B", "R", "A", "H", "I", "M"];

const numbers = [1, 10, 21, 2]
console.log(numbers.toSorted((a, b) => a - b)) //[1, 2, 10, 21]
```

# 3. toReversed()

toReversed method It returns a new array with the elements in reversed order.

```javascript
const arr = ["I", "B", "R", "A", "H", "I", "M"]
console.log(arr.toReversed()) // ['M', 'I', 'H', 'A', 'R', 'B', 'I']

const numbers = [1, 10, 21, 2]
console.log(numbers.toReversed()) //[2, 21, 10, 1]
```

# 4. toSpliced()

It returns a new array with some elements removed and/or replaced at a given index.

```javascript
const arr = ["I", "B", "R", "A", "H", "I", "M"]
console.log(arr.toSpliced(3, 3, "BAG")) // ['I', 'B', 'R', 'BAG', 'M']

const months = ["Jan", "Mar", "Apr", "May"]
console.log(months.toSpliced(1, 0, "Feb")) // ["Jan", "Feb", "Mar", "Apr", "May"]
```

No need to create a copy of an array with [...arr] first before modifying it.
