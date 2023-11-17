import { findInputError, isFormInvalid } from "../utils";
import { useFormContext } from "react-hook-form";
import { AnimatePresence, motion } from "framer-motion";
import { MdError } from "react-icons/md";

export const Input = ({ label, type, id, placeholder, validation, name }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const inputError = findInputError(errors, name);
  const isInvalid = isFormInvalid(inputError);

  return (
    <div className="form-group">
      <div className="d-flex justify-content-between">
        <label htmlFor={id} className="form-label">
          {label}
        </label>
        <AnimatePresence mode="wait" initial={false}>
          {isInvalid && (
            <InputError
              message={inputError.error.message}
              key={inputError.error.message}
            />
          )}
        </AnimatePresence>
      </div>

      <input
        id={id}
        type={type}
        className="form-control"
        placeholder={placeholder}
        {...register(name, validation)}
      />
    </div>
  );
};

const InputError = ({ message }) => {
  return (
    <motion.p
      className="d-flex align-items-center gap-1 px-2 text-red"
      {...framer_error}
    >
      <MdError />
      {message}
    </motion.p>
  );
};

const framer_error = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 10 },
  transition: { duration: 0.2 },
};
