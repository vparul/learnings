# React Hook Form (RHF)

# What is React Hook Form?

React Hook Form (RHF) is a library used to manage forms in React applications.

It helps handle:

* form values
* validation
* errors
* submission
* touched fields
* dirty fields

without writing many `useState`s.

# Why Was RHF Created?

Normally in React, forms are handled like this:


const [email, setEmail] = useState("");

<input
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

This works for small forms.

But for large forms:

name
email
password
phone
address
city
country
zipcode


you end up creating many states:

```tsx
const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
```

This becomes:

* repetitive
* slow
* hard to manage
* difficult to validate


# RHF Solves This Problem

Instead of many states:

```tsx
const form = useForm();
```

RHF internally manages:

* values
* validation
* errors
* submission

for you.

---

# Main RHF Concepts

You must understand these:

| Concept          | Purpose                         |
| ---------------- | ------------------------------- |
| useForm()        | Creates form manager            |
| register()       | Connects inputs                 |
| handleSubmit()   | Handles validation + submission |
| errors           | Stores validation errors        |
| Controller       | Connects controlled components  |
| FormProvider     | Shares form using context       |
| useFormContext() | Access form anywhere            |

---

# 1. useForm()

```tsx
const form = useForm();
```

This creates the RHF engine.

Think of it as:

```text
"Create a form manager for me"
```

---

# What does useForm() return?

It returns many utilities:

```tsx
const form = {
  register,
  handleSubmit,
  control,
  watch,
  setValue,
  reset,
  formState,
}
```

---

# Important Returned Values

| Property         | Purpose                |
| ---------------- | ---------------------- |
| register         | Connect inputs         |
| handleSubmit     | Validate + submit      |
| control          | Used by Controller     |
| watch            | Watch field values     |
| setValue         | Update values manually |
| reset            | Reset form             |
| formState.errors | Validation errors      |

---

# 2. register()

Used for simple HTML inputs.

Example:

```tsx
<input {...register("email")} />
```

Meaning:

```text
"RHF, please track this input under the name 'email'"
```

Now RHF tracks:

* value
* touched state
* dirty state
* validation

---

# 3. handleSubmit()

Example:

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

This function:

1. prevents browser refresh
2. validates fields
3. gathers form data
4. calls your submit function

---

# Example

```tsx
const onSubmit = (data) => {
  console.log(data);
};
```

If user typed:

```text
email = test@gmail.com
password = 123
```

then:

```tsx
data = {
  email: "test@gmail.com",
  password: "123"
}
```

---

# 4. Validation

Example:

```tsx
<input
  {...register("email", {
    required: "Email is required"
  })}
/>
```

If field is empty:

```tsx
formState.errors.email
```

will contain:

```tsx
{
  message: "Email is required"
}
```

---

# 5. Controlled vs Uncontrolled Components

# Uncontrolled Components

Browser manages value internally.

Example:

```tsx
<input />
```

RHF prefers uncontrolled inputs because they are faster.

Simple inputs:

* input
* textarea
* select

work well with `register()`.

---

# Controlled Components

React controls the value.

Example:

```tsx
<Input
  value={value}
  onChange={handleChange}
/>
```

Used heavily in:

* MUI
* Antd
* custom UI libraries
* date pickers
* select libraries

These need `Controller`.

---

# 6. Controller

Used for controlled components.

Example:

```tsx
<Controller
  name="email"
  control={control}
  render={({ field }) => (
    <Input {...field} />
  )}
/>
```

---

# Why Controller Exists

RHF cannot directly control custom controlled components.

Controller acts as a bridge between:

* RHF
* controlled component

---

# What field contains

```tsx
field = {
  value,
  onChange,
  onBlur,
  name,
  ref
}
```

These props are needed by inputs.

---

# What is FormProvider?

`FormProvider` shares the form using React Context.

Example:

```tsx
<FormProvider {...form}>
  {children}
</FormProvider>
```

Without this:

```tsx
<Input control={control} />
```

must be passed everywhere.

With provider:
children can directly access form.

---

# What is useFormContext()?

Used inside child components.

Example:

```tsx
const { control } = useFormContext();
```

Gets form from `FormProvider`.

Avoids prop drilling.

# Zod vs Yup

Both are validation libraries.

---

# Yup

Older validation library.

Example:

```tsx
yup.string().required()
```

Problems:

* weaker TypeScript support
* separate types often needed

---

# Zod

Modern TypeScript-first validation library.

Example:

```tsx
z.string().email()
```

Main advantage:

```tsx
type FormData = z.infer<typeof schema>
```

One schema provides:

* validation
* TypeScript types

---

# Why Modern Apps Prefer Zod

| Feature            | Zod          | Yup         |
| ------------------ | ------------ | ----------- |
| TypeScript support | Excellent    | Okay        |
| Type inference     | Automatic    | Weak        |
| Modern ecosystem   | Very popular | Older       |
| DX                 | Better       | Older style |

---

# RHF + Zod Example

```tsx
const schema = z.object({
  email: z.string().email(),
});

type FormData = z.infer<typeof schema>;

const form = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

This gives:

* runtime validation
* compile-time type safety

from one schema.