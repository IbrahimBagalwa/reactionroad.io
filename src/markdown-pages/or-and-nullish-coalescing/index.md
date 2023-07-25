---
title: "When to use OR and Nullish coalescing Operator"
date: "27-02-2023"
description: "|| and ?? operators in JavaScript offer fallback values for nullish or falsy variables/expressions"
---

In javascript both logic operator OR
`||` and Nullish coalescing `??` are used to provide fallback values when the variable or expression is nullish or falsy.
<br/><br/>
However they have few differences which we will explore bellow:
<br/><br/>

## OR Operator `||`

The OR operator uses the right value if left is falsy.
This means that if the left value of the logical OR operator is truthy but not nullish, the right value will not be evaluated.
A falsy value is something which evaluates to FALSE, for instance when checking a variable. You can check all the falsy values [here](https://developer.mozilla.org/en-US/docs/Glossary/Falsy).
<br/><br/>

## Nullish coalescing Operator `??`

This operator ??uses the right value if left is only `null` or `undefined`. nullish coalescing operator provides the fallback value only on `null` and `undefined`.
<br/><br/>
The OR operator performs type conversion of the left value to a bolean value instead of nullish coalescing operator check if the value is a nullish (`null` or `undefined`).
<br/><br/>
This means that if the left value of the OR is a non-Boolean value, it will be converted to a Boolean value before the operator is applied.

<br/><br/>
For Example:

```js
let value = ""
let orSolution = value || "default value"
let nullishSolution = value ?? "default value"

console.log(orSolution) // defaut value
console.log(nullishSolution) // ""
```

In this example value is an empty string and empty string is a falsy value, || provides the fallback value "default value" However, ?? only considers null undefined as nullish, so it returns the value of value variable which is an empty string.

Example:

```js
const add = value => {
  let nullishValue = value ?? 1
  return 70 + nullishValue
}

const addNumber = value => {
  let orValue = value || 1
  return 70 + orValue
}

//nullish coalescing
console.log(add(0)) // 70
console.log(add(10)) // 80
console.log(add(null)) // 71
console.log(add(undefined)) // 71
console.log(add()) // 71

// OR
console.log(addNumber(0)) // 71
console.log(addNumber(10)) // 80
console.log(addNumber(null)) // 71
console.log(addNumber(undefined)) // 71
console.log(aaddNumberdd()) // 71
```

## Conclusion

The logical OR operator (||) and the nullish coalescing operator (??) are both used to provide fallback values in JavaScript, but they have some differences in their behavior.

The choice of operator depends on the specific use case and the desired behavior.

I hope you guys found this article useful, and I hope I was able to show you the difference between || and ??.
