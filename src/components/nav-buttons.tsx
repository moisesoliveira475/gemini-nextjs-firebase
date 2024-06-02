import { CircleHelpIcon, HomeIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { ComponentProps } from "react";

interface INavProps extends ComponentProps<'nav'> {

}

export function NavButtons(props: INavProps) {
  return (
    <nav {...props}>
      <Link href="/">
        <HomeIcon className="text-lime-400 hover:text-lime-400/30" />
      </Link>
      <button>
        <SettingsIcon className="text-lime-400 hover:text-lime-400/30" />
      </button>
      <button>
        <CircleHelpIcon className="text-lime-400 hover:text-lime-400/30" />
      </button>
    </nav>
  )
}