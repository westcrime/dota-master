import { render } from "@testing-library/react";
import { Welcome } from "..";
import store from "@src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("WelcomePage", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Welcome />
        </MemoryRouter>
      </Provider>
    );
  });
});
