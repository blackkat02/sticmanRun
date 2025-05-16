import { PacmanLoader } from "react-spinners";

const override = {
  display: "block",
  margin: "0 auto",
};

function Loader(loading) {
  return (
    <div className="sweet-loading">
      <PacmanLoader
        color="green"
        loading={loading}
        cssOverride={override}
        size={70}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}

export default Loader;