import { render } from "@testing-library/react";
import { MatchAnalysis } from "..";
import store from "@src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("MatchAnalysisPage", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MatchAnalysis matchId={12}/>
        </MemoryRouter>
      </Provider>
    );
  });
});
