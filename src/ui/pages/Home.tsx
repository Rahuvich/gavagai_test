import * as React from "react";
import { Link } from "react-router-dom";
import { SemanticallySimilarWord } from "../../models";
import { LoadingComponent } from "../Loading";

interface Props {
  language?: string;
  semanticallySimilarWords?: SemanticallySimilarWord[];
  isLoading: boolean;
}

export const HomePage: React.FC<Props> = ({
  semanticallySimilarWords,
  language,
  isLoading,
}) => {
  return isLoading ? (
    <LoadingComponent />
  ) : (
    <div className="flex flex-col justify-start w-full max-w-screen-lg">
      {semanticallySimilarWords?.map((value, index) => (
        <div className="flex flex-row p-3" key={value.word}>
          <h2>
            {index + 1}.{" "}
            <Link to={`/${language}/${value.word}`}>
              <b className="text-primary capitalize">{value.word}</b>
            </Link>
            , <span className="text-base">{value.strength}</span>
          </h2>
        </div>
      ))}
    </div>
  );
};
