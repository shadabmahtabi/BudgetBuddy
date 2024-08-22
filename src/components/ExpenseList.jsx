import css from "./ExpenseList.module.css";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteStatement } from "../store/reducers/statementSlice";

const ExpenseList = (props) => {
  const dispatch = useDispatch();
  const { loading, statements } = useSelector((state) => state.statements);

  const { statementForUpdate } = props;

  const formatDateToIndian = (dateString) => {
    const dateParts = dateString.split("-"); // Split the date string by '-'
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];

    return `${day}-${month}-${year}`; // Return in DD-MM-YYYY format
  };

  // Example usage
  // const formattedDate = formatDateToIndian("2024-08-12"); // "12-08-2024"

  let listItems;
  if (loading) {
    listItems = <h1 className={css.noData}>Loading...!</h1>;
  } else if (statements.length === 0) {
    listItems = <h1 className={css.noData}>No Data Available!!</h1>;
  } else {
    listItems = statements
      .slice()
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      // .reverse()
      .map((item, index) => {
        return (
          <li key={index} className={css.statementList}>
            <div className={css.forOthers}>
              <div className={css.statement}>
                {item.type === "Income" ? (
                  <span className={css.incomeArrow}>↓</span>
                ) : (
                  <span className={css.expenseArrow}>↑</span>
                )}
              </div>
              <div className={css.statement}>
                <p className={css.para}>{item.desc}</p>
              </div>
              <div className={css.statement}>
                {Number(item.amount).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "INR",
                })}
              </div>
              <div className={css.statement}>{item.type}</div>
              <div className={css.statement}>{item.category}</div>
              <div className={css.statement}>
                {formatDateToIndian(item.date)}
              </div>
              <div className={css.statement}>
                <div
                  className={css.btn}
                  onClick={() => statementForUpdate(index)}
                >
                  <i className="ri-pencil-line"></i>
                </div>
                <div
                  className={css.btn}
                  onClick={() => deleteHandler(item._id)}
                >
                  <i className="ri-delete-bin-line"></i>
                </div>
              </div>
            </div>
            <div className={css.forMobile}>
              <div className={css.statement}>
                <span className={css.date}>{formatDateToIndian(item.date)}</span>
                <span className={css.btns}>
                  <div
                    className={css.btn}
                    onClick={() => statementForUpdate(index)}
                  >
                    <i className="ri-pencil-line"></i>
                  </div>
                  <div
                    className={css.btn}
                    onClick={() => deleteHandler(item._id)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </div>
                </span>
              </div>
              <div className={css.statement}>
                <p className={css.para}>{item.desc}</p>
                <span className={css.amt}>
                  {Number(item.amount).toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: "INR",
                  })}
                  {item.type === "Income" ? (
                    <span className={css.incomeArrow}>↓</span>
                  ) : (
                    <span className={css.expenseArrow}>↑</span>
                  )}{" "}
                </span>
              </div>
              <div className={css.statement}>
                <span>
                  {item.type} / {item.category}
                </span>
              </div>
              {/* <div className={css.statement}>
                {Number(item.amount).toLocaleString("en-IN", {
                  maximumFractionDigits: 2,
                  style: "currency",
                  currency: "INR",
                })}
              </div>
              <div className={css.statement}>{item.type}</div>
              <div className={css.statement}>{item.category}</div>
              <div className={css.statement}>
                {formatDateToIndian(item.date)}
              </div>
              <div className={css.statement}>
                <div
                  className={css.btn}
                  onClick={() => statementForUpdate(index)}
                >
                  <i className="ri-pencil-line"></i>
                </div>
                <div
                  className={css.btn}
                  onClick={() => deleteHandler(item._id)}
                >
                  <i className="ri-delete-bin-line"></i>
                </div>
              </div> */}
            </div>
          </li>
        );
      });
  }

  const deleteHandler = (i) => {
    dispatch(deleteStatement(i));
    toast.warning("One statement is deleted!!");
  };

  return (
    <div className={css.mainBox} id="ViewStatements">
      <h1 className={css.mainHeading}>
        View Your Statements <i className="ri-filter-2-line" title="filter"></i>
      </h1>
      <div className={css.listBox}>
        <div className={css.categoryBox}>
          <div className={css.statementsData}></div>
          <div className={css.statementsData}>Description</div>
          <div className={css.statementsData}>
            Amount {/*<i className="ri-arrow-up-down-fill"></i>*/}
          </div>
          <div className={css.statementsData}>
            Type {/*<i className="ri-arrow-up-down-fill"></i>*/}
          </div>
          <div className={css.statementsData}>
            Category {/*<i className="ri-arrow-up-down-fill"></i>*/}
          </div>
          <div className={css.statementsData}>
            Date {/*<i className="ri-arrow-up-down-fill"></i>*/}
          </div>
          <div className={css.statementsData}>Update & Delete</div>
        </div>
        <ul className={css.listOfStatements}>{listItems}</ul>
      </div>
      <div className={css.totatStatements}>
        {statements.length} Statements Found.
      </div>
    </div>
  );
};

export default ExpenseList;
