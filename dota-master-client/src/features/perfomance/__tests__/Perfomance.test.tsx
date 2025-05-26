import { render } from "@testing-library/react";
import { Perfomance } from "..";
import store from "@src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("PerfomancePage", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Perfomance />
        </MemoryRouter>
      </Provider>
    );
  });
});
