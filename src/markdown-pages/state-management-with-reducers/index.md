---
title: "Understanding TypeScript Utility Types: Pick and Omit"
date: "24-04-2023"
description: "TypeScript provides several utility types to facilitate common type transformations."
---

TypeScript provides several utility types to facilitate common type transformations.
<br/><br/>
These good features make it easy to manipulate types, either by selecting specific properties or removing unwanted ones from objects.
<br/><br/>
In this article, we'll demystify TypeScript's utility types, focusing on **Pick** and **Omit.** Whether you're new to TypeScript or a pro, understanding these concepts will improve your coding skills.
<br/><br/>
These utility types make it easy to work with just the data you need and simplify object manipulation in TypeScript.
<br/><br/>

# Pick

Allows you to create a new type by selecting specific properties from an existing type.

```ts
interface User {
  id: number
  username: string
  email: string
  isAdmin: boolean
  createdAt: Date
}
```

If, you want to create a new type that only contains the essential information for displaying a user's profile, like their username and email. You can use **Pick** to achieve this:

```ts
type UserProfil = Pick<User, "username" | "email">

const user: UserProfil = {
  username: "Ibrahim Bagalwa",
  email: "ibrahim.bagalwa.dev@gmail.com",
}
```

**`UserProfil`** is a new type created using **`Pick`**, which includes only the `username` and `email` properties from the original **`User`** interface.

It allows you to work with a more concise representation of a user's profile without including unnecessary details.
<br/><br/>

# Omit

Allows you to create a new type by taking all the properties from an existing type (Type) and then removing specific properties represented by Keys.

It's the opposite of the **`Pick`** utility type.

```ts
interface UserSettings {
  darkMode: boolean
  notifications: boolean
  showEmail: string
  language: string
}
```

If you want to create a new type that excludes sensitive settings, like the user's email visibility. You can use **Omit** to achieve this:

```ts
type PublicUserSettings = Omit<UserSettings, "showEmail">

const userSettings: PublicUserSettings = {
  darkMode: true,
  notifications: true,
  language: "en",
}
```

**`PublicUserSettings`** is a new type created using **`Omit`**, which includes all the properties from the original **`UserSettings`** interface except `showEmail`.

It allows you to create a type that represents only the public settings, hiding sensitive data from being exposed.

**Pick** allows you to choose certain properties from an object, while **Omit** lets you remove specific properties. Both are useful for working with precise data in TypeScript.
