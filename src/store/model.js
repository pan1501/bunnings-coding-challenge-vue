export const Model = {
  data: {},
  getExpectedData() {
    return this.sortDataBySKU(this.data.expected);
  },
  sortDataBySKU(data) {
    // sort by SKU
    return data
      ? data?.sort((a, b) =>
          a.SKU
            ? a.SKU > b.SKU
              ? 1
              : b.SKU > a.SKU
              ? -1
              : 0
            : a > b
            ? 1
            : b > a
            ? -1
            : 0
        )
      : [];
  },
  getOutputData() {
    const formatedData = [];

    // inject Source company
    let barcodesFromA = this.injectSupplierName(
      this.data.input.barcodesA,
      this.data.input.suppliersA
    );
    let barcodesFromB = this.injectSupplierName(
      this.data.input.barcodesB,
      this.data.input.suppliersB
    );
    let catalogA = this.data.input.catalogA;
    let catalogB = this.data.input.catalogB;

    // find common product base on barcodes
    let aggregatedBarcodes = this.aggregateBarcodes(
      barcodesFromA,
      barcodesFromB
    );

    // Merge catalog
    // common
    this.mergeCatalog(
      aggregatedBarcodes.commonBarcodes,
      catalogA,
      formatedData,
      "A"
    );
    //unique A
    this.mergeCatalog(aggregatedBarcodes.fromA, catalogA, formatedData, "A");
    //unique B
    this.mergeCatalog(aggregatedBarcodes.fromB, catalogB, formatedData, "B");

    // sort by SKU
    return this.sortDataBySKU(formatedData);
  },
  injectSupplierName(barcodes, suppliers) {
    return barcodes?.map((record) => {
      let matchedRecord = suppliers?.find(
        (supplier) => supplier.ID === record.SupplierID
      );

      return {
        ...record,
        supplierName: matchedRecord?.Name ? matchedRecord?.Name : "Not found",
      };
    });
  },
  aggregateBarcodes(barcodesFromA, barcodesFromB) {
    const result = {
      commonBarcodes: [],
      fromA: [],
      fromB: [],
    };
    // If any supplier barcode matches for one product of company A with Company B then we can consider that those products as the same
    result.commonBarcodes =
      barcodesFromA?.filter((recordA, index, self) => {
        return (
          barcodesFromB
            .map((recordB) => recordB.Barcode)
            .includes(recordA.Barcode) &&
          // filter out same SKU from same supplier from the same source
          index ===
            self.findIndex(
              (t) =>
                t.SKU === recordA.SKU && t.supplierName === recordA.supplierName
            )
        );
      }) || [];

    result.fromA = this.findUniqueRecord(
      barcodesFromA,
      result.commonBarcodes,
      "Barcode"
    );

    result.fromB = this.findUniqueRecord(
      barcodesFromB,
      result.commonBarcodes,
      "Barcode"
    );

    return result;
  },

  findUniqueRecord(mainArray, barcodesB, key) {
    return (
      mainArray?.filter(
        (barcodeA, index, self) =>
          !barcodesB
            ?.map((barcodeB) => barcodeB[key])
            .includes(barcodeA[key]) &&
          // filter out same SKU from same supplier from the same source
          index ===
            self.findIndex(
              (t) =>
                t.SKU === barcodeA.SKU &&
                t.supplierName === barcodeA.supplierName
            )
      ) || []
    );
  },

  mergeCatalog(barcodes, catalogs, target, Source) {
    barcodes?.forEach((barcode) => {
      if (
        !catalogs.find((catalog) => catalog.SKU === barcode.SKU) ||
        this.checkContain(target, barcode)
      )
        return;
      target.push({
        ...catalogs.find((catalog) => catalog.SKU === barcode.SKU),
        Source: Source,
      });
    });
    return target;
  },

  checkContain(array, obj) {
    // check if array contains obj base on SKU && supplierName
    let contain = false;
    array.forEach((element) => {
      if (element?.SKU === obj?.SKU) {
        contain = true;
      }
    });
    return contain;
  },
};
