import { useEffect, useState } from "react";
import css from "./Homepage.module.css";
import Form from "../components/Form";
import ExpenseList from "../components/ExpenseList";
import Home from "../components/Home";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { homepage } from "../store/reducers/userSlice";
import { updateStatement } from "../store/reducers/statementSlice";
import Filter from "../components/Filter";

const Homepage = () => {
  const dispatch = useDispatch();
  const { statements } = useSelector((state) => state.statements);

  useEffect(() => {
    dispatch(homepage());
  }, []);

  const [seen, setSeen] = useState(false);
  const [isFilter, setIsFilter] = useState(true);

  // ----------------- copied --------------------

  const [id, setId] = useState(0);
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Choose Type");
  const [category, setCategory] = useState("Choose Statement Category");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [selectionOptions, setSelectionOptions] = useState();

  const selectionHandler = (e) => {
    const selectedType = e.target.value;

    if (selectedType !== type) {
      setCategory("Choose Statement Category"); // Reset category when type changes
    }

    if (selectedType === "Income") {
      setType(selectedType);
      setSelectionOptions(
        <>
          <option value="Salary">Salary</option>
          <option value="Cashback">Cashback</option>
          <option value="Gift Cards">Gift Cards</option>
          <option value="Others">Others</option>
        </>
      );
    } else if (selectedType === "Expense") {
      setType(selectedType);
      setSelectionOptions(
        <>
          <option value="Shopping">Shopping</option>
          <option value="Food & Beverages">Food & Beverages</option>
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
      setType("Choose Type"); // Reset type to default
      setSelectionOptions(""); // Clear category options
    }
  };

  // ----------------- copied --------------------

  let togglePop = () => {
    setSeen(!seen);
    setId(0);
    setAmount("");
    setType("");
    setCategory("");
    setDate("");
    setDescription("");
  };

  const statementForUpdate = (idx) => {
    togglePop();
    setId(statements[idx]._id);
    setAmount(statements[idx].amount);
    setType(statements[idx].type);
    setCategory(statements[idx].category);
    setDate(statements[idx].date);
    setDescription(statements[idx].desc);

    // Set the category options based on the type
    if (statements[idx].type === "Income") {
      setSelectionOptions(
        <>
          <option value="Salary">Salary</option>
          <option value="Cashback">Cashback</option>
          <option value="Gift Cards">Gift Cards</option>
          <option value="Others">Others</option>
        </>
      );
    } else if (statements[idx].type === "Expense") {
      setSelectionOptions(
        <>
          <option value="Shopping">Shopping</option>
          <option value="Food & Beverages">Food & Beverages</option>
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
    }
  };

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

    dispatch(
      updateStatement({
        id,
        userData: { amount, type, category, date, description },
      })
    );

    toast.success("Statement is updated.");

    togglePop();

    setId(0);
    setAmount("");
    setType("");
    setCategory("");
    setDate(new Date().toISOString().split("T")[0]);
    setDescription("");
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

      {isFilter ? <Filter isFilter={isFilter} setIsFilter={setIsFilter} /> : ""}

      <Home />

      <Form
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
        selectionHandler={selectionHandler}
      />

      <ExpenseList
        statementForUpdate={statementForUpdate}
        isFilter={isFilter}
        setIsFilter={setIsFilter}
      />

      {/* <button onClick={togglePop}>AddExpenses</button> */}
      {/* {seen ? <AddExpenses toggle={togglePop} /> : null} */}
    </div>
  );
};

export default Homepage;
