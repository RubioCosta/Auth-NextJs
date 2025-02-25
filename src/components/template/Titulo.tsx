interface TituloProps {
  titulo: string
  subtitulos: string
}

export default function Titulo(props: TituloProps) {
  return (
    <div>
      <h1 className={`font-black text-3xl text-gray-900 dark:text-gray-100`}>
        {props.titulo}
      </h1>
      <h2 className={`font-light text-sm text-gray-600 dark:text-gray-200`}>
        {props.subtitulos}
      </h2>
    </div>
  )
}