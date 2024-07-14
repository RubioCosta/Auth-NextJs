import { createContext, ReactNode, useEffect, useState } from "react";

type Tema = string | undefined | null;

interface AppProviderProps {
  children: ReactNode;
}

interface AppContextProps {
  tema: Tema;
  alternarTema: () => void;
}

const AppContext = createContext<AppContextProps>({
  tema: '',
  alternarTema() {
    return
  }
})

export function AppProvider(props: AppProviderProps) {
  const [ tema, setTema ] = useState<Tema>('');

  function alternarTema() {
    const novoTema = tema === '' ? 'dark' : ''
    setTema(novoTema)
    localStorage.setItem('tema', novoTema)
  }

  useEffect(() => {
    const valor: Tema = localStorage.getItem('tema')
    setTema(valor)
  }, [])

  return (
    <AppContext.Provider value={{ tema, alternarTema }}>
      {props.children}
    </AppContext.Provider>
  )

}

export default AppContext;