import { createContext, useState } from "react"

export const full_data = createContext();

const Context = (props) => {

    const [statements, setStatements] = useState(
        JSON.parse(localStorage.getItem('statements')) || []
    );

    const [incomeExpense, setIncomeExpense] = useState(
        JSON.parse(localStorage.getItem('totalAmount')) || {}
    )

    return (
        <full_data.Provider value={[statements, setStatements, incomeExpense, setIncomeExpense]}>{props.children}</full_data.Provider>
    )
}

export default Context