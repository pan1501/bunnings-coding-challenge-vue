import exportButton from "@/components/exportButton.vue";
import { mount } from "@vue/test-utils";
describe("exportButton tests", () => {
  it("button click with correct output", () => {
    const output = [
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
      {
        SKU: "280-oad-768",
        Description: "Bread - Raisin",
        Source: "A",
      },
      {
        SKU: "647-vyk-317",
        Description: "Walkers Special Old Whiskey",
        Source: "A",
      },
      {
        SKU: "650-epd-782",
        Description: "Carbonated Water - Lemon Lime",
        Source: "A",
      },
      {
        SKU: "999-eol-949",
        Description: "Cheese - Grana Padano",
        Source: "B",
      },
      {
        SKU: "999-epd-782",
        Description: "Carbonated Water - Lemon Lime",
        Source: "B",
      },
    ];
    const wrapper = mount(<exportButton output={output} />);
    expect(wrapper.html()).toContain("Export csv");
    const button = wrapper.find("button");
    console.log(button);
    button.trigger("click");
  });

  it("button click without empty output", () => {
    // expect(wrapper.vm.message).toBe("");
    // const button = wrapper.find("button");
    // button.trigger("click");
    // expect(wrapper.vm.message).toBe("TRY AGAIN");
  });
});
