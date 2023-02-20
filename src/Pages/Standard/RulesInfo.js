import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useSelector } from "react-redux";
import DocCard from '../../Components/Cards/DocCard';
import Accordion from '../../Components/Layout/Accordion';

const RulesInfo = (props) => {
    const docs = useSelector(state => state.documents.documents);
    const faqs = useSelector(state => state.faq.Faqs);
    return <Box sx={{ m: { xs: '2rem 1rem', md: '2rem 5rem' }, textAlign: 'left' }}>
        <Grid container spacing={2}>
            {docs.map((doc) => {
                  return <Grid item xs={12} md={2}>
                      <DocCard doc={doc} />
                   </Grid>
               })}
        </Grid>
        <hr />
        <h4>Frequently Asked Questions</h4>
        {faqs.map((faq) => {
            return <Accordion key={faq.question} title={faq.question}>
                <p>{faq.answer}</p>
            </Accordion>
        })}
    </Box>
}
export default RulesInfo;