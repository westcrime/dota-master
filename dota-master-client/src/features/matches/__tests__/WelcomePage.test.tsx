import { render } from "@testing-library/react";
import { MatchHistoryCard } from "..";
import store from "@src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("MatchHistoryCardPage", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <MatchHistoryCard />
        </MemoryRouter>
      </Provider>
    );
  });
});
