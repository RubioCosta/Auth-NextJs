// Components
import AvatarUsuario from "./AvatarUsuario"
import BotaoAlternarTema from "./BotaoAlternarTema"
import Titulo from "./Titulo"

// Context
import useAuth from "../../data/hook/useAuth"
import useAppData from "../../data/hook/useAppData"

interface CabecalhoProps {
  titulo: string
  subtitulo: string
}

export default function Cabecalho(props: CabecalhoProps) {
  const { usuario } = useAuth();
  const { tema, alternarTema } = useAppData();

  return (
    <div className={`flex `}>
      <Titulo titulo={props.titulo} subtitulos={props.subtitulo} />
      <div className={`flex flex-grow justify-end items-center`}>
        <BotaoAlternarTema tema={tema} alternarTema={alternarTema} />
        <AvatarUsuario imagemUrl={usuario?.imagemUrl} />
      </div>
    </div>
  )
}