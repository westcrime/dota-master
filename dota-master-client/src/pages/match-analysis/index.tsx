import { MatchAnalysis } from "@src/features/match-analysis/ui";
import { useParams } from "react-router-dom";

const MatchAnalysisPage = () => {
  const { id } = useParams<{ id: string }>();
  return <MatchAnalysis matchId={Number(id)} />;
};

export { MatchAnalysisPage };
