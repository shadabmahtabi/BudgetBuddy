import { useDispatch, useSelector } from "react-redux";
import css from "./Home.module.css";
import useAxiosWithInterceptors from "../utils/useAxiosWithInterceptors";
import { useState } from "react";
import { homepage } from "../store/reducers/userSlice";

const Home = (props) => {
  const { user } = useSelector(
    (state) => state.user
  );
  

  useAxiosWithInterceptors();

  return (
    <div className={css.main} id="home">
      <div className={css.mainParts}>
        <div className={css.bigCircle}>
          <h1 className={css.mainHeading}>
            Keep Tracking Your <br />{" "}
            <span className={css.headingSpan}>Incomes & Expenses</span> <br />{" "}
            Save Money ⇀⇀⇀
          </h1>
        </div>
        <div className={css.smallCircles}></div>
        <div className={css.smallCircles}></div>
      </div>
      <div className={css.mainParts}>
        <div className={css.showBox}>
          <h1>
            Total Incomes ↴ <br />
            {user ? user.totalIncome : 0 /*.toLocaleString("en-IN")*/}
          </h1>
        </div>
        <div className={css.showBox}>
          <h1>
            Total Expenses ↴ <br />
            {user ? user.totalExpense : 0 /*.toLocaleString("en-IN")*/}
          </h1>
        </div>
        <div className={css.showBox}>
          <h1>
            Total Remaining ↴ <br />
            {user ? user.remainingAmount : 0 /*.toLocaleString("en-IN")*/}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
