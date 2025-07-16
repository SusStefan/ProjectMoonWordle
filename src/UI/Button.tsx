import React from "react";
import clsx from "clsx" ;
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
export const Button = ({className, ...rest}: ButtonProps) => {
    return (
        <button className={clsx(
            'text-white',
      'bg-gray-800', // Textul va fi alb
      'hover:bg-gray-900',
      'focus:outline-none',
      'focus:ring-4',
      'focus:ring-gray-300',
      'font-medium',
      'rounded-lg',
      'text-sm',
      'px-5',
      'py-2.5',
      'me-2',
      'mb-2',
      'dark:bg-gray-800',
      'dark:hover:bg-gray-700',
      'dark:focus:ring-gray-700',
      'dark:border-gray-600',
      'dark:border-gray-700',
      'cursor-pointer',
      className)} {...rest}/>
    )
}