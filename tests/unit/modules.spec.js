import { Model } from "@/store/model";

describe("modules tests", () => {
  describe("getExpectedData ", () => {
    it(" with array of obj with SKU", () => {
      Model.data.expected = [
        {
          SKU: "280-oad-768",
          Description: "Bread - Raisin",
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
          SKU: "647-vyk-317",
          Description: "Walkers Special Old Whiskey",
          Source: "A",
        },
      ];
      const expectedData = [
        {
          Description: "Bread - Raisin",
          SKU: "280-oad-768",
          Source: "A",
        },
        {
          Description: "Walkers Special Old Whiskey",
          SKU: "647-vyk-317",
          Source: "A",
        },
        {
          Description: "Carbonated Water - Lemon Lime",
          SKU: "650-epd-782",
          Source: "A",
        },
        {
          Description: "Cheese - Grana Padano",
          SKU: "999-eol-949",
          Source: "B",
        },
      ];
      expect(Model.getExpectedData()).toStrictEqual(expectedData);
    });

    it("test case null", () => {
      Model.data.expected = null;
      const expectedData = [];
      expect(Model.getExpectedData()).toStrictEqual(expectedData);
    });

    it("test case undefined", () => {
      Model.data.expected = undefined;
      const expectedData = [];
      expect(Model.getExpectedData()).toStrictEqual(expectedData);
    });
    it("test case empty array", () => {
      Model.data.expected = [];
      const expectedData = [];
      expect(Model.getExpectedData()).toStrictEqual(expectedData);
    });
    it("test case array of string", () => {
      Model.data.expected = ["C", "C", "A", "D"];
      const expectedData = ["A", "C", "C", "D"];
      expect(Model.getExpectedData()).toStrictEqual(expectedData);
    });

    it("test case array of object w/ SKU", () => {
      Model.data.expected = [{ id: 3 }, { id: 1 }, { id: 2 }];
      const expectedData = [{ id: 3 }, { id: 1 }, { id: 2 }];
      expect(Model.getExpectedData()).toStrictEqual(expectedData);
    });
  });
  describe("aggregateBarcodes ", () => {
    describe("test case with common barcodes ", () => {
      const barcodesA = [
        {
          SupplierID: 2,
          SKU: "999-oad-768",
          Barcode: "b43e1274928349",
          supplierName: "Divavu",
        },

        {
          SupplierID: 3,
          SKU: "165-rcy-650",
          Barcode: "m8967092785598",
          supplierName: "Flashdog",
        },
        {
          SupplierID: 4,
          SKU: "999-eol-949",
          Barcode: "x0864219864945",
          supplierName: "Bluejam",
        },
        {
          SupplierID: 5,
          SKU: "999-epd-782",
          Barcode: "b3343396882074",
          supplierName: "Twitterworks",
        },
      ];
      const barcodesB = [
        {
          SupplierID: 1,
          SKU: "999-oad-768",
          Barcode: "b4381274928349",
          supplierName: "Divavu",
        },

        {
          SupplierID: 3,
          SKU: "165-rcy-650",
          Barcode: "m8967092785598",
          supplierName: "Flashdog",
        },
        {
          SupplierID: 4,
          SKU: "999-eol-949",
          Barcode: "x0864219864945",
          supplierName: "Bluejam",
        },
        {
          SupplierID: 5,
          SKU: "999-epd-782",
          Barcode: "b3343396882074",
          supplierName: "Twitterworks",
        },
      ];
      const expectedData = {
        commonBarcodes: [
          {
            Barcode: "m8967092785598",
            SKU: "165-rcy-650",
            SupplierID: 3,
            supplierName: "Flashdog",
          },
          {
            Barcode: "x0864219864945",
            SKU: "999-eol-949",
            SupplierID: 4,
            supplierName: "Bluejam",
          },
          {
            Barcode: "b3343396882074",
            SKU: "999-epd-782",
            SupplierID: 5,
            supplierName: "Twitterworks",
          },
        ],
        fromA: [
          {
            Barcode: "b43e1274928349",
            SKU: "999-oad-768",
            SupplierID: 2,
            supplierName: "Divavu",
          },
        ],
        fromB: [
          {
            Barcode: "b4381274928349",
            SKU: "999-oad-768",
            SupplierID: 1,
            supplierName: "Divavu",
          },
        ],
      };
      expect(Model.aggregateBarcodes(barcodesA, barcodesB)).toStrictEqual(
        expectedData
      );
    });

    describe("test case without common barcodes ", () => {
      const barcodesA = [
        {
          SupplierID: 2,
          SKU: "999-oad-768",
          Barcode: "b43e1274928349",
          supplierName: "Divavu",
        },

        {
          SupplierID: 3,
          SKU: "165-rcy-650",
          Barcode: "m8967092785598",
          supplierName: "Flashdog",
        },
        {
          SupplierID: 5,
          SKU: "999-epd-782",
          Barcode: "b3343396882074",
          supplierName: "Twitterworks",
        },
      ];
      const barcodesB = [
        {
          SupplierID: 1,
          SKU: "999-oad-768",
          Barcode: "b4381274928349",
          supplierName: "Divavu",
        },
        {
          SupplierID: 4,
          SKU: "999-eol-949",
          Barcode: "x0864219864945",
          supplierName: "Bluejam",
        },
      ];
      const expectedData = {
        commonBarcodes: [],
        fromA: [
          {
            Barcode: "b43e1274928349",
            SKU: "999-oad-768",
            SupplierID: 2,
            supplierName: "Divavu",
          },
          {
            Barcode: "m8967092785598",
            SKU: "165-rcy-650",
            SupplierID: 3,
            supplierName: "Flashdog",
          },
          {
            Barcode: "b3343396882074",
            SKU: "999-epd-782",
            SupplierID: 5,
            supplierName: "Twitterworks",
          },
        ],
        fromB: [
          {
            Barcode: "b4381274928349",
            SKU: "999-oad-768",
            SupplierID: 1,
            supplierName: "Divavu",
          },
          {
            Barcode: "x0864219864945",
            SKU: "999-eol-949",
            SupplierID: 4,
            supplierName: "Bluejam",
          },
        ],
      };
      expect(Model.aggregateBarcodes(barcodesA, barcodesB)).toStrictEqual(
        expectedData
      );
    });

    describe("test case empty arrays ", () => {
      const barcodesA = [];
      const barcodesB = [];
      const expectedData = {
        commonBarcodes: [],
        fromA: [],
        fromB: [],
      };
      expect(Model.aggregateBarcodes(barcodesA, barcodesB)).toStrictEqual(
        expectedData
      );
    });

    describe("test case undefined arrays ", () => {
      const barcodesA = undefined;
      const barcodesB = undefined;
      const expectedData = {
        commonBarcodes: [],
        fromA: [],
        fromB: [],
      };
      expect(Model.aggregateBarcodes(barcodesA, barcodesB)).toStrictEqual(
        expectedData
      );
    });
  });
  describe("injectSupplierName ", () => {
    it("test case matched barcodes & suppliers", () => {
      const barcodes = [
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "z2783613083817",
        },
        {
          SupplierID: 2,
          SKU: "647-vyk-317",
          Barcode: "z2783613083817",
        },
        {
          SupplierID: 4,
          SKU: "647-vyk-317",
          Barcode: "z2783613083817",
        },
      ];
      const suppliers = [
        {
          ID: 1,
          Name: "Twitterbridge",
        },
        {
          ID: 2,
          Name: "Thoughtsphere",
        },
        {
          ID: 3,
          Name: "Photobug",
        },
        {
          ID: 4,
          Name: "Jatri",
        },
        {
          ID: 5,
          Name: "Trunyx",
        },
      ];
      const expectedData = [
        {
          Barcode: "z2783613083817",
          SKU: "647-vyk-317",
          SupplierID: 1,
          supplierName: "Twitterbridge",
        },
        {
          Barcode: "z2783613083817",
          SKU: "647-vyk-317",
          SupplierID: 2,
          supplierName: "Thoughtsphere",
        },
        {
          Barcode: "z2783613083817",
          SKU: "647-vyk-317",
          SupplierID: 4,
          supplierName: "Jatri",
        },
      ];
      expect(Model.injectSupplierName(barcodes, suppliers)).toStrictEqual(
        expectedData
      );
    });
    it("test case empty barcodes", () => {
      const barcodes = [];
      const suppliers = [];
      const expectedData = [];
      expect(Model.injectSupplierName(barcodes, suppliers)).toStrictEqual(
        expectedData
      );
    });
    it("test case empty suppliers", () => {
      const barcodes = [
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "z2783613083817",
        },
      ];
      const suppliers = [];
      const expectedData = [
        {
          Barcode: "z2783613083817",
          SKU: "647-vyk-317",
          SupplierID: 1,
          supplierName: "Not found",
        },
      ];
      expect(Model.injectSupplierName(barcodes, suppliers)).toStrictEqual(
        expectedData
      );
    });
  });

  describe("checkContain ", () => {
    it("test case with same SKU & supplier", () => {
      const array = [
        {
          SKU: "647-vyk-317",
          Description: "Walkers Special Old Whiskey",
          supplierName: "Twitterbridge",
          Source: "A",
        },
      ];
      const obj = {
        SupplierID: 1,
        SKU: "647-vyk-317",
        Barcode: "n7405223693844",
        supplierName: "Twitterbridge",
      };
      expect(Model.checkContain(array, obj)).toStrictEqual(true);
    });

    it("test case with same source company & same SKU & different supplier", () => {
      const array = [
        {
          SKU: "647-vyk-317",
          Description: "Walkers Special Old Whiskey",
          supplierName: "Twitterbridge",
          Source: "A",
        },
      ];
      const obj = {
        SupplierID: 1,
        SKU: "647-vyk-317",
        Barcode: "n7405223693844",
        supplierName: "Photobug",
      };
      expect(Model.checkContain(array, obj)).toStrictEqual(true);
    });

    it("test case with different SKU & same supplier", () => {
      const array = [
        {
          SKU: "647-vyk-317",
          Description: "Walkers Special Old Whiskey",
          supplierName: "Twitterbridge",
          Source: "A",
        },
      ];
      const obj = {
        SupplierID: 1,
        SKU: "647-vyk-338",
        Barcode: "n7405223693844",
        supplierName: "Twitterbridge",
      };
      expect(Model.checkContain(array, obj)).toStrictEqual(false);
    });

    it("test case with different SKU & different supplier", () => {
      const array = [
        {
          SKU: "647-vys-317",
          Description: "Walkers Special Old Whiskey",
          supplierName: "Photobug",
          Source: "A",
        },
      ];
      const obj = {
        SupplierID: 1,
        SKU: "647-vyk-338",
        Barcode: "n7405223693844",
        supplierName: "Twitterbridge",
      };
      expect(Model.checkContain(array, obj)).toStrictEqual(false);
    });
    it("test case empty arry", () => {
      const array = [];
      const obj = {
        SupplierID: 1,
        SKU: "647-vyk-317",
        Barcode: "n7405223693844",
        supplierName: "Twitterbridge",
      };
      expect(Model.checkContain(array, obj)).toStrictEqual(false);
    });
    it("test case empty obj", () => {
      const array = [
        {
          SKU: "647-vyk-317",
          Description: "Walkers Special Old Whiskey",
          supplierName: "Twitterbridge",
          Source: "A",
        },
      ];
      const obj = {};
      expect(Model.checkContain(array, obj)).toStrictEqual(false);
    });
    it("test case empty arry & obj", () => {
      const array = [];
      const obj = {};
      expect(Model.checkContain(array, obj)).toStrictEqual(false);
    });
  });
  describe("mergeCatalog ", () => {
    it("test case match barcodes & catalogs", () => {
      const barcodes = [
        {
          SupplierID: 4,
          SKU: "999-vyk-317",
          Barcode: "b3343396882074",
          supplierName: "Twitterworks",
        },
        {
          SupplierID: 5,
          SKU: "999-epd-782",
          Barcode: "b3343396882074",
          supplierName: "Twitterworks",
        },
      ];
      const catalogs = [
        {
          SKU: "999-vyk-317",
          Description: "Walkers Special Old Whiskey test",
        },
        {
          SKU: "999-eol-949",
          Description: "Cheese - Grana Padano",
        },
        {
          SKU: "999-epd-782",
          Description: "Carbonated Water - Lemon Lime",
        },
      ];
      const target = [];
      const Source = "A";
      const expectedData = [
        {
          Description: "Walkers Special Old Whiskey test",
          SKU: "999-vyk-317",
          Source: "A",
        },
        {
          Description: "Carbonated Water - Lemon Lime",
          SKU: "999-epd-782",
          Source: "A",
        },
      ];
      expect(
        Model.mergeCatalog(barcodes, catalogs, target, Source)
      ).toStrictEqual(expectedData);
    });

    it("test case empty catalogs", () => {
      const barcodes = [
        {
          SupplierID: 4,
          SKU: "999-vyk-317",
          Barcode: "b3343396882074",
          supplierName: "Twitterworks",
        },
        {
          SupplierID: 5,
          SKU: "999-epd-782",
          Barcode: "b3343396882074",
          supplierName: "Twitterworks",
        },
      ];
      const catalogs = [];
      const target = [];
      const Source = "A";
      const expectedData = [];
      expect(
        Model.mergeCatalog(barcodes, catalogs, target, Source)
      ).toStrictEqual(expectedData);
    });
    it("test case empty barcodes", () => {
      const barcodes = [];
      const catalogs = [
        {
          SKU: "999-vyk-317",
          Description: "Walkers Special Old Whiskey test",
        },
        {
          SKU: "999-eol-949",
          Description: "Cheese - Grana Padano",
        },
        {
          SKU: "999-epd-782",
          Description: "Carbonated Water - Lemon Lime",
        },
      ];
      const target = [];
      const Source = "A";
      const expectedData = [];
      expect(
        Model.mergeCatalog(barcodes, catalogs, target, Source)
      ).toStrictEqual(expectedData);
    });

    it("test case record already exsit in target", () => {
      const barcodes = [
        {
          SupplierID: 4,
          SKU: "999-vyk-317",
          Barcode: "b3343396882074",
        },
        {
          SupplierID: 5,
          SKU: "999-epd-782",
          Barcode: "b3343396882074",
        },
      ];
      const catalogs = [
        {
          SKU: "999-vyk-317",
          Description: "Walkers Special Old Whiskey test",
        },
        {
          SKU: "999-eol-949",
          Description: "Cheese - Grana Padano",
        },
        {
          SKU: "999-epd-782",
          Description: "Carbonated Water - Lemon Lime",
        },
      ];
      const target = [
        {
          Description: "Walkers Special Old Whiskey test",
          SKU: "999-vyk-317",
          Source: "A",
        },
      ];
      const Source = "A";
      const expectedData = [
        {
          Description: "Walkers Special Old Whiskey test",
          SKU: "999-vyk-317",
          Source: "A",
        },
        {
          Description: "Carbonated Water - Lemon Lime",
          SKU: "999-epd-782",
          Source: "A",
        },
      ];
      expect(
        Model.mergeCatalog(barcodes, catalogs, target, Source)
      ).toStrictEqual(expectedData);
    });
  });

  describe("findUniqueRecord", () => {
    it("test case have common record", () => {
      const array1 = [
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "z2783613083817",
          supplierName: "Photodog",
        },
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "m1161615509466",
          supplierName: "Photodog",
        },
        {
          SupplierID: 2,
          SKU: "280-oad-768",
          Barcode: "p2359014924610",
          supplierName: "Thoughtsphere",
        },
      ];
      const array2 = [
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "z2783613083817",
          supplierName: "Twitterbridge",
        },
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "k1161625509466",
          supplierName: "Twitterbridge",
        },
        {
          SupplierID: 5,
          SKU: "647-vyk-317",
          Barcode: "z2783613033817",
          supplierName: "Twitterbridge",
        },
      ];
      const expectedResult = [
        {
          Barcode: "p2359014924610",
          SKU: "280-oad-768",
          SupplierID: 2,
          supplierName: "Thoughtsphere",
        },
      ];
      expect(Model.findUniqueRecord(array1, array2, "Barcode")).toStrictEqual(
        expectedResult
      );
    });

    it("test case don't have common record", () => {
      const array1 = [
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "z2783613083817",
          supplierName: "Twitterbridge",
        },
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "m1161615509466",
          supplierName: "Twitterbridge",
        },
        {
          SupplierID: 2,
          SKU: "280-oad-768",
          Barcode: "p2359014924610",
          supplierName: "Thoughtsphere",
        },
      ];
      const array2 = [
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "z2783613083837",
          supplierName: "Twitterbridge",
        },
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "k1161625509466",
          supplierName: "Twitterbridge",
        },
        {
          SupplierID: 5,
          SKU: "647-vyk-317",
          Barcode: "z2783613033817",
          supplierName: "Twitterbridge",
        },
      ];
      const expectedResult = [
        {
          Barcode: "z2783613083817",
          SKU: "647-vyk-317",
          SupplierID: 1,
          supplierName: "Twitterbridge",
        },
        {
          Barcode: "p2359014924610",
          SKU: "280-oad-768",
          SupplierID: 2,
          supplierName: "Thoughtsphere",
        },
      ];
      expect(Model.findUniqueRecord(array1, array2, "Barcode")).toStrictEqual(
        expectedResult
      );
    });

    it("test case array1 is empty", () => {
      const array1 = [];
      const array2 = [
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "z2783613083837",
          supplierName: "Twitterbridge",
        },
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "k1161625509466",
          supplierName: "Twitterbridge",
        },
        {
          SupplierID: 5,
          SKU: "647-vyk-317",
          Barcode: "z2783613033817",
          supplierName: "Twitterbridge",
        },
      ];
      const expectedResult = [];
      expect(Model.findUniqueRecord(array1, array2, "Barcode")).toStrictEqual(
        expectedResult
      );
    });

    it("test case array2 is empty", () => {
      const array1 = [
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "z2783613083837",
          supplierName: "Twitterbridge",
        },
        {
          SupplierID: 1,
          SKU: "647-vyk-317",
          Barcode: "k1161625509466",
          supplierName: "Twitterbridge",
        },
      ];
      const array2 = [];
      const expectedResult = [
        {
          Barcode: "z2783613083837",
          SKU: "647-vyk-317",
          SupplierID: 1,
          supplierName: "Twitterbridge",
        },
      ];
      expect(Model.findUniqueRecord(array1, array2, "Barcode")).toStrictEqual(
        expectedResult
      );
    });
  });
  describe("getOutputData ", () => {
    describe("test case original dataset", () => {
      Model.data = {
        input: {
          barcodesA: [
            {
              SupplierID: 1,
              SKU: "647-vyk-317",
              Barcode: "z2783613083817",
            },
            {
              SupplierID: 1,
              SKU: "647-vyk-317",
              Barcode: "z2783613083818",
            },
            {
              SupplierID: 1,
              SKU: "647-vyk-317",
              Barcode: "z2783613083819",
            },
            {
              SupplierID: 1,
              SKU: "647-vyk-317",
              Barcode: "n7405223693844",
            },
            {
              SupplierID: 1,
              SKU: "647-vyk-317",
              Barcode: "c7417468772846",
            },
            {
              SupplierID: 1,
              SKU: "647-vyk-317",
              Barcode: "w3744746803743",
            },
            {
              SupplierID: 1,
              SKU: "647-vyk-317",
              Barcode: "w2572813758673",
            },
            {
              SupplierID: 1,
              SKU: "647-vyk-317",
              Barcode: "s7013910076253",
            },
            {
              SupplierID: 1,
              SKU: "647-vyk-317",
              Barcode: "m1161615509466",
            },
            {
              SupplierID: 2,
              SKU: "280-oad-768",
              Barcode: "p2359014924610",
            },
            {
              SupplierID: 2,
              SKU: "280-oad-768",
              Barcode: "a7802303764525",
            },
            {
              SupplierID: 2,
              SKU: "280-oad-768",
              Barcode: "o5194275040472",
            },
            {
              SupplierID: 2,
              SKU: "280-oad-768",
              Barcode: "j9023946968130",
            },
            {
              SupplierID: 2,
              SKU: "280-oad-768",
              Barcode: "x5678105140949",
            },
            {
              SupplierID: 2,
              SKU: "280-oad-768",
              Barcode: "c9083052423045",
            },
            {
              SupplierID: 2,
              SKU: "280-oad-768",
              Barcode: "f4322915485228",
            },
            {
              SupplierID: 2,
              SKU: "280-oad-768",
              Barcode: "i0471865670980",
            },
            {
              SupplierID: 2,
              SKU: "280-oad-768",
              Barcode: "i0471865670981",
            },
            {
              SupplierID: 2,
              SKU: "280-oad-768",
              Barcode: "i0471865670982",
            },
            {
              SupplierID: 2,
              SKU: "280-oad-768",
              Barcode: "b4381274928349",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "u5160747892301",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "m8967092785598",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "l7342139757479",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "p1667270888414",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "v0874763455559",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "p9774916416859",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "c4858834209466",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "x7331732444187",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "u7720008047675",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "i2431892662423",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "o1336108796249",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "w7839803663600",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a6971219877032",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a7340270328026",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a0126648261918",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a9858014383660",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a2338856941909",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a5056026479965",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a7425424390056",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a0864219864945",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a1257743939800",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a0880467790155",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a4469253605532",
            },
            {
              SupplierID: 4,
              SKU: "167-eol-949",
              Barcode: "a0891358702681",
            },
            {
              SupplierID: 5,
              SKU: "650-epd-782",
              Barcode: "n8954999835177",
            },
            {
              SupplierID: 5,
              SKU: "650-epd-782",
              Barcode: "d2381485695273",
            },
            {
              SupplierID: 5,
              SKU: "650-epd-782",
              Barcode: "y0588794459804",
            },
            {
              SupplierID: 5,
              SKU: "650-epd-782",
              Barcode: "v8710606253394",
            },
            {
              SupplierID: 5,
              SKU: "650-epd-782",
              Barcode: "o5184937926186",
            },
            {
              SupplierID: 5,
              SKU: "650-epd-782",
              Barcode: "r4059282550570",
            },
            {
              SupplierID: 5,
              SKU: "650-epd-782",
              Barcode: "k3213966445562",
            },
            {
              SupplierID: 5,
              SKU: "650-epd-782",
              Barcode: "a3343396882074",
            },
          ],
          barcodesB: [
            {
              SupplierID: 1,
              SKU: "999-vyk-317",
              Barcode: "z2783613083817",
            },
            {
              SupplierID: 1,
              SKU: "999-vyk-317",
              Barcode: "n7405223693844",
            },
            {
              SupplierID: 1,
              SKU: "999-vyk-317",
              Barcode: "c7417468772846",
            },
            {
              SupplierID: 1,
              SKU: "999-vyk-317",
              Barcode: "w3744746803743",
            },
            {
              SupplierID: 1,
              SKU: "999-vyk-317",
              Barcode: "w2572813758673",
            },
            {
              SupplierID: 1,
              SKU: "999-vyk-317",
              Barcode: "s7013910076253",
            },
            {
              SupplierID: 1,
              SKU: "999-vyk-317",
              Barcode: "m1161615509466",
            },
            {
              SupplierID: 2,
              SKU: "999-oad-768",
              Barcode: "p2359014924610",
            },
            {
              SupplierID: 2,
              SKU: "999-oad-768",
              Barcode: "a7802303764525",
            },
            {
              SupplierID: 2,
              SKU: "999-oad-768",
              Barcode: "o5194275040472",
            },
            {
              SupplierID: 2,
              SKU: "999-oad-768",
              Barcode: "j9023946968130",
            },
            {
              SupplierID: 2,
              SKU: "999-oad-768",
              Barcode: "x5678105140949",
            },
            {
              SupplierID: 2,
              SKU: "999-oad-768",
              Barcode: "c9083052423045",
            },
            {
              SupplierID: 2,
              SKU: "999-oad-768",
              Barcode: "f4322915485228",
            },
            {
              SupplierID: 2,
              SKU: "999-oad-768",
              Barcode: "i0471865670980",
            },
            {
              SupplierID: 2,
              SKU: "999-oad-768",
              Barcode: "b4381274928349",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "u5160747892301",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "m8967092785598",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "l7342139757479",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "p1667270888414",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "v0874763455559",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "p9774916416859",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "c4858834209466",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "x7331732444187",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "u7720008047675",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "i2431892662423",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "o1336108796249",
            },
            {
              SupplierID: 3,
              SKU: "165-rcy-650",
              Barcode: "w7839803663600",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x6971219877032",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x7340270328026",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x0126648261918",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x9858014383660",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x2338856941909",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x5056026479965",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x7425424390056",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x0864219864945",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x1257743939800",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x0880467790155",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x4469253605532",
            },
            {
              SupplierID: 4,
              SKU: "999-eol-949",
              Barcode: "x0891358702681",
            },
            {
              SupplierID: 5,
              SKU: "999-epd-782",
              Barcode: "b8954999835177",
            },
            {
              SupplierID: 5,
              SKU: "999-epd-782",
              Barcode: "b2381485695273",
            },
            {
              SupplierID: 5,
              SKU: "999-epd-782",
              Barcode: "b0588794459804",
            },
            {
              SupplierID: 5,
              SKU: "999-epd-782",
              Barcode: "b8710606253394",
            },
            {
              SupplierID: 5,
              SKU: "999-epd-782",
              Barcode: "b5184937926186",
            },
            {
              SupplierID: 5,
              SKU: "999-epd-782",
              Barcode: "b4059282550570",
            },
            {
              SupplierID: 5,
              SKU: "999-epd-782",
              Barcode: "b3213966445562",
            },
            {
              SupplierID: 5,
              SKU: "999-epd-782",
              Barcode: "b3343396882074",
            },
          ],
          catalogA: [
            {
              SKU: "647-vyk-317",
              Description: "Walkers Special Old Whiskey",
            },
            {
              SKU: "280-oad-768",
              Description: "Bread - Raisin",
            },
            {
              SKU: "165-rcy-650",
              Description: "Tea - Decaf 1 Cup",
            },
            {
              SKU: "167-eol-949",
              Description: "Cheese - Grana Padano",
            },
            {
              SKU: "650-epd-782",
              Description: "Carbonated Water - Lemon Lime",
            },
          ],
          catalogB: [
            {
              SKU: "999-vyk-317",
              Description: "Walkers Special Old Whiskey test",
            },
            {
              SKU: "999-oad-768",
              Description: "Bread - Raisin",
            },
            {
              SKU: "165-rcy-650",
              Description: "Tea - Decaf 1 Cup",
            },
            {
              SKU: "999-eol-949",
              Description: "Cheese - Grana Padano",
            },
            {
              SKU: "999-epd-782",
              Description: "Carbonated Water - Lemon Lime",
            },
          ],
          suppliersA: [
            {
              ID: 1,
              Name: "Twitterbridge",
            },
            {
              ID: 2,
              Name: "Thoughtsphere",
            },
            {
              ID: 3,
              Name: "Photobug",
            },
            {
              ID: 4,
              Name: "Jatri",
            },
            {
              ID: 5,
              Name: "Trunyx",
            },
          ],
          suppliersB: [
            {
              ID: 1,
              Name: "Wikivu",
            },
            {
              ID: 2,
              Name: "Divavu",
            },
            {
              ID: 3,
              Name: "Flashdog",
            },
            {
              ID: 4,
              Name: "Bluejam",
            },
            {
              ID: 5,
              Name: "Twitterworks",
            },
          ],
        },
        expected: [
          {
            SKU: "647-vyk-317",
            Description: "Walkers Special Old Whiskey",
            Source: "A",
          },
          {
            SKU: "280-oad-768",
            Description: "Bread - Raisin",
            Source: "A",
          },
          {
            SKU: "165-rcy-650",
            Description: "Tea - Decaf 1 Cup",
            Source: "A",
          },
          {
            SKU: "999-eol-949",
            Description: "Cheese - Grana Padano",
            Source: "B",
          },
          {
            SKU: "167-eol-949",
            Description: "Cheese - Grana Padano",
            Source: "A",
          },
          {
            SKU: "999-epd-782",
            Description: "Carbonated Water - Lemon Lime",
            Source: "B",
          },
          {
            SKU: "650-epd-782",
            Description: "Carbonated Water - Lemon Lime",
            Source: "A",
          },
        ],
      };
      const expectedResult = [
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
      expect(Model.getOutputData()).toStrictEqual(expectedResult);
    });
  });
});
