import css from "./Form.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addStatement } from "../store/reducers/statementSlice";

const CreateForm = (props) => {
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.statements);

  const {
    amount,
    setAmount,
    type,
    setType,
    category,
    setCategory,
    description,
    setDescription,
    date,
    setDate,
    selectionOptions,
    setSelectionOptions,
    selectionHandler,
  } = props;

  const SubmitHandler = (e) => {
    e.preventDefault();

    // Validation
    if (amount === "") {
      return toast.error("Amount field is empty!!");
    }

    if (type === "Choose Type") {
      return toast.error("Type field is empty!!");
    }

    if (category === "Choose Category") {
      return toast.error("Category field is empty!!");
    }

    if (date === "") {
      return toast.error("Date field is empty!!");
    }

    if (description.trim() === "") {
      return setDescription("No description provided.");
    }

    let newStatement = { amount, category, type, description, date };
    dispatch(addStatement(newStatement));

    // Reset form fields after submission
    setAmount("");
    setType("Choose Type");
    setCategory("Choose Category");
    setDescription("");
    setDate(new Date().toISOString().split('T')[0]);
    setSelectionOptions("");
  };

  return (
    <div className={css.formMain} id="form">
      <div className={css.forms}>
        <form onSubmit={SubmitHandler} className={css.addStatementsForm}>
          <h2 className={css.formHeading}>Add Your Statements</h2>
          <div className={css.divForSelect}>
            <input
              type="number"
              placeholder="Amount"
              className={css.amountInput}
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
            />
            <select
              value={type}
              className={`${css.amountInput} ${
                type === "Choose Type" ? css.defaultColor : css.changedColor
              }`}
              onChange={selectionHandler}
            >
              <option value="Choose Type">Choose Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
          </div>
          <div className={css.divForSelect}>
            <select
              value={category}
              className={`${css.selectInput} ${
                category === "Choose Category"
                  ? css.defaultColor
                  : css.changedColor
              }`}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Choose Category">
                Choose Category
              </option>
              {selectionOptions}
            </select>
            <input
              type="date"
              className={`${css.selectInput} ${
                !date ? css.defaultColor : css.changedColor
              }`}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>
          <textarea
            className={css.textArea}
            placeholder="Description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <button className={css.submitBtn}>Add Income</button>
        </form>
      </div>
      <div className={css.mainFormHeading}>
        <div className={css.headingCircle}>
          <div className={css.innerCircle}>
            <h1 className={css.headingText}>
              Add Your <br />{" "}
              <span className={css.headingSpan}>Incomes & Expenses</span> <br />{" "}
              Statements Here ... <br /> ↼↼↼
            </h1>
          </div>
        </div>
        <div className={css.smallCircles}></div>
        <div className={css.smallCircles}></div>
      </div>
    </div>
  );
};

export default CreateForm;

// Keep Tracking On Your Incomes & Expenses
