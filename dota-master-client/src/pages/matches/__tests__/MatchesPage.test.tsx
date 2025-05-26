import { render } from "@testing-library/react";
import { Matches } from "..";
import store from "@src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("MatchesPage", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Matches />
        </MemoryRouter>
      </Provider>
    );
  });
});
