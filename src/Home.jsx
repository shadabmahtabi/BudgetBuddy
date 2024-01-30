import css from "./Home.module.css";

const Home = (props) => {

    const { totalIncome, setTotalIncome, totalExpense, setTotalExpense } = props;

    return (
        <div className={css.main} id="home">
            <div className={css.mainParts}>
                <div className={css.bigCircle}>
                    <h1 className={css.mainHeading}>Keep Tracking Your <br /> <span className={css.headingSpan}>Incomes & Expenses</span> <br /> Save Money ⇀⇀⇀</h1>
                </div>
                <div className={css.smallCircles}></div>
                <div className={css.smallCircles}></div>
            </div>
            <div className={css.mainParts}>
                <div className={css.showBox}>
                    <h1>Total Incomes ↴ <br />{totalIncome.toLocaleString('en-IN')}</h1>
                </div>
                <div className={css.showBox}>
                    <h1>Total Expenses ↴ <br />{totalExpense.toLocaleString('en-IN')}</h1>
                </div>
                <div className={css.showBox}>
                    <h1>Total Remaining ↴ <br />{(totalIncome - totalExpense).toLocaleString('en-IN')}</h1>
                </div>
            </div>
        </div>
    )
}

export default Home