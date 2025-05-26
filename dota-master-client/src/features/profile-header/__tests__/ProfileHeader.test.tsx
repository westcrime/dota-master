import { render } from "@testing-library/react";
import { ProfileHeader } from "..";
import store from "@src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("ProfileHeaderPage", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProfileHeader />
        </MemoryRouter>
      </Provider>
    );
  });
});
