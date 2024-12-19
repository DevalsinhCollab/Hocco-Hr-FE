import { useRef, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { createTemplateForHtml } from "../../features/TemplateDetailSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import JoditEditor from "jodit-react";

// old
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";
import QuillBetterTable from "quill-better-table";
import { LoadingButton } from "@mui/lab";
import SearchCompanyAutocomplete from "../../components/autocomplete/SearchCompanyAutocomplete";
Quill.register("modules/better-table", QuillBetterTable);

window.katex = katex;

const AddTemplate = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);

  const { loading } = useSelector((state) => state.templateData)

  const [text, setText] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [company, setCompany] = useState(null)

  const handleChange = (html) => {
    setText(html);
  };

  const handleSubmit = async () => {
    if (!company) {
      return toast("Please select a company")
    }

    if (!templateName) {
      return toast("Please enter template name")
    }

    if (!text) {
      return toast("Please enter the template")
    }

    const regex = /{([^{}]+)}/g;

    let matches = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
      matches.push(match.input.substring(match.index, regex.lastIndex));
    }

    const replacementMap = {
      "{Dealer_Name}": "{custName}",
      "{Address}": "{custAddress}",
      "{GSTN}": "{gst}",
      "{Adhar_Number}": "{adhar}",
      "{Model}": "{materialDescriptionVendor}",
      "{Barcode_No}": "{barCode}",
      "{Deposit_Rs}": "{depositAmount}",
      "{Machine_Deployment}": "{installationDate}",
      "{Payment_Ref_Number}": "{paymentRefNoInCaseOfOnlinePay}",
      "{Cheque_No_}": "{chequeNumberInCaseOfChequePay}",
      "{Cheque_Date_}": "{chequeDateInCaseOfChequePay}",
      "{Bank_Name}": "{chequeBankInCaseOfChequePay}",
    };

    matches = matches.map((element) =>
      replacementMap[element] !== undefined ? replacementMap[element] : element
    );

    let finalData = {
      templateName,
      htmlTemplate: text,
      fields: matches,
      company: company && company.value
    };

    const getData = await dispatch(createTemplateForHtml(finalData));
    if (getData.type.includes("fulfilled")) {
      toast.success("Template Created Successfully");
      navigate("/templates");
    }
  };

  return (
    <div className="home-content">
      <div className="teamMainBox">
        <div className="card m-3 p-3">
          <div className="mb-5 d-flex flex-column align-items-center justify-content-between">
            <SearchCompanyAutocomplete inputValue={inputValue} setInputValue={setInputValue} setCompany={setCompany} />

            <TextField
              label="Enter Template Name"
              variant="outlined"
              sx={{ marginTop: "1rem" }}
              onChange={(e) => setTemplateName(e.target.value)}
              value={templateName}
              className="col-12"
            />
            <div className="col-12 mt-3">
              <JoditEditor
                ref={editor}
                value={text}
                tabIndex={1}
                onChange={handleChange}
              />
            </div>
          </div>
          <LoadingButton
            variant="contained"
            loading={loading}
            onClick={handleSubmit}
          >
            Submit
          </LoadingButton>
        </div>
      </div>
    </div>
  );
};

export default AddTemplate;
