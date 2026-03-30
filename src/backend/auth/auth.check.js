

const checkAuth = async () => {
    try{
        const res = await fetch("https://flashvault-production.up.railway.app/me" , {
        credentials : "include",
    })

    if (!res.ok){return null}
    const data = await res.json()
    return data.user
    }
    catch(err){
        return null
    }
}

module.exports = checkAuth
