import Axios from "axios";

const URL = "http://localhost:3003/api/todos";

export const changeDescription = (event) => ({
    type: "DESCRIPTION_CHANGED",
    payload: event.target.value,
});

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description;
        const search = description ? `&description__regex=/${description}/` : "";
        const request = Axios.get(`${URL}?sort=-createdAt${search}`).then((resp) =>
            dispatch({ type: "TODO_SEARCHED", payload: resp.data })
        );
    };
};

export const add = (description) => {
    return (dispatch) => {
        Axios.post(URL, { description })
            .then((resp) => dispatch(clear()))
            .then((resp) => dispatch(search()));
    };
};

export const markAsDone = (todo) => {
    return (dispatch) => {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: true }).then((resp) => dispatch(search()));
    };
};

export const markAsPeding = (todo) => {
    return (dispatch) => {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: false }).then((resp) =>
            dispatch(search())
        );
    };
};

export const remove = (todo) => {
    return (dispatch) => {
        Axios.delete(`${URL}/${todo._id}`).then((resp) => dispatch(search()));
    };
};

export const clear = () => {
    return [
        {
            type: "TODO_CLEAR",
        },
        search(),
    ];
};
