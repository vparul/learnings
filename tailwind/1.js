// // ISSUE - 1
// Taiilwind css doesn't support dynamic inline styling.
// ex - <div className=`w-[${progress}%]`>Progress</div>
// Tailwind will not be able to parse this dynamic width value and hence will interepret it is w-[${progress}%] which is 
// nothing in tailwind. Hence, will assign it the default value which is w-full

// To solve this, you can write it like
// <div className="text-black" style={{ width: `${progress}%` }}>Progress</div>