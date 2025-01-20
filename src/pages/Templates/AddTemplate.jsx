import { useCallback, useEffect, useRef, useState } from "react";
import katex from "katex";
import "katex/dist/katex.min.css";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { createTemplateForHtml, getTemplateById, updateTemplate } from "../../features/TemplateDetailSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import AddTemplateIcon from "../../../public/Images/AddTemplate.png"


import JoditEditor from "jodit-react";

// old
import { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-better-table/dist/quill-better-table.css";
import QuillBetterTable from "quill-better-table";
import { LoadingButton } from "@mui/lab";
import SearchCompanyAutocomplete from "../../components/autocomplete/SearchCompanyAutocomplete";
import _ from "lodash";
import { Box, Typography } from "@mui/material";
Quill.register("modules/better-table", QuillBetterTable);

window.katex = katex;

const AddTemplate = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editor = useRef(null);
  const currentLocation = useLocation()
  const { id: templateId } = useParams()

  const { loading } = useSelector((state) => state.templateData)

  const [text, setText] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [company, setCompany] = useState(null)

  const handleChange = useCallback(
    _.debounce((newContent) => {
      setText(newContent);
    }, 2000), // Adjust the debounce time as needed
    []
  );

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

    let finalData = {
      templateName,
      htmlTemplate: text,
      fields: matches,
      company: company && company.value
    };

    const getData = await dispatch(currentLocation.pathname.includes("add") ? createTemplateForHtml(finalData) : updateTemplate({ ...finalData, id: templateId }));

    if (getData.type.includes("fulfilled")) {
      toast.success("Template Created Successfully");
      navigate("/templates");
    }
  };

  useEffect(() => {
    const callTemplate = async () => {
      let response = await dispatch(getTemplateById({ id: templateId }))

      if (response && response.type == "getTemplateById/fulfilled") {
        setCompany({ label: response.payload.data.company.name, value: response.payload.data.company._id })
        setTemplateName(response.payload.data.templateName)
        setText(response.payload.data.htmlTemplate)
      }
    }

    if (currentLocation.pathname.includes("edit")) {
      callTemplate()
    }
  }, [currentLocation, templateId])

  return (
    <div className="home-content">
      <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: { xs: "column", sm: "row", md: "row" }, gap: "1rem", marginLeft: "1rem" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{ borderRadius: "999px", background: "#c70d3e", width: "2.5rem", display: "flex", justifyContent: "center", alignContent: "center" }}
          >
            <img
              src={AddTemplateIcon}
              alt="User"
              style={{ width: "1rem", height: "1.2rem", marginTop: "0.4rem" }}
            />
          </div>

          <Typography variant="h5" sx={{ marginLeft: "1rem" }}>Add Templates</Typography>
        </div>
      </Box>

      <div className="m-3">
        <div className="mb-5 d-flex flex-column align-items-center justify-content-between">
          <SearchCompanyAutocomplete inputValue={inputValue} setInputValue={setInputValue} company={company} setCompany={setCompany} />

          <TextField
            label="Enter template name"
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
              onChange={(newContent) => handleChange(newContent)}
            />
          </div>
        </div>
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={handleSubmit}
          sx={{ background: "#0058aa" }}
          fullWidth
        >
          Submit
        </LoadingButton>
      </div>
    </div>
  );
};

export default AddTemplate;
