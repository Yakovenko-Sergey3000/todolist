import {useCallback, useEffect, useState} from "react";


export const useAuth = () => {
    const [idSess, setIdSess] = useState(null)
    const [user, setUser] = useState(null)


    const login = useCallback((id, user) => {
        setUser(user)
        setIdSess(id)
    }, [])

    const logout = useCallback(async () => {
        await fetch('/clearCookie')
        setUser({})
        setIdSess(null)
    }, [])

    const isLogin = useCallback(async () => {
       const res = await fetch('/is-login')
        const data = await res.json()
      if (!res.ok) {
          console.log(res.status)
      }
        return await data
    }, [])

    useEffect( () => {

       isLogin()
            .then(d => {
               login(d.id, d.user)
            })

    }, [isLogin, login])

    return {login, logout, idSess,user}
}