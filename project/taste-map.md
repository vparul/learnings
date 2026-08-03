# LEARN 1: 
With shadcn + Tailwind v4:

👉 You define colors as CSS variables
👉 Then expose them via @theme
👉 Then use them as Tailwind utilities

# LEARN 2: WHAT IS WRONG IN THIS SIMPLE LOGO COMPONENT?

export default function Logo() {
  return (
    <div className='flex gap-2 items-center'>
       <img width="50" height="50" src={LogoSvg} alt='logo' />
      <div className='flex flex-col'>
         <h1 className='heading'>TasteMap</h1>
       <span className="caption">Your personal food journey</span>
      </div>
    </div>
  )
}

 -> This component is good is you're junior-mid level developer.
 -> To stand out as senior level, the following changes should be done ->
 1. width="50" → width={50} and height="50" -> height={50}
 React + TypeScript think in JavaScript types.

img expects:
width?: number | string

Use the most correct type possible.

2. alt="logo" → decorative image
The logo image is decorative because the brand name already exists as text beside it.

If I used alt="TasteMap logo", screen readers would announce both the image and the text, which becomes repetitive.

So I used:

alt=""
aria-hidden="true"

to remove the image from the accessibility tree and let screen readers focus on the meaningful text content only.

3. h1 → p
Wrong: <h1>TasteMap</h1>

Logo is a reusable component.
It may appear in:
navbar
sidebar
footer
auth page

Now imagine:

<h1>Dashboard</h1>
<h1>TasteMap</h1>
<h1>Profile</h1>

This breaks document hierarchy.
h1 means “main heading of the page”

What are screen readers?
Screen readers are assistive technologies used by people who:

 - are blind
 - have low vision
 - sometimes have reading or cognitive difficulties

They convert what’s on the screen into:
spoken audio
or Braille output

Acessibility is fundamentally about: Can someone who cannot see the UI still understand and use it?
