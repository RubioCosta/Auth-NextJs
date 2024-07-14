import { useState } from "react";

// Components
import AuthInput from "../components/auth/AuthInput";

// Icons
import { IconeAtencao } from "../components/icons";

// Hooks
import useAuth from "../data/hook/useAuth";

export default function autenticacao() {

  const { login, cadastrar, loginGoogle } = useAuth();

  const [erro, setErro] = useState('');
  const [modo, setModo] = useState<'login' | 'cadastro'>('login');
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');

  async function submeter() {
    try {
      if(modo === 'login') {
        await login!(email, senha)
      } else {
        await cadastrar!(email, senha)
      }
    } catch(err: any) {
      exibirErro(err?.message ?? 'Erro desconhecido')
    }
  }

  function exibirErro(msg: string, tempoSegundo: number = 5) {
    setErro(msg)
    setTimeout(() => {
      setErro('')
    }, tempoSegundo * 1000);
  }

  return (
    <div className={`flex h-screen items-center justify-center`}>
      <div className={`hidden md:block md:w-1/2 lg:w-2/3`}>
        <img className={`h-screen w-full object-cover`} src="https://www.ferasdodesign.com.br/wp-content/uploads/2023/02/2-paisagem_de_praia_com_mar_azul_e_coqueiro_na_areia_feras_do_design_gratis.jpg" alt="Imagem da tela de autenticação" />
      </div>
      <div className={`m-10 w-full md:w-1/2 lg:w-1/3`}>
        <h1 className={`text-2xl font-bold mb-5`}>
          {modo === 'login' ? 'Entre com a sua conta' : 'Cadastre-se na plataforma'}
        </h1>

        {erro ? (
          <div className={`flex items-center bg-red-400 text-white px-5 py-3 my-2 border border-red-700 rounded-lg`}>
            {IconeAtencao}
            <span className={`ml-3`}>{erro}</span>
          </div>    
        ) : null}


        <AuthInput 
          label='Email'
          tipo='email'
          valor={email}
          valorMudou={setEmail}
          obrigatorio
        />
        <AuthInput 
          label='Senha'
          tipo='password'
          valor={senha}
          valorMudou={setSenha}
          obrigatorio
        />

        <button onClick={submeter} className={`w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6`}>
          {modo === 'login' ? 'Entrar' : 'Cadastrar'}
        </button>

        <hr className={`my-6 border-gray-300 w-full`} />

        <button onClick={loginGoogle} className={`w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3`}>
          Entrar com o Google
        </button>

        {modo === 'login' ? (
          <p className={`mt-8`}>
            Novo por aqui? 
            <a onClick={() => setModo('cadastro')} className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}>
              &nbsp;Crie uma conta gratuitamente
            </a>
          </p>
        ) : (
          <p className={`mt-8`}>
            Já faz parte da nossa comunidade?
            <a onClick={() => setModo('login')} className={`text-blue-500 hover:text-blue-700 font-semibold cursor-pointer`}>
              &nbsp;Entre com as suas credenciais
            </a>
          </p>
        )}
      </div>
    </div>
  )
}