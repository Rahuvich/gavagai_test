import { useEffect, useState } from "react";

interface useFetchProps {
  url: string;
}

interface State {
  data: any;
  isDataLoading: boolean;
}

export const useFetch = ({ url }: useFetchProps) => {
  const [state, setState] = useState<State>({
    data: [],
    isDataLoading: true,
  });

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setState({ data, isDataLoading: false });
      });
  }, []);

  return state;
};
