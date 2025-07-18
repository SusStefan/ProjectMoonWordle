import React from "react";
import clsx from "clsx" ;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
export const LinkButton = ({className, ...rest}: ButtonProps) => {
    return (
        <button className={clsx(
            'text-white',
      'bg-green-800', // Textul va fi alb
      'hover:bg-gray-900',
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-green-300',
      'font-medium',
      'rounded-lg',
      'text-sm',
      'px-5',
      'py-2.5',
      'me-2',
      'mb-2',
      'dark:bg-green-700',
      'dark:hover:bg-green-900',
      'dark:focus:ring-green-700',
      'dark:border-green-600',
      'dark:border-green-700',
      'cursor-pointer',
      className)} {...rest}/>
    )
}