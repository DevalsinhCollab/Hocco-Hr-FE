import pdfMake from "pdfmake/build/pdfmake";

export default function EwayBill() {

  const viewPdf = () => {
    const documentDefinition = {
      info: {
        title: "e-Way Bill",
      },
      content: [
        {
          text: `e-Way Bill`,
          style: 'coloredText',
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
          border: [false, false, false, false],
        },
        {
          margin: [0, 10, 0, 0],
          table: {
            headerRows: 1,
            widths: ["*", "*"],
            body: [
              [
                {
                  text: "Doc No. : Tax-Invoice - 22",
                  bold: true,
                  fontSize: 12,
                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  bold: true,
                },
              ],
              [
                {
                  text: "Date: 24-Apr-23",
                  bold: true,
                  fontSize: 12,

                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  bold: true,
                },
              ],
              [
                {
                  text: "IRN :",
                  bold: true,
                  fontSize: 12,

                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  bold: true,
                },
              ],
              [
                {
                  text: "Ack No. :",
                  bold: true,
                  fontSize: 12,

                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  bold: true,
                },
              ],
              [
                {
                  text: "Ack Date :",
                  bold: true,
                  fontSize: 12,
                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  bold: true,
                },
              ],
            ],
          },
        },
        {
          margin: [0, 10, 0, 0],
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              [

                {
                  text: "1. e-Way Bill Details",
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },
        },
        {
          margin: [0, 10, 0, 10],
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              [
                {
                  text: "e-Way Bill No. : 21231321",
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "Mode : 1-Road",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
                {
                  text: "Generated Date : 24-Apr-23 3:46 PM",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
              [

                {
                  text: "Generated By: 2412233123123",

                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "Approx Distance : 35.30KM",

                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
                {
                  text: "Valid Upto : 25-Apr-23 11:59 PM",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
              [

                {
                  text: "Supply Type: Outward-Supply",
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "Transction Type: Regular",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
                {
                  text: "Supply Type: Outward-Supply",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
            ],
          },
        },
        {
          margin: [0, 10, 0, 0],
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              [

                {
                  text: "2. Address Details",
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },
        },
        {
          margin: [0, 10, 0, 10],
          table: {
            headerRows: 1,
            widths: ["*", "*"],
            body: [
              [
                {
                  text: "From",
                  fontSize: 10,
                  bold: true,
                  border: [false, false, false, false],
                },
                {
                  text: "To",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: true,
                },
              ],
              [

                {
                  text: "Chandan Ent",
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "CollabSoftech",

                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
              [
                {
                  text: "GSTIN: 245435345",
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "GSTIN: 245435345",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
              [
                {
                  text: "Gujarat",
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "Gujarat",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
              [
                {
                  text: "Dispatch From",
                  fontSize: 10,
                  bold: true,
                  border: [false, false, false, false],
                },
                {
                  text: "Ship To",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: true,
                },
              ],
              [

                {
                  text: "Chandan Ent",
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "CollabSoftech",

                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
            ],
          },
        },
        {
          margin: [0, 10, 0, 0],
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              [

                {
                  text: "3. Goods Details",
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },
        },
        {
          margin: [0, 20, 0, 0],
          widths: ["*", "*", "*", "*", "*"],
          fontSize: 10,
          table: {
            body: [
              [
                "HSN code",
                "Product Name & Desc",
                "Quantity",
                "Taxable Amount",
                "Tax Rate (C+S)"
              ],
              // ['1.', 'Description of Goods', 'HSN code', 'Quantity', 'Rate per unit', 'Taxable Amount', 'Rate ( CGST )', 'Amount ( CGST )',  'Rate ( SGST )', 'Amount ( SGST )',  'Rate ( IGST )', 'Amount ( IGST )'],
              // ...goods?.map((x) => [
              //   `${x.id + 1}`,
              //   "Description of Goods",
              //   `${x.hsn}`,
              //   `${x.qty}`,
              //   `${x.unit}`,
              //   `${x.taxAmount}`,
              //   `${x.cgstRate}`,
              //   `${x.cgstAmount}`,
              //   `${x.sgstRate}`,
              //   `${x.sgstAmount}`,
              //   `${x.igstRate}`,
              //   `${x.igstAmount}`,
              // ]),
            ],
            // body: [
            //   [
            //     {
            //       text: "Sr.No",
            //       border: [false, true, false, true],
            //     },
            //     {
            //       text: "Item",
            //       border: [false, true, false, true],
            //     },
            //     {
            //       text: "Quantity",
            //       border: [false, true, false, true],
            //     },
            //     {
            //       text: "Unit",
            //       border: [false, true, false, true],
            //     },
            //     {
            //       text: `Total`,
            //       border: [false, true, false, true],
            //     },
            //   ],
            //   ...goods.map((item, index) => [
            //     {
            //       text: index + 1,
            //       border: [false, true, false, true],
            //     },
            //     {
            //       text: item.hsn,
            //       border: [false, true, false, true],
            //     },
            //     {
            //       text: item.qty,
            //       border: [false, true, false, true],
            //     },
            //     {
            //       text: item.unit,
            //       border: [false, true, false, true],
            //     },
            //     {
            //       text: item.rate,
            //       border: [false, true, false, true],
            //     },
            //   ]),
            // ],
          },
        },
        {
          margin: [0, 10, 0, 0],
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              [

                {
                  text: "4. Transportation Details",
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },
        },
        {
          margin: [0, 10, 0, 10],
          table: {
            headerRows: 1,
            widths: ["*"],
            body: [
              [
                {
                  text: "Transporter ID :",
                  fontSize: 10,
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
              [
                {
                  text: "Name : xyz",
                  fontSize: 10,
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },
        },
        {
          margin: [0, 10, 0, 0],
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              [

                {
                  text: "5. Vehicle Details",
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },
        },
        {
          margin: [0, 10, 0, 10],
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              [
                {
                  text: "Vehicle No : 32232",
                  fontSize: 10,
                  bold: true,
                  border: [false, false, false, false],
                },
                {
                  text: "From : Plot",
                  fontSize: 10,
                  bold: true,
                  border: [false, false, false, false],
                },
                {
                  text: "CEWB No : 2e3244",
                  fontSize: 10,
                  bold: true,
                  border: [false, false, false, false],
                },
              ],
            ],
          },
        },
      ],
      // footer: function (currentPage, pageCount) {
      //   return {
      //     columns: [
      //       {
      //         text: `Page ${currentPage} of ${pageCount}`,
      //         alignment: "right",
      //         margin: [0, 0, 20, 0],
      //       },
      //     ],
      //   };
      // },
    };

    pdfMake.createPdf(documentDefinition).open();
  };

  return (
    <>
      <div className="home-content">
        <div className="teamMainBox">
          <button onClick={viewPdf}>Click</button>
        </div>
      </div>
    </>
  );
}

