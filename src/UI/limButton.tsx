import React from "react";
import clsx from "clsx" ;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
export const LimButton = ({className, ...rest}: ButtonProps) => {
    return (
        <button className={clsx(
            'text-white',
      "bg-[url('/bg/but.png')]",
      "bg-no-repeat",
      "bg-[length:100%_100%]",
      "w-[200px]",
      'font-medium',
      'rounded-lg',
      'text-sm',
      'px-10',
      'py-2.5',
      'me-2',
      'mb-2',
      'cursor-pointer',
      className)} {...rest}/>
    )
}