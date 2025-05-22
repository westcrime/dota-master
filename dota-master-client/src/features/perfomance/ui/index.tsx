import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@src/store";
import { fetchHeroPerfomanceRequest } from "../store/fetch-perfomance";
import { PerformanceView } from "./perfomance-view";

export const Perfomance = () => {
  const { loading, error, data } = useSelector(
    (state: RootState) => state.fetchPerfomance
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHeroPerfomanceRequest());
  }, [dispatch]);

  return <PerformanceView data={data} loading={loading} error={error} />;
};