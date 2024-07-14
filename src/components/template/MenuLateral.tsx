// Components
import MenuItem from "./MenuItem"
import Logo from "./Logo"

// Icons
import { IconeCasa, IconeAjustes, IconeSino, IconeSair } from "../icons"

// Hooks
import useAuth from "../../data/hook/useAuth"

export default function MenuLateral() {

  const { logout } = useAuth();

  return (
    <aside className={`flex flex-col bg-gray-200 dark:bg-gray-900`}>
      <div className={`flex flex-col items-center justify-center h-20 w-20 bg-gradient-to-r from-indigo-500 to-purple-800`}>
        <Logo />
      </div>
      <ul className={`flex-grow`}>
        <MenuItem url="/" texto="Início" icone={IconeCasa}/>
        <MenuItem url="/ajustes" texto="Ajustes" icone={IconeAjustes}/>
        <MenuItem url="/notificacoes" texto="Notificações" icone={IconeSino}/>
      </ul>
      <ul>
        <MenuItem className={`text-red-600 hover:bg-red-400 hover:text-white`} onClick={logout} texto="Sair" icone={IconeSair}/>
      </ul>
    </aside>
  )
}