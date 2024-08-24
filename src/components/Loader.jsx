import css from "./Loader.module.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = () => {
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
        Connecting to server<span className={css.dot}>.</span>
        <span className={css.dot}>.</span>
        <span className={css.dot}>.</span>
      </h3>
    </div>
  );
};

export default Loader;
