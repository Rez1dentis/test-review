import React from 'react';
import styles from './InputNewTodo.module.css'

type InputNewTodoProps = {
    todoTitle: string, // пропсы должны начинаться с заглавной буквы
    onChange: (todoTitle: string) => void,
    onSubmit: (todo: any) => void, // плохое название

}
type InputNewTodoState = {
    value: string
}

export class InputNewTodo extends React.Component<InputNewTodoProps, InputNewTodoState> {
    componentDidUpdate(prevProps: Readonly<InputNewTodoProps>, prevState: Readonly<InputNewTodoState>, snapshot?: any) {
        if (this.props.todoTitle !== prevProps.todoTitle) {
            this.setState({value: this.props.todoTitle})
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    }

    handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.keyCode !== 13) {  // Должно быть event.key
            return;
        }

        event.preventDefault();

        var val = this.state.value.trim();  // const вместо var

        if (val) { 
            this.props.onSubmit({
                title: this.state.value, // можно переиспользовать val
                isDone: false,
            });
            this.props.onChange('');
        }
    }

    render() {
        return (
            <input
                className={styles['new-todo']}
                type="text"
                value={this.props.todoTitle}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder="What needs to be done?"
            />
        );
    }
}
