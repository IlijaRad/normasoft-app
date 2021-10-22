import { Container, TextField, Button, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

interface FormType {
  text: string;
  firstName: string;
  lastName: string;
  tags: string[];
}

interface Result {
  text: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
}

const initialValues = {
  text: "",
  firstName: "",
  lastName: "",
  tags: [""],
};

const STATUS = {
  IDLE: "IDLE",
  SUBMITTED: "SUBMITTED",
  SUBMITTING: "SUBMITTING",
  COMPLETED: "COMPLETED",
};

function CreatePost() {
  const history = useHistory();
  const [values, setValues] = useState<FormType>(initialValues);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [touched, setTouched] = useState({} as FormType);

  const errors: Result = getErrors(values);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (
      e.target.name === "text" ||
      e.target.name === "firstName" ||
      e.target.name === "lastName"
    ) {
      setValues({
        ...values,
        [e.target.name]: e.target.value,
      });
    } else if (e.target.name === "tags") {
      setValues({
        ...values,
        [e.target.name]: e.target.value.split(/[ ,]+/),
      });
    }
  }

  function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
    setTouched((curr) => ({ ...curr, [e.target.name]: true }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      //post se napravi
      setStatus(STATUS.COMPLETED);
      history.push("/");
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors(values: FormType) {
    const result = {} as Result;
    if (values.text === "") result.text = "Text is required";
    if (values.firstName === "") result.firstName = "First name is required";
    if (values.lastName === "") result.lastName = "Last name is required";
    return result;
  }

  return (
    <Container maxWidth="lg" className="flex column align-c">
      <Button
        onClick={() => history.push("/")}
        variant="contained"
        className="top-left"
      >
        Go Back
      </Button>
      <Snackbar
        open={status === STATUS.SUBMITTING}
        autoHideDuration={6000}
        onClose={() => {
          return;
        }}
      >
        <Alert
          onClose={() => {
            return;
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          New post created!
        </Alert>
      </Snackbar>
      <h1 className="mb50 post-heading">Create a New Post</h1>

      <form className="post-form" onSubmit={handleSubmit}>
        {!isValid && status === STATUS.SUBMITTED && (
          <Alert className="mb15" severity="error">
            <div>Please fix the following errors:</div>
            <ul className="mb0">
              {Object.keys(errors).map((key: string) => (
                <li key={key}>{errors[key as keyof typeof errors]}</li>
              ))}
            </ul>
          </Alert>
        )}
        <div className="alert">
          {(touched.firstName || status === STATUS.SUBMITTED) &&
            errors.firstName}
        </div>
        <TextField
          name="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.firstName}
          label="First Name"
        />
        <div className="alert">
          {(touched.lastName || status === STATUS.SUBMITTED) && errors.lastName}
        </div>
        <TextField
          name="lastName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.lastName}
          label="Last Name"
        />
        <div className="alert">
          {(touched.text || status === STATUS.SUBMITTED) && errors.text}
        </div>
        <TextField
          name="text"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.text}
          label="Text of the post"
        />
        <TextField
          name="tags"
          onChange={handleChange}
          label="Enter Tags separated by commas (,)"
        />
        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={status === STATUS.SUBMITTING}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
}

export default CreatePost;
