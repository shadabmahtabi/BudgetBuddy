import { useContext, useState } from "react";
import css from "./ExpenseList.module.css";
import { toast } from "react-toastify";
import { full_data } from "../Context";

const ExpenseList = (props) => {

  const [statements, setStatements] = useContext(full_data);

  const { totalIncome, setTotalIncome, totalExpense, setTotalExpense, seen, setSeen, togglePop, statementForUpdate } = props;

  const [sortField, setSortField] = useState(null)
  const [isAscending, setIsAscending] = useState(true)

  let listItems = <h1 className={css.noData}>No Data Available!!</h1>

  if (statements.length !== 0) {
    listItems = statements.map((item, index) => {
      return <li key={index} className={css.statementList}>
        <div className={css.statement}>{item.type === 'Income' ? <span className={css.incomeArrow}>↓</span> : <span className={css.expenseArrow}>↑</span>}</div>
        <div className={css.statement}><p className={css.para}>{item.description}</p></div>
        <div className={css.statement}>{Number(item.amount).toLocaleString('en-IN', {
          maximumFractionDigits: 2,
          style: 'currency',
          currency: 'INR'
        })}</div>
        <div className={css.statement}>{item.type}</div>
        <div className={css.statement}>{item.category}</div>
        <div className={css.statement}>{item.date}</div>
        <div className={css.statement}>
          <div className={css.btn} onClick={() => statementForUpdate(index)} ><i className="ri-pencil-line"></i></div>
          <div className={css.btn} onClick={() => deleteHandler(index, item.type, item.amount)}><i className="ri-delete-bin-line"></i></div>
        </div>
      </li>
    })
  }

  const deleteHandler = (i, type, amount) => {
    // const copyStatements = [...statements];
    // copyStatements.splice(i, 1);
    // setStatements(copyStatements);

    let filteredList = statements.filter((elem, idx) => idx != i);
    setStatements(filteredList)
    localStorage.setItem('statements', JSON.stringify(filteredList))

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

  const sortHandler = (val) => {

    setSortField(val)
    // console.log(sortField)

    sortedTransactions()
  }

  const sortedTransactions = () => {

    listItems = statements.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];
      console.log(aValue, bValue)
      console.log('sorted')

      return aValue - bValue;

    })
  }

  return (
    <div className={css.mainBox} id="ViewStatements">
      <h1 className={css.mainHeading}>View Your Statements</h1>
      <div className={css.listBox}>
        <div className={css.categoryBox}>
          <div className={css.statementsData}></div>
          <div className={css.statementsData}>
            Description
          </div>
          <div className={css.statementsData} onClick={(e) => sortHandler('amount')}>
            Amount <i className="ri-arrow-up-down-fill"></i>
          </div>
          <div className={css.statementsData} onClick={(e) => sortHandler('type')}>
            Type <i className="ri-arrow-up-down-fill"></i>
          </div>
          <div className={css.statementsData} onClick={(e) => sortHandler('category')}>
            Category <i className="ri-arrow-up-down-fill"></i>
          </div>
          <div className={css.statementsData} onClick={(e) => sortHandler('date')}>
            Date <i className="ri-arrow-up-down-fill"></i>
          </div>
          <div className={css.statementsData}>Update & Delete</div>
        </div>
        <ul className={css.listOfStatements}>
          {listItems}
        </ul>
      </div>
      <div className={css.totatStatements}>{statements.length} Statements Found.</div>
    </div>
  )
}

export default ExpenseList