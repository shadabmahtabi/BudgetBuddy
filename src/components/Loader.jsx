import css from "./Loader.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = ({login}) => {
  return (
    <div className={css.main}>
      <DotLottieReact
        src="
https://lottie.host/5a62f233-60c3-41ff-bd22-9299f0e1b898/x0RHMJbOlb.json
"
        loop
        autoplay
        className={css.loaderImg}
      />
      <h3>
        {login === "" ? "Connecting to server" : login}<span className={css.dot}>.</span>
        <span className={css.dot}>.</span>
        <span className={css.dot}>.</span>
      </h3>
    </div>
  );
};

export default Loader;
