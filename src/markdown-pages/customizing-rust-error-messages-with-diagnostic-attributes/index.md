---
title: "Customizing Rust Error Messages with Diagnostic Attributes"
date: "03-05-2024"
description: "Rust now supports diagnostic attributes which helps you customize the error messages you get from the compiler."
---

Rust now supports `diagnostic attributes` which helps you customize the error messages you get from the compiler.
You can now add a special tag, `#[diagnostic]`, to your code to give hints to the compiler about how you want your error messages to look.
<br/><br/>
One example of this is `#[diagnostic::on_unimplemented]`, which you can put on a trait to change the error message when that trait is required but not implemented for a type.
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gl2nmib5wjrgp9zj4thn.png)
<br/><br/>
Before this feature, you'd get a standard error message from the compiler saying that the trait wasn't implemented for the type you used.
Here is the example before Rust 1.78.0:
<br/><br/>
![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qz2zfpz2v6f3zapyhcmz.png)
<br/><br/>
But with `#[diagnostic::on_unimplemented]`, you can now provide your own custom message, a label, and additional notes to help explain the issue better.
<br/><br/>
So instead of just getting a generic error, you can now see a message that you wrote yourself, along with any additional explanations or hints you think are useful. This makes it easier to understand what went wrong and how to fix it, especially for trait authors who can now give more helpful hints about the missing implementation.
<br/><br/>
Before you can use the cool new diagnostic features in Rust, ensure you have the latest version installed.
If you haven't installed Rustup yet, follow the instructions on the official Rust website: [Install Rust](https://www.rust-lang.org/tools/install).
If you have Rust already installed you can run the following command:
`rustup update`
