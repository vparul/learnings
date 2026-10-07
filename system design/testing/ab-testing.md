## A/B Testing
This is also known as Split Testing or Bucket Testing

A/B testing is a way to compare two versions of something to see which performs better.

For example, suppose you have a website signup button:

Version A: “Sign Up”
Version B: “Get Started”

You randomly show A to half your visitors and B to the other half. Then you measure something based on mteric like how many people click the button.

If 8% of people click A and 11% click B, Version B appears to perform better. 

A/B testing is commonly used for websites, apps, marketing emails, ads, pricing pages, and product features.

Some of the metrics are 

1. Conversion rate
2. Click-through rate
3. Revenue per user
4. Signup completion
5. Retention
6. Error rate

# How A/B testing is performed in real applications?
In real applications, you can implement A/B testing yourself, or use an experimentation/feature-flag tool.

1. Manually in React

Suppose we want to test two checkout designs:

const variant = Math.random() < 0.5 ? "A" : "B";

function Checkout() {
  const variant = "B"; // normally this comes from an experiment system

  return variant === "A"
    ? <OldCheckout />
    : <NewCheckout />;
}

This is suitable for very small test case but this is usually not what you'd want in a real production A/B test, because you need consistent assignment, experiment configuration, targeting, analytics, etc.


2. Using an A/B testing tool
In a real application, you might use something like LaunchDarkly, Optimizely, or another experimentation platform.

You configure something like:

Experiment: checkout-redesign

A → Existing checkout
B → New checkout

Traffic:
A → 50%
B → 50%

Then your application asks the tool:

const variant = experiment.getVariant("checkout-redesign");

function Checkout() {
  const variant = experiment.getVariant("checkout-redesign");

  return variant === "B"
    ? <NewCheckout />
    : <OldCheckout />;
}


# Can the tool itself change the UI?

Sometimes.

There are two common approaches.

Code-based experimentation:

if (variant === "A") {
  return <OldButton />;
}

return <NewButton />;

Your developers write both versions.

Visual/no-code experimentation:

Some experimentation tools can modify certain page elements without requiring you to deploy a new frontend version.

For example:

Existing page
     ↓
Experiment tool
     ↓
Change button text
Change color
Change layout

This is more common for relatively simple experiments.