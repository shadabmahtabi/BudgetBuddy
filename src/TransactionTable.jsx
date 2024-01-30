import { useState } from "react";
import css from "./ExpenseList.module.css";
import { toast } from "react-toastify";

const ExpenseList = (props) => {

    const { totalIncome, setTotalIncome, totalExpense, setTotalExpense, statements, setStatements, seen, setSeen, togglePop, statementForUpdate } = props;

    const [sortField, setSortField] = useState(null)
    const [isAscending, setIsAscending] = useState(true)

    const sortHandler = (field) => {

        if (sortField === field) {
            setIsAscending(!isAscending);
        }
        else {
            setSortField(field)
            setIsAscending(true)
        }
        // console.log(sortField)

    }

    const listItems = [...statements].sort((a, b) => {

        const aValue = a[sortField];
        const bValue = b[sortField];
        console.log(aValue, bValue)

        if (aValue === undefined || bValue === undefined) {
            // Handle undefined values by placing them at the end (you can adjust this logic as needed)
            return aValue === undefined ? 1 : -1;
        }

        if (isAscending) {
            return aValue.localeCompare(bValue, undefined, { numeric: true, sensitivity: 'base' });
        } else {
            return bValue.localeCompare(aValue, undefined, { numeric: true, sensitivity: 'base' });
        }

    })

    console.log(listItems)

    const deleteHandler = (i, type, amount) => {
        // const copyStatements = [...statements];
        // copyStatements.splice(i, 1);
        // setStatements(copyStatements);

        let filteredList = statements.filter((elem, idx) => idx != i);
        setStatements(filteredList)

        // console.log(amount, type)

        let total = 0;
        if (type === 'Income') {
            total = totalIncome - amount;
            setTotalIncome(total)
        }
        else if (type === 'Expense') {
            total = totalExpense - amount;
            setTotalExpense(total)
        }

        toast.warning("One statement is deleted!!")
    }

    return (
        <div className={css.mainBox} id="ViewStatements">
            <h1 className={css.mainHeading}>View Your Statements As You Want</h1>
            <div className={css.listBox}>
                <div className={css.categoryBox}>
                    <div className={css.statementsData}></div>
                    <div className={css.statementsData}>
                        Description
                    </div>
                    <div className={css.statementsData} onClick={() => sortHandler('amount')}>
                        Amount <i className="ri-arrow-up-down-fill"></i>
                    </div>
                    <div className={css.statementsData} onClick={() => sortHandler('type')}>
                        Type <i className="ri-arrow-up-down-fill"></i>
                    </div>
                    <div className={css.statementsData} onClick={() => sortHandler('category')}>
                        Category <i className="ri-arrow-up-down-fill"></i>
                    </div>
                    <div className={css.statementsData} onClick={() => sortHandler('date')}>
                        Date <i className="ri-arrow-up-down-fill"></i>
                    </div>
                    <div className={css.statementsData}>Update & Delete</div>
                </div>
                <ul className={css.listOfStatements}>

                    {listItems.map((item, index) => {
                        <li key={index} className={css.statementList}>
                            <h2>{item.amount}</h2>
                        </li>
                    })}

                </ul>
            </div>
            <div className={css.totatStatements}>{statements.length} Statements Found.</div>
        </div>
    )
}

{/* <div className={css.statement}>{item.type === 'Income' ? <span className={css.incomeArrow}>↓</span> : <span className={css.expenseArrow}>↑</span>}</div>
                                <div className={css.statement}><p className={css.para}>{item.description}</p></div>
                                <div className={css.statement}>{Number(item.amount).toLocaleString('en-IN', {
                                    maximumFractionDigits: 2,
                                    style: 'currency',
                                    currency: 'INR'
                                })}</div>
                                <div className={css.statement}>{item.type}</div>
                                <div className={css.statement}>{item.category}</div>
                                <div className={css.statement}>{item.dateString.getDate() + '-' + Number(item.dateString.getMonth() + 1) + '-' + item.dateString.getFullYear()}</div>
                                <div className={css.statement}>
                                    <div className={css.btn} onClick={() => statementForUpdate(index)} ><i className="ri-pencil-line"></i></div>
                                    <div className={css.btn} onClick={() => deleteHandler(index, item.type, item.amount)}><i className="ri-delete-bin-line"></i></div>
                                </div> */}

export default ExpenseList