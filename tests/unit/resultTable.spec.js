import resultTable from "@/components/resultTable.vue";
import { mount } from "@vue/test-utils";

describe("resultTable tests", () => {
  describe("with correct data", () => {
    it("renders the correct title", () => {
      const title = "Expected Output";
      const wrapper = mount(<resultTable title={title} />);

      expect(wrapper.html()).toContain("<h3>Expected Output</h3>");
    });

    it("renders the correct headers", () => {
      const headers = ["SKU", "Description", "Source"];
      const wrapper = mount(<resultTable headers={headers} />);

      expect(wrapper.html()).toMatchSnapshot();
    });
    it("renders the correct body", () => {
      const body = [
        {
          SKU: "165-rcy-650",
          Description: "Tea - Decaf 1 Cup",
          Source: "A",
        },
        {
          SKU: "167-eol-949",
          Description: "Cheese - Grana Padano",
          Source: "A",
        },
      ];
      const wrapper = mount(<resultTable body={body} />);

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
  describe("with empty data", () => {
    it("renders empty title", () => {
      const title = undefined;
      const wrapper = mount(<resultTable title={title} />);

      expect(wrapper.html()).toMatchSnapshot();
    });

    it("renders empty headers", () => {
      const headers = undefined;
      const wrapper = mount(<resultTable headers={headers} />);

      expect(wrapper.html()).toMatchSnapshot();
    });

    it("renders empty body", () => {
      const body = undefined;
      const wrapper = mount(<resultTable body={body} />);

      expect(wrapper.html()).toMatchSnapshot();
    });
  });
});
