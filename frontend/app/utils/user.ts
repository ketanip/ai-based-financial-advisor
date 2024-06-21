type User = {
    id: number;
    name: string;
    email: string;
}

const setUser = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
    const user_str = localStorage.getItem("user");
    if (user_str) {
        JSON.parse(user_str) as User;
    } else {
        throw new Error("User not found. Please login again.");
    };
};

export {
    setUser,
    getUser,
}