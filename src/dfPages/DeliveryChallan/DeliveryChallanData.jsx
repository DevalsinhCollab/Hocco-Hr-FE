import React, { useEffect, useState } from "react";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getChallanbyid } from "../../features/DelieverychallanSlice";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const DeliveryChallanData = (props) => {
  const { id } = useParams();
  const dipatch = useDispatch();
  const { DeliveryChallanInfo } = useSelector(
    (state) => state.DeliveryChallanData
  );
  
  useEffect(() => {
    dipatch(getChallanbyid(id));
  }, [id]);

  const viewPdf = () => {
    const documentDefinition = {
      info: {
        title: "Invoice",
      },
      content: [
        {
          text: `Delivery Challan`,
          style: "coloredText",
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        {
          text: `For transportation of goods on account of reasons other than supply`,
          fontSize: 12,
          bold: true,
          alignment: "center",
          margin: [0, 0, 0, 10],
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*", "*"],
            body: [
              [
                {
                  text: "Reg Office: 12,13 Floor, 1201-1204, 1301-1302, Elenza Vertex, Sindhu bhawan road, Bodakdev, Ahmedabad-380059",
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "HOCCO FOODS PRIVATE LIMITED (Consigner)",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
                {
                  text: "GSTIN: 24AAHCR3681C1ZJ",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
            ],
          },
        },
        {
          margin: [0, 20, 0, 0],
          table: {
            headerRows: 1,
            widths: ["*", "*"],
            body: [
              [
                {
                  text: "Issued under rule 55 of CGST rule, 2017",
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
                {
                  text: "Origin for Recipient",
                  border: [false, false, false, false],
                  fontSize: 12,
                  bold: true,
                },
              ],
            ],
          },
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*"],
            body: [
              [
                {
                  text: `Delivery Challan number: ${DeliveryChallanInfo.challannumber}`,
                  // text: "Delivery Challan number: Automatic Sequential (Series to be asked)",
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: `Transport Mode:`,
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
              [
                {
                  text: `Delivery Challan date: ${DeliveryChallanInfo.challandate}`,
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "Transport Name:",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
              [
                {
                  text: "",
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  // text: "Vehicle number: Free Text with 10 characters limit",
                  text: `Vehicle number: ${DeliveryChallanInfo.vehiclenumber}`,
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
              [
                {
                  text: "",
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  // text: "Place of supply: To be decided automatically on the basis of first 2 characters of GSTIN of Consignee",
                  text: `Place of supply: ${DeliveryChallanInfo.placeofsupply}`,
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
            ],
          },
        },
        {
          margin: [0, 20, 0, 0],
          table: {
            headerRows: 1,
            widths: ["*", "*"],
            body: [
              [
                {
                  text: "Details of Consignee",
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
                {
                  text: "Shipping From",
                  border: [false, false, false, false],
                  fontSize: 12,
                  bold: true,
                },
              ],
            ],
          },
        },
        {
          table: {
            headerRows: 1,
            widths: ["*", "*"],
            body: [
              [
                {
                  text: `Name: ${DeliveryChallanInfo.companyname}`,
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  // text: "Address: From Master (Warehouse or Customer)",
                  text: `Address: ${DeliveryChallanInfo.address}`,
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
              [
                {
                  text: "Address: From Master (Pin Code is Mandatory)",
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
              [
                {
                  text: `GSTIN: ${DeliveryChallanInfo.gstin}`,
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
              [
                {
                  text: `State: ${DeliveryChallanInfo.state}`,
                  fontSize: 10,
                  bold: false,
                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  fontSize: 10,
                  bold: false,
                },
              ],
            ],
          },
        },
        {
          margin: [-10, 20, 0, 0],
          widths: ["*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*", "*"],
          fontSize: 10,
          table: {
            body: [
              [
                "Sr. No.",
                "Description of Goods",
                "HSN code",
                "Quantity",
                "Rate per unit",
                "Taxable Amount",
                "Rate ( CGST )",
                "Amount ( CGST )",
                "Rate ( SGST )",
                "Amount ( SGST )",
                "Rate ( IGST )",
                "Amount ( IGST )",
              ],
              // ['1.', 'Description of Goods', 'HSN code', 'Quantity', 'Rate per unit', 'Taxable Amount', 'Rate ( CGST )', 'Amount ( CGST )',  'Rate ( SGST )', 'Amount ( SGST )',  'Rate ( IGST )', 'Amount ( IGST )'],
              ...goods?.map((x) => [
                `${x.id + 1}`,
                "Description of Goods",
                `${x.hsn}`,
                `${x.qty}`,
                `${x.unit}`,
                `${x.taxAmount}`,
                `${x.cgstRate}`,
                `${x.cgstAmount}`,
                `${x.sgstRate}`,
                `${x.sgstAmount}`,
                `${x.igstRate}`,
                `${x.igstAmount}`,
              ]),
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
            widths: ["*"],
            body: [
              [
                {
                  text: `Total : ${DeliveryChallanInfo.totalchallan}`,
                  fontSize: 15,
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
            widths: ["*", "*"],
            body: [
              [
                {
                  text: `Total challan amount in Rs.:${DeliveryChallanInfo.totalchallan}`,
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
                {
                  text: "Ceritified that the particulars given above are true and correct",
                  border: [false, false, false, false],
                  fontSize: 12,
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
            widths: ["*", "*"],
            body: [
              [
                {
                  text: `Total challan amount in words:${DeliveryChallanInfo.totalchallanwords}`,
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
                {
                  text: "For HOCCO FOODS PRIVATE LIMITED",
                  border: [false, false, false, false],
                  fontSize: 12,
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
            widths: ["*", "*"],
            body: [
              [
                {
                  text: `Terms & Conditions : ${DeliveryChallanInfo.termsandcondition}`,
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  fontSize: 12,
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
            widths: ["*", "*"],
            body: [
              [
                {
                  text: "Add terms & conditions if any",
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  fontSize: 12,
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
            widths: ["*", "*"],
            body: [
              [
                {
                  text: `Note:${DeliveryChallanInfo.note}`,
                  fontSize: 12,
                  bold: true,
                  border: [false, false, false, false],
                },
                {
                  text: "",
                  border: [false, false, false, false],
                  fontSize: 12,
                  bold: true,
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
      {/* <div className="home-content">
        <div className="d-flex gap-2">
          <button className="btn btn-primary" onClick={() => viewPdf()}>
            View Pdf
          </button>
          <button className="btn btn-primary">Download Pdf</button>
        </div>
      </div> */}
    </>
  );
};
export default DeliveryChallanData;
