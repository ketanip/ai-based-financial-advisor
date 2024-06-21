const setJWT = (token: string) => {
    localStorage.setItem("jwt", token);
};

const getJWT = () => {
    const jwt = localStorage.getItem("jwt");
    if (!jwt) throw new Error("JWT TOKEN MISSING.");
    console.log(jwt)
    return `Bearer ${jwt}`;
};

export {
    setJWT,
    getJWT,
}