import { render } from "@testing-library/react";
import { HeroesOpendotaSelect } from "..";
import store from "@src/store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

describe("HeroesOpendotaSelectPage", () => {
  it("renders without crashing", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <HeroesOpendotaSelect isLoadingRequired={true} label="" />
        </MemoryRouter>
      </Provider>
    );
  });
});
