import { useContext, useEffect, useState } from "react";
import css from "./Allcomponents.module.css";
import Form from "./Form";
import Nav from "./Nav";
import ExpenseList from "./ExpenseList";
import Home from "./Home";
import { toast } from "react-toastify";
import TransactionTable from "./TransactionTable";
import { full_data } from "../Context";
import { useDispatch, useSelector } from "react-redux";
import { homepage } from "../store/reducers/userSlice";
import { viewStatement } from "../store/reducers/statementSlice";

const Allcomponents = () => {
  const dispatch = useDispatch();
  const { user, error } = useSelector(state => state.user)

  useEffect(() => {
    dispatch(homepage())
  }, []);

  const [statements, setStatements] = useContext(full_data);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [seen, setSeen] = useState(false);
  const [active, setActive] = useState(null);

  // ----------------- copied --------------------

  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Choose Type");
  const [category, setCategory] = useState("Choose Statement Category");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [selectionOptions, setSelectionOptions] = useState();

  const selectionHandler = (e) => {
    setCategory("Choose Statement Category");

    if (e.target.value === "Income") {
      setType(e.target.value);
      setSelectionOptions(
        <>
          <option value="Salary">Salary</option>
          <option value="Cashback">Cashback</option>
          <option value="Gift Cards">Gift Cards</option>
          <option value="Others">Others</option>
        </>
      );
    } else if (e.target.value === "Expense") {
      setType(e.target.value);
      setSelectionOptions(
        <>
          <option value="Shopping">Shopping</option>
          <option value="Food & Bevarages">Food & Bevarages</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Rent">Rent</option>
          <option value="Grocery">Grocery</option>
          <option value="Health">Health</option>
          <option value="Education">Education</option>
          <option value="Utility Bills">Utility Bills</option>
          <option value="Savings">Savings</option>
          <option value="Others">Others</option>
        </>
      );
    } else {
      setSelectionOptions("");
    }
  };

  // ----------------- copied --------------------

  let togglePop = () => {
    setSeen(!seen);
  };

  const statementForUpdate = (idx) => {
    // console.log(idx)
    togglePop();
    setActive(idx);
    setAmount(statements[idx].amount);
    setType(statements[idx].type);
    setCategory(statements[idx].category);
    setDate(statements[idx].date);
    setDescription(statements[idx].description);
  };

  let totalAmount = 0;

  const UpdateHandler = (e) => {
    e.preventDefault();

    // validation
    if (amount === "") {
      return toast.error("Amount field is empty!!");
    }

    if (type === "Choose Type") {
      return toast.error("Type field is empty!!");
    }

    if (category === "Choose Statement Category") {
      return toast.error("Category field is empty!!");
    }

    if (date === "") {
      return toast.error("Date field is empty!!");
    }

    if (description.trim() === "") {
      return setDescription("No description provided.");
    }

    const copyStatements = [...statements];
    const oldStatement = { ...statements[active] };
    // console.log(oldStatement)

    let updatedStatement = { amount, category, type, description, date, time };
    console.log(updatedStatement);
    copyStatements[active] = { ...oldStatement, ...updatedStatement };
    setStatements(copyStatements);
    localStorage.setItem("statements", JSON.stringify(copyStatements));

    if (updatedStatement.type === "Income") {
      totalAmount =
        Number(totalIncome) -
        Number(oldStatement.amount) +
        Number(updatedStatement.amount);
      setTotalIncome(totalAmount);
      // localStorage.setItem('totalAmount', JSON.stringify({totalIncome: totalAmount, totalExpense}))
    } else if (updatedStatement.type === "Expense") {
      totalAmount =
        Number(totalExpense) -
        Number(oldStatement.amount) +
        Number(updatedStatement.amount);
      setTotalExpense(totalAmount);
      // localStorage.setItem('totalAmount', JSON.stringify({totalIncome, totalExpense: totalAmount}))
    }

    toast.success("Statement is updated.");

    togglePop();

    setActive(null);
    setAmount("");
    setType("");
    setCategory("");
    setDate("");
    setDescription("");
    setTime("");
  };

  let pop;
  if (seen) {
    pop = (
      <div className={css.updateFormDiv}>
        <form onSubmit={UpdateHandler} className={css.updateForm}>
          <h2 className={css.formHeading}>Update Your Statements</h2>
          <div className={css.crossBtn} onClick={togglePop}>
            ❌
          </div>
          <div className={css.divForSelect}>
            <input
              type="number"
              placeholder="Amount"
              className={css.amountInput}
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
            <select
              defaultValue={type}
              className={css.amountInput}
              onChange={(e) => selectionHandler(e)}
            >
              <option value="Choose Type">Choose Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className={css.divForSelect}>
            <select
              className={css.selectInput}
              defaultValue={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Choose Statement Category">
                Choose Statement Category
              </option>
              {selectionOptions}
            </select>
            <input
              type="date"
              className={css.selectInput}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <textarea
            className={css.textArea}
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className={css.submitBtn}>Update</button>
        </form>
      </div>
    );
  }

  return (
    <div className={css.appMain}>
      {pop}

      {/* <Nav /> */}

      <Home
        totalIncome={totalIncome}
        setTotalIncome={setTotalIncome}
        totalExpense={totalExpense}
        setTotalExpense={setTotalExpense}
      />

      <Form
        statements={statements}
        setStatements={setStatements}
        totalIncome={totalIncome}
        setTotalIncome={setTotalIncome}
        totalExpense={totalExpense}
        setTotalExpense={setTotalExpense}
        amount={amount}
        setAmount={setAmount}
        type={type}
        setType={setType}
        category={category}
        setCategory={setCategory}
        description={description}
        setDescription={setDescription}
        date={date}
        setDate={setDate}
        selectionOptions={selectionOptions}
        setSelectionOptions={setSelectionOptions}
        time={time}
        setTime={setTime}
        selectionHandler={selectionHandler}
      />

      <ExpenseList
        statements={statements}
        setStatements={setStatements}
        totalIncome={totalIncome}
        setTotalIncome={setTotalIncome}
        totalExpense={totalExpense}
        setTotalExpense={setTotalExpense}
        seen={seen}
        setSeen={setSeen}
        togglePop={togglePop}
        statementForUpdate={statementForUpdate}
      />

      {/* <TransactionTable
        statements={statements}
        setStatements={setStatements}
        totalIncome={totalIncome}
        setTotalIncome={setTotalIncome}
        totalExpense={totalExpense}
        setTotalExpense={setTotalExpense}
        seen={seen}
        setSeen={setSeen}
        togglePop={togglePop}
        statementForUpdate={statementForUpdate}
      /> */}

      {/* <button onClick={togglePop}>AddExpenses</button> */}
      {/* {seen ? <AddExpenses toggle={togglePop} /> : null} */}

      {/* {seen ?
        <div className={css.updateFormDiv}>
        <div className={css.updateForm}>
        <button toggle={togglePop}>click</button>
        </div>
        </div>
        : null} */}

      {/* <Extra transactions={statements}/> */}

      {/* <TransactionTable transactions={statements}/> */}
    </div>
  );
};

export default Allcomponents;
