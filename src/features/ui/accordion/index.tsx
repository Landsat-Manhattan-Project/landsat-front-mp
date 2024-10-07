import styled from "@emotion/styled";
import { Divider } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

const AccordionUI = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    sx={{ ml: 1, mr: 1, p: 1, gap: 1.5 }}
    expandIcon={
      <ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem", color: "white" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: 20,
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface Props {
  expandedName: string;
  isExpanded: boolean;
  handleChange: (
    panel: string
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
  summary?: React.ReactNode;
  details?: React.ReactNode;
}

const Accordion = ({
  expandedName,
  isExpanded,
  handleChange,
  summary,
  details,
}: Props) => {
  return (
    <>
      <div>
        <AccordionUI
          expanded={isExpanded}
          sx={{ borderRadius: 2 }}
          onChange={handleChange(expandedName)}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            {summary}
            {/* <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              Collapsible Group Item #1
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{ fontStyle: "italic", fontWeight: "bold" }}
            >
              {Intl.DateTimeFormat("en").format(new Date())}
            </Typography> */}
          </AccordionSummary>
          <Divider
            sx={{
              color: "white",
              bgcolor: "white",
              width: "95%",
              margin: "auto",
            }}
          />
          <AccordionDetails>
            {details}
            {/* <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
              eget.
            </Typography> */}
          </AccordionDetails>
        </AccordionUI>
      </div>
    </>
  );
};

export { Accordion };
