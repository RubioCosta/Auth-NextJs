import { ReactElement, useEffect } from 'react';
import route from 'next/router'
import Image from 'next/image'
import Head from 'next/head'

// Images
import loading from '../../../public/images/loading.gif'

// Hook
import useAuth from "../../data/hook/useAuth"

interface ForcarAutenticacaoProps {
  children: ReactElement
}

export default function ForcarAutenticacao(props: ForcarAutenticacaoProps) {

  const { usuario, carregando } = useAuth();

  useEffect(() => {
    if (!carregando && !usuario?.email) {
      route.push('/autenticacao');
    }
  }, [carregando, usuario]);

  function renderizarConteudo() {
    return (
      <>
        <Head>
          <script dangerouslySetInnerHTML={{
            __html: `
              if (!document.cookie?.includes("auth")) {
                window.location.href = "/autenticacao"
              }
            `
          }} />
        </Head>
        {props.children}
      </>
    )
  }

  function renderizarCarregando() {
    return (
      <div className={`flex justify-center items-center h-50 w-50 mt-40`}>
        <Image src={loading} alt="Carregando" className={`h-20 w-auto`} />
      </div>
    )
  }

  if(!carregando && usuario?.email) {
    return renderizarConteudo();
  } else if (carregando) {
    return renderizarCarregando();
  } else {
    return null
  }

}