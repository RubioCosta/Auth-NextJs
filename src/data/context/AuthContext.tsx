import { createContext, ReactNode, useEffect, useState } from 'react'
import route from 'next/router'
import firebase from '../../firebase/config'
import { auth } from '../../firebase/config'
import Cookies from 'js-cookie'

// Model
import Usuario from '../../model/Usuario'

interface AuthContextProps {
  usuario?: Usuario | null
  loginGoogle?: () => Promise<void>
  logout?: () => Promise<void>
  login?: (email: string, senha: string) => Promise<void>
  cadastrar?: (email: string, senha: string) => Promise<void>
  carregando?: boolean
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({});

async function usuarioNormalizado(usuarioFirebase: firebase.User): Promise<Usuario> {
  const token = await usuarioFirebase.getIdToken();

  return {
    uid: usuarioFirebase.uid,
    nome: usuarioFirebase.displayName!,
    email: usuarioFirebase.email!,
    token,
    provedor: usuarioFirebase.providerData[0]!.providerId,
    imagemUrl: usuarioFirebase.photoURL!
  }
}

function gerenciarCookie(logado: boolean) {
  if (logado) {
    Cookies.set('auth', logado, {
      expires: 7
    })
  } else {
    Cookies.remove('auth')
  }
}

export function AuthProvider(props: AuthProviderProps) {
  const [ usuario, setUsuario ] = useState<Usuario | null>(null)
  const [ carregando, setCarregando ] = useState(true)

  async function configurarSessao(usuarioFirebase?: firebase.User | null) {
    if (usuarioFirebase?.email) {
      const usuario = await usuarioNormalizado(usuarioFirebase as firebase.User)
      setUsuario(usuario)
      gerenciarCookie(true)
      setCarregando(false)
      return usuario.email
    } else {
      setUsuario(null)
      setCarregando(false)
      gerenciarCookie(false)
      return false
    }
  }

  async function login(email: string, senha: string) {
    try {
      setCarregando(true)
      const response = await auth.signInWithEmailAndPassword(auth.getAuth(), email, senha)

      await configurarSessao(response.user as firebase.User)
      route.push('/')
    } finally {
      setCarregando(false)
    }
  }

  async function cadastrar(email: string, senha: string) {
    try {
      setCarregando(true)
      const response = await auth.createUserWithEmailAndPassword(auth.getAuth(), email, senha)

      await configurarSessao(response.user as firebase.User)
      route.push('/')
    } finally {
      setCarregando(false)
    }
  }


  async function loginGoogle() {
    try {
      setCarregando(true)
      const response = await auth.signInWithPopup(auth.getAuth(), new auth.GoogleAuthProvider())

      configurarSessao(response.user as firebase.User)
      route.push('/')
    } finally {
      setCarregando(false)
    }
  }

  async function logout() {
    try {
      setCarregando(true)
      await auth.getAuth().signOut();
      await configurarSessao(null)
    } finally {
      setCarregando(false)
    }
  }

  useEffect(() => {
    if (Cookies.get('auth')) {
      setCarregando(true)
      const cancelar = auth.getAuth().onIdTokenChanged(configurarSessao)
  
      return () => cancelar()
    } else {
      setCarregando(false)
    }
  }, [])

  return (
    <AuthContext.Provider value={{usuario, loginGoogle, logout, login, cadastrar, carregando}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext;