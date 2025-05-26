import { render } from "@testing-library/react";
import { RankCard } from "..";
import store from "@src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("RankCardPage", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <RankCard />
        </MemoryRouter>
      </Provider>
    );
  });
});
