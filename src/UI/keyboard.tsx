import React from "react";
import clsx from "clsx";
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const Keyboard = ({className,...rest}:ButtonProps) => {
    return(
        <button className={clsx('cursor-pointer',
        className)} {...rest}/>
    )
}