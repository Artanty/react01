import React from 'react';

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'Artyom1',
            isToggleOn: true
        };
        this.name = 'Artyom2';
        // Правильно будет использовать второй вариант вызова setState(),
        // который принимает функцию, а не объект.
        // Эта функция получит предыдущее состояние в качестве первого аргумента
        // и значения пропсов непосредственно во время обновления в качестве второго аргумента:
    }
    render() {
        return (
            <React.Fragment>
                <h1>Привет, {this.state.name}</h1>
                <h1>Привет, {this.name}</h1>
                <button>{this.state.isToggleOn}</button>;
            </React.Fragment>
        )
    }
}