import { render } from "@testing-library/react";
import { Records } from "..";
import store from "@src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("RecordsPage", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Records />
        </MemoryRouter>
      </Provider>
    );
  });
});
