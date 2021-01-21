import * as React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { RootObject } from "../../models";
import { LoadingComponent } from "../Loading";

interface QueryParams {
  word: string;
  lang: string;
}

export const WordPage: React.FC<{}> = () => {
  let { word, lang } = useParams<QueryParams>();

  const { data, isLoading } = useFetch({
    url: `https://api.gavagai.se/v3/lexicon/${lang}/${word}?additionalFields=SEMANTICALLY_SIMILAR_WORDS&apiKey=${process.env.REACT_APP_API_KEY}`,
  });

  return (
    <div className="w-full h-full flex flex-row justify-center">
      {isLoading ? (
        <LoadingComponent />
      ) : (
        <div className="flex flex-col h-full w-full p-5 max-w-screen-lg">
          <h1>
            {word.toLowerCase()}, {lang}
          </h1>
          <p>
            Rank:{" "}
            <span className="text-primary-dark font-bold inline-block">
              {" "}
              {(data as RootObject).wordInformation?.absoluteRank}
            </span>
          </p>
          <p>
            Absolute rank:{" "}
            <span className="text-primary-dark font-bold inline-block">
              {" "}
              {(data as RootObject).wordInformation?.absoluteRank}
            </span>
          </p>

          <p>
            Relative Rank:{" "}
            <span className="text-primary-dark font-bold inline-block">
              {" "}
              {(data as RootObject).wordInformation?.relativeRank}
            </span>
          </p>

          <p>
            Frequency:{" "}
            <span className="text-primary-dark font-bold inline-block">
              {" "}
              {(data as RootObject).wordInformation?.frequency}
            </span>
          </p>

          <p>
            Document Frequency:{" "}
            <span className="text-primary-dark font-bold inline-block">
              {" "}
              {(data as RootObject).wordInformation?.documentFrequency}
            </span>
          </p>

          <p>
            Vocabulary Size:{" "}
            <span className="text-primary-dark font-bold inline-block">
              {" "}
              {(data as RootObject).wordInformation?.vocabularySize}
            </span>
          </p>
          {(data as RootObject).wordInformation?.additionalInformation
            ?.link && (
            <p>
              More information{" "}
              <a
                className="text-primary-dark font-bold"
                href={
                  (data as RootObject).wordInformation?.additionalInformation
                    ?.link
                }
              >
                here
              </a>
            </p>
          )}
        </div>
      )}
    </div>
  );
};
