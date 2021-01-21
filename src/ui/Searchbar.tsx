import React, { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { RootObject } from "../models";
import { useHistory } from "react-router-dom";

export type CallbackObject = RootObject & {
  language?: string;
};

interface Props {
  languages: string[];
  disabled: boolean;
  onFetched: (data: CallbackObject) => void;
}

export const Searchbar: React.FC<Props> = ({
  languages,
  disabled,
  onFetched,
}) => {
  let history = useHistory();

  const schema = yup.object({
    word: yup.string().required(),
    language: yup.string().required(),
  });

  const [isLoading, setLoading] = useState(false);

  return (
    <Formik
      initialValues={{ word: "", language: "" }}
      validationSchema={schema}
      onSubmit={async (formValues, { resetForm }) => {
        setLoading(true);

        const resp = await fetch(
          `https://api.gavagai.se/v3/lexicon/${formValues.language}/${formValues.word}?additionalFields=SEMANTICALLY_SIMILAR_WORDS&apiKey=12c1199d4b43706e6a6e8394b518b7f8`
        );
        const data = await resp.json();
        onFetched({ ...data, language: formValues.language });
        setLoading(false);
        history.push("/");
      }}
    >
      {({ values, errors }) => (
        <Form className="flex flex-row space-x-1 sm:space-x-5 py-5">
          <Field name="language" as="select" disabled={disabled || isLoading}>
            {languages.map((language) => (
              <option key={language} value={language}>
                {language}
              </option>
            ))}
          </Field>
          <Field
            placeholder="Word"
            name="word"
            type="text"
            disabled={disabled || isLoading}
          />
          <button type="submit" disabled={disabled || isLoading}>
            Search
          </button>
        </Form>
      )}
    </Formik>
  );
};
