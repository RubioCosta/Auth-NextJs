import Link from "next/link"

interface MenuItemProps {
  url?: string
  onClick?: (evento: any) => void
  texto: string
  icone: any
  className?: string
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <li onClick={props.onClick} className={`hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer`}>
      {props.url ? (
        <Link href={props.url} className={`flex flex-col justify-center items-center h-20 w-20 text-gray-600 dark:text-gray-200 ${props.className}`}>
          {props.icone}
          <span className={`text-xs font-light`}>
            {props.texto}
          </span>
        </Link>
      ) : (
        <>
          <a className={`flex flex-col justify-center items-center h-20 w-20 text-gray-600 dark:text-gray-200 ${props.className}`}>
            {props.icone}
            <span className={`text-xs font-light`}>
              {props.texto}
            </span>
          </a>
        </>
      )}
    </li>
  )
}