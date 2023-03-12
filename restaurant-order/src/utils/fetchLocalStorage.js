export const fetchUser=()=>{
    const userInfo = localStorage.getItem('user') !== "undefined" ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    return userInfo;
}

export const fetchCard=()=>{
    const cardInfo = localStorage.getItem('cardItems') !== "undefined" ? JSON.parse(localStorage.getItem('cardItems')) : localStorage.clear();

    return cardInfo ? cardInfo :[];
}