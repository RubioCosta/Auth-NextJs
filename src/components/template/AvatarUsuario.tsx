import Link from "next/link"

interface AvatarUsuario {
  imagemUrl?: string
}

export default function AvatarUsuario(props: AvatarUsuario) {

  return (
    <Link href='/perfil'>
      <img 
        className={`h-10 w-10 rounded-full cursor-pointer ml-3`}
        src={props?.imagemUrl ?? '/images/user-default.png'} 
        alt="Avatar do Usuário" 
      />
    </Link>
  )
}