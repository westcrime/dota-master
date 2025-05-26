import { render } from "@testing-library/react";
import { Profile } from "..";
import store from "@src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("ProfilePage", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Profile />
        </MemoryRouter>
      </Provider>
    );
  });
});
