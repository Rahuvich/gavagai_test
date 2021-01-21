import { useEffect, useState } from "react";

interface useFetchProps {
  url: string;
}

interface State {
  data: any;
  isLoading: boolean;
}

export const useFetch = ({ url }: useFetchProps) => {
  const [state, setState] = useState<State>({
    data: [],
    isLoading: true,
  });

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setState({ data, isLoading: false });
      });
  }, []);

  return state;
};
