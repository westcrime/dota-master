import { render } from "@testing-library/react";
import { MatchAnalysisPage } from "..";
import store from "@src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("MatchAnalysisPage", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MatchAnalysisPage />
        </MemoryRouter>
      </Provider>
    );
  });
});
