export const getAuthToken = () => {
    
    if (localStorage.getItem('authUser')) {
        return {error: false, token : localStorage.getItem('authUser')}
    }
    else {
        return {error: true}
    }
}

export const headers = {
    'Content-Type': 'application/json',
    'signewayAPI': `${import.meta.env.VITE_SIGN_E_WAY_API}`
}