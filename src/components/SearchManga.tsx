import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";

export default function SearchManga() {
  const navigate = useNavigate();
  return (
    <div className="m-4 flex h-6 w-fit items-center justify-center overflow-hidden rounded-md bg-neutral-100">
      <Formik
        initialValues={{ search: "" }}
        onSubmit={(value, { resetForm }) => {
          navigate(`./search/${value.search}`);
          resetForm();
        }}
      >
        {({ values, handleSubmit, handleChange, handleBlur }) => (
          <form
            onSubmit={handleSubmit}
            className="mt-1 flex h-full justify-center p-0"
          >
            <input
              className="text-blac my-auto -mt-1 h-7 w-3/4 border-none bg-neutral-100 py-0 px-1 text-xs text-black"
              onChange={handleChange}
              onBlur={handleBlur}
              id="search"
              type="search"
              name="search"
              value={values.search}
            />
            <button
              className=" -mt-1 w-1/4 text-center text-2xl text-black"
              type="submit"
            >
              <IoMdSearch className="m-auto" />
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}
