import css from './Nav.module.css'

const Nav = () => {
    return (
        <nav className={css.navBar}>
            <div className={css.logo}><img src="/public/logo.png" alt="" className={css.logoImg} /></div>
            <div className={css.links}>
                <a href='#home' className={css.link}><i className="ri-home-smile-fill"></i> Home</a>
                <a href='#form' className={css.link}><i className="ri-exchange-funds-fill"></i> Add Incomes & Expenses</a>
                <a href='#ViewStatements' className={css.link}><i className="ri-eye-2-fill"></i> View Statements</a>
                <a href='#' className={css.link}><i className="ri-user-fill"></i> Account</a>
                {/* <a href='#' className={css.link}>Contact Us</a> */}
            </div>
        </nav>
    )
}

export default Nav