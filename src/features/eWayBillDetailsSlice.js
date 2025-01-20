import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createEwayBill = createAsyncThunk(
    "createEwayBill",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_API}/ewaybill/createEWayBill`,
                data,
                {
                    headers: {
                        "content-type": "application/json",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const EwayBill = createSlice({
    name: "EwayBill",
    initialState: {
        EwayBill: [],
        loading: false,
        error: null,
    },
    extraReducers: {

        [createEwayBill.pending]: (state) => {
            state.loading = true;
        },
        [createEwayBill.fulfilled]: (state, action) => {
            state.loading = false;
            state.EwayBill = action.payload
        },
        [createEwayBill.rejected]: (state, action) => {
            state.error = action.payload.message;
        },

    },
});
export default EwayBill.reducer

// {
//     "version": "1.0.0123",
//     "billLists": [{
//         "userGstin": "24AAAPI3182M002",
//         "supplyType": "O",
//         "subSupplyType": "8",
//         "subSupplyDesc": "test data",
//         "docType": "CHL",
//         "docNo": "MV-VSD-2123",
//         "docDate": "05-12-2023",
//         "fromGstin": "24AAAPI3182M002",
//         "fromTrdName": "e-Way Bill SandBox",
//         "fromAddr1": "CERAMICS ZONE, TAL:PRANTIJ,",
//         "fromAddr2": "DIST: SABARKANTHA",
//         "fromPlace": "Ahmedabad",
//         "fromPincode": "380007",
//         "fromStateCode": "24",
//         "despatchStateCode": "24",
//         "toGstin": "URP",
//         "toTrdName": "e-Way Bill SandBox",
//         "toAddr1": "NR.KHODIYAR TEMPLE,OPP.-LAA-JAWAAB MARBLE,",
//         "toAddr2": "GOTA CROSS ROAD,GOTA,",
//         "toPlace": "Ahmedabad",
//         "toPincode": "380007",
//         "toStateCode": "24",
//         "shiptoStateCode": "24",
//         "transactionType": "1",
//         "totalValue": "2,570.4",
//         "cgstValue": "",
//         "sgstValue": "",
//         "igstValue": "",
//         "cessValue": "",
//         "cessNonAdvolValue": "",
//         "otherValue": "0",
//         "totInvValue": "3,036",
//         "transMode": "1",
//         "transDistance": "100",
//         "transporterName": "test",
//         "transporterId": "",
//         "transDocNo": "WWER",
//         "transDocDate": "05-12-2023",
//         "vehicleNo": "GJ01AA1234",
//         "vehicleType": "R",
//         "itemList": [{
//             "invoiceNo": "1110/2223/G01438",
//             "itemNo": "FGVT00003",
//             "productName": "AGATHA BEIGE MIRROR - A",
//             "productDesc": "AGATHA BEIGE MIRROR - A",
//             "hsnCode": "69072100",
//             "quantity": "1",
//             "qtyUnit": "BOX",
//             "taxableAmount": "1,239.84",
//             "sgstRate": "9",
//             "cgstRate": "9",
//             "igstRate": "",
//             "cessRate": "",
//             "cessAdvol": ""
//         },
//         {
//             "invoiceNo": "1110/2223/G01438",
//             "itemNo": "FGVT00004",
//             "productName": "AGATHA BEIGE MIRROR - B",
//             "productDesc": "AGATHA BEIGE MIRROR - B",
//             "hsnCode": "69072100",
//             "quantity": "1",
//             "qtyUnit": "BOX",
//             "taxableAmount": "1,330.56",
//             "sgstRate": "9",
//             "cgstRate": "9",
//             "igstRate": "",
//             "cessRate": "",
//             "cessAdvol": ""
//         }]
//     }]
// }