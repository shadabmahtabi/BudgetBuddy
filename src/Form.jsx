import { useContext, useState } from "react";
import css from "./Form.module.css";
import { toast } from "react-toastify";
import { full_data } from "./Context";

const CreateForm = (props) => {

  const [statements, setStatements] = useContext(full_data);

  const { totalIncome, setTotalIncome, totalExpense, setTotalExpense, amount, setAmount, type, setType, category, setCategory, description, setDescription, date, setDate, selectionOptions, setSelectionOptions, time, setTime, selectionHandler } = props;

  let totalAmount = 0;

  const SubmitHandler = (e) => {
    e.preventDefault();
    // console.log(new Date(date).toLocaleDateString())

    // validation
    if (amount === "") {
      return toast.error("Amount field is empty!!")
    }

    if (type === "Choose Type") {
      return toast.error("Type field is empty!!")
    }

    if (category === "Choose Statement Category") {
      return toast.error("Category field is empty!!")
    }

    if (date === "") {
      return toast.error("Date field is empty!!")
    }

    if (description.trim() === "") {
      return setDescription('No description provided.')
    }

    let newStatement = { amount, category, type, description, date, time };
    // console.log(newStatement)
    const copyStatements = [...statements];
    copyStatements.push(newStatement);
    setStatements(copyStatements)
    localStorage.setItem('statements', JSON.stringify(copyStatements))

    if (type === 'Income') {
      totalAmount = Number(totalIncome) + Number(amount);
      setTotalIncome(totalAmount)
    }
    else {
      totalAmount = Number(totalExpense) + Number(amount);
      setTotalExpense(totalAmount)
    }

    toast.success("New statement is added.")

    setAmount('')

    setSelectionOptions('')
    if (amount === '') {
      setType('Choose Type')
    }
    setCategory('Choose Statement Category')
    setDescription('')
    setDate(new Date())

  }

  return (
    <div className={css.formMain} id="form">
      <div className={css.forms}>
        <form onSubmit={SubmitHandler} className={css.addStatementsForm}>
          <h2 className={css.formHeading}>Add Your Statements</h2>
          <div className={css.divForSelect}>
            <input type="number" placeholder="Amount" className={css.amountInput} onChange={(e) => setAmount(e.target.value)} value={amount} />
            <select defaultValue={type} className={css.amountInput} onChange={(e) => selectionHandler(e)}>
              <option value="Choose Type">Choose Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className={css.divForSelect}>
            <select className={css.selectInput} defaultValue={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="Choose Statement Category">Choose Statement Category</option>
              {selectionOptions}
            </select>
            <input type="date" className={css.selectInput} value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <textarea className={css.textArea} placeholder="Description..." value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          <button className={css.submitBtn}>Add Income</button>
        </form>
      </div>
      <div className={css.mainFormHeading}>
        <div className={css.headingCircle}>
          <div className={css.innerCircle}>
            <h1 className={css.headingText}>Add Your <br /> <span className={css.headingSpan}>Incomes & Expenses</span> <br /> Statements Here ... <br /> ↼↼↼</h1>
          </div>
        </div>
        <div className={css.smallCircles}></div>
        <div className={css.smallCircles}></div>
      </div>
    </div>
  )
}

export default CreateForm

// Keep Tracking On Your Incomes & Expenses