import { useEffect, useState } from "react";
import css from "./Filter.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterStatements } from "../store/reducers/statementSlice";
import { toast } from "react-toastify";

const Filter = (props) => {
  const {
    isFilter,
    setIsFilter,
    selectionOptions,
    selectionHandler,
    type,
    setType,
    category,
    setCategory,
  } = props;

  const dispatch = useDispatch();
  // const {error, statements, message} = useSelector(state => state.statements)

  const [sortOrder, setSortOrder] = useState(null);

  const [filterData, setFilterData] = useState({
    startDate: "",
    endDate: "",
    minAmount: "",
    maxAmount: "",
    desc: "",
    orderType: "",
    // transferType: "",
    // transferCategory: "",
  });

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

    if (parseFloat(filterData.minAmount) > parseFloat(filterData.maxAmount)) {
      return toast.warning(
        "Start amount must be less than or equal to end amount"
      );
    }
    if (filterData.startDate > filterData.endDate) {
      return toast.warning("Start date must be less than or equal to end date");
    }

    const filteredData = Object.fromEntries(
      Object.entries(filterData).filter(([key, value]) => value.trim() !== "")
    );

    if (type && type !== "Choose Type") {
      filteredData.type = type;
    }

    if (category && category !== "Choose Category") {
      filteredData.category = category;
    }

    console.log(filteredData);
    dispatch(filterStatements(filteredData));

    ClearFilterHandler(e);
    setIsFilter(false);
  };

  const ClearFilterHandler = (e) => {
    setFilterData({
      startDate: "",
      endDate: "",
      minAmount: "",
      maxAmount: "",
      desc: "",
      orderType: "",
      type: "",
      category: "",
    });
    setCategory("");
    setType("");
    if (e.target.id === "closeBtn") {
      setIsFilter(false);
    }
  };

  const sortOrderHandler = (e) => {
    if (e.target.id === "asc") {
      setFilterData({ ...filterData, orderType: e.target.id });
      setSortOrder(true);
    } else if (e.target.id === "dsc") {
      setFilterData({ ...filterData, orderType: e.target.id });
      setSortOrder(false);
    } else {
      setFilterData({ ...filterData, orderType: "" });
      setSortOrder(null);
    }
  };

  return (
    isFilter && (
      <div className={css.main}>
        <form onSubmit={FilterHandler} className={css.filterForm}>
          <h2 className={css.formHeading}>Sort And Filter</h2>
          <div
            className={css.crossBtn}
            id="closeBtn"
            onClick={ClearFilterHandler}
          >
            ❌
          </div>
          <div className={css.sortRow}>
            <div
              className={`${css.sortType} ${
                sortOrder === null
                  ? css.lightSortBtn
                  : sortOrder
                  ? css.darkSortBtn
                  : css.lightSortBtn
              }`}
              id="asc"
              onClick={sortOrderHandler}
            >
              Low to High
            </div>
            <div
              className={`${css.sortType} ${
                sortOrder === null
                  ? css.lightSortBtn
                  : sortOrder
                  ? css.lightSortBtn
                  : css.darkSortBtn
              }`}
              id="dsc"
              onClick={sortOrderHandler}
            >
              High to Low
            </div>
          </div>
          <div className={css.rows}>
            <div className={css.rowLabel}>Transfer Type</div>
            <div className={css.subRows}>
              <select
                value={type}
                className={`${css.transferType} ${
                  type === "Choose Type" ? css.defaultColor : css.changedColor
                }`}
                onChange={(e) => selectionHandler(e)}
              >
                <option value="Choose Type">Choose Type</option>
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
              <select
                className={`${css.transferType} ${
                  category === "Choose Category"
                    ? css.defaultColor
                    : css.changedColor
                }`}
                defaultValue={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Choose Category">Choose Category</option>
                {selectionOptions}
              </select>
            </div>
          </div>
          <div className={css.rows}>
            <div className={css.rowLabel}>Time Period</div>
            <div className={css.subRows}>
              <input
                type="date"
                className={`${css.timePeriod} ${
                  filterData.startDate ? css.changedColor : css.defaultColor
                }`}
                value={filterData.startDate}
                onChange={(e) =>
                  setFilterData({ ...filterData, startDate: e.target.value })
                }
                data-placeholder="Start date"
                onFocus={(e) => e.target.classList.add(css.hasValue)}
                onBlur={(e) => {
                  if (!e.target.value) e.target.classList.remove(css.hasValue);
                }}
              />
              <input
                type="date"
                className={`${css.timePeriod} ${
                  filterData.endDate ? css.changedColor : css.defaultColor
                }`}
                value={filterData.endDate}
                onChange={(e) =>
                  setFilterData({ ...filterData, endDate: e.target.value })
                }
                data-placeholder="End date"
                onFocus={(e) => e.target.classList.add(css.hasValue)}
                onBlur={(e) => {
                  if (!e.target.value) e.target.classList.remove(css.hasValue);
                }}
              />
            </div>
          </div>
          <div className={css.rows}>
            <div className={css.rowLabel}>Amount</div>
            <div className={css.subRows}>
              <input
                type="number"
                placeholder="Min Amount"
                className={`${css.amountInput} ${
                  filterData.minAmount ? css.changedColor : css.defaultColor
                }`}
                onChange={(e) => {
                  setFilterData({ ...filterData, minAmount: e.target.value });
                }}
                value={filterData.minAmount}
              />
              <input
                type="number"
                placeholder="Max Amount"
                className={`${css.amountInput} ${
                  filterData.maxAmount ? css.changedColor : css.defaultColor
                }`}
                onChange={(e) => {
                  setFilterData({ ...filterData, maxAmount: e.target.value });
                }}
                value={filterData.maxAmount}
              />
            </div>
          </div>
          <input
            className={`${css.searchBar} ${
              filterData.desc ? css.changedColor : css.defaultColor
            }`}
            placeholder="Find with description..."
            value={filterData.desc}
            onChange={(e) =>
              setFilterData({ ...filterData, desc: e.target.value.trim() })
            }
          ></input>
          <div className={css.btnRow}>
            <button className={css.btns} type="submit">
              Apply Filter
            </button>
            <button className={css.btns} onClick={ClearFilterHandler}>
              Clear All
            </button>
          </div>
        </form>
      </div>
    )
  );
};

export default Filter;
