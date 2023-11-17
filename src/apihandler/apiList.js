export const SERVER_URL="http://localhost:8000/";


export const userEndPoints = {
    LOGIN_REQUEST: SERVER_URL+"api/userRoutes/login",
    CREATE_REQUEST: SERVER_URL+"api/userRoutes/createuser",
    USER_REQUEST: SERVER_URL+"api/userRoutes/getuser/"
};

export const postEndPoints = {
    GET_REQUEST: SERVER_URL+"api/postRoutes/getAllPosts",
    COMMENT_REQUEST: SERVER_URL+"api/postRoutes/commentpost/",
    LIKE_REQUEST: SERVER_URL+"api/postRoutes/likepost/",
    CREATE_REQUEST: SERVER_URL+"api/postRoutes/createpost"
}