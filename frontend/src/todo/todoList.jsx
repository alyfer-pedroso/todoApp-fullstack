import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import IconButton from "../template/iconButton";
import { markAsDone, markAsPeding, remove } from "./todoActions";

const todoList = (props) => {
    const renderRows = () => {
        const list = props.list || [];
        return list.map((todo) => (
            <tr key={todo._id}>
                <td className={todo.done ? "markedAsDone" : ""}>{todo.description}</td>
                <td>
                    <IconButton
                        style="success"
                        icon="check"
                        hide={todo.done}
                        onClick={() => props.markAsDone(todo)}
                    ></IconButton>

                    <IconButton
                        style="warning"
                        icon="undo"
                        hide={!todo.done}
                        onClick={() => props.markAsPeding(todo)}
                    ></IconButton>

                    <IconButton
                        style="danger"
                        icon="trash-o"
                        hide={!todo.done}
                        onClick={() => props.remove(todo)}
                    ></IconButton>
                </td>
            </tr>
        ));
    };

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Descrição</th>
                    <th className="tableActions">Ações</th>
                </tr>
            </thead>
            <tbody>{renderRows()}</tbody>
        </table>
    );
};

function mapStateToProps(state) {
    return {
        list: state.todo.list,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            markAsDone,
            markAsPeding,
            remove,
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(todoList);
