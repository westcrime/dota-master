import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@src/store";
import { MatchView } from "./match-view";
import { fetchMatchRequest } from "../store/fetch-match";
import { fetchHeroesRequest } from "@src/shared/store/fetch-heroes";

interface MatchAnalysisProps {
  matchId: number;
}

export const MatchAnalysis = ({ matchId }: MatchAnalysisProps) => {
  const { loading, error, data } = useSelector(
    (state: RootState) => state.fetchMatch
  );
  const {
    loading: heroesLoading,
    error: heroesError,
    data: heroesData,
  } = useSelector((state: RootState) => state.fetchHeroes);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMatchRequest({ matchId }));
    dispatch(fetchHeroesRequest());
  }, [dispatch, matchId]);

  return (
    <MatchView
      data={data}
      loading={loading}
      error={error}
      heroesData={heroesData}
      heroesLoading={heroesLoading}
      heroesError={heroesError}
    />
  );
};
