import { ComponentProps } from "react";

interface IButtonProps extends ComponentProps<'button'> {

}

export function Button( props: IButtonProps) {

  return (
    <button {...props} className="border border-gray-600 p-3 rounded-xl m-4 " />
  )
}