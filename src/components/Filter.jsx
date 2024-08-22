import { useEffect } from "react";
import css from "./Filter.module.css";

const Filter = (props) => {
  const { isFilter, setIsFilter } = props;

  useEffect(() => {
    if (isFilter) {
      document.body.classList.add(css.noScroll);
    } else {
      document.body.classList.remove(css.noScroll);
    }

    return () => document.body.classList.remove(css.noScroll);
  }, [isFilter]);

  const FilterHandler = (e) => {
    e.preventDefault();
  };

  return (
    isFilter && (
      <div className={css.main}>
        <form onSubmit={FilterHandler} className={css.filterForm}>
          <h2 className={css.formHeading}>Sort And Filter</h2>
          <div className={css.crossBtn} onClick={() => setIsFilter(!isFilter)}>
            ❌
          </div>
          <div className={css.sortRow}>
            <div className={css.sortType}>Low to High</div>
            <div className={css.sortType}>High to Low</div>
          </div>
          <div className={css.rows}>
            <div className={css.rowLabel}>Transfer Type</div>
            <div className={css.subRows}>
              <select
                //   defaultValue={type}
                className={css.transferType}
                //   onChange={(e) => selectionHandler(e)}
              >
                <option value="Choose Type">Choose Type</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
              <select
                className={css.transferType}
                //   defaultValue={category}
                //   onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Choose Category">Choose Category</option>
                {/* {selectionOptions} */}
              </select>
            </div>
          </div>
          <div className={css.rows}>
            <div className={css.rowLabel}>Time Period</div>
            <div className={css.subRows}>
              <input
                type="date"
                className={css.timePeriod}
                //   value={date}
                //   onChange={(e) => setDate(e.target.value)}
              />
              <input
                type="date"
                className={css.timePeriod}
                //   value={date}
                //   onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
          <div className={css.rows}>
            <div className={css.rowLabel}>Amount</div>
            <div className={css.subRows}>
              <input
                type="number"
                placeholder="Start amount"
                className={css.amountInput}
                // onChange={(e) => setAmount(e.target.value)}
                // value={amount}
              />
              <input
                type="number"
                placeholder="End amount"
                className={css.amountInput}
                // onChange={(e) => setAmount(e.target.value)}
                // value={amount}
              />
            </div>
          </div>
          <input
            className={css.searchBar}
            placeholder="Find with description..."
            // value={description}
            // onChange={(e) => setDescription(e.target.value)}
          ></input>
          <div className={css.btnRow}>
            <button className={css.btns}>Apply Filter</button>
            <button className={css.btns}>Clear All</button>
          </div>
          {/* <button className={css.submitBtn}>Update</button> */}
        </form>
      </div>
    )
  );
};

export default Filter;
