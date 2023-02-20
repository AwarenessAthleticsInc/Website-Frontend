import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
const SpotsLeft = (props) => {
    const [left, setLeft] = useState();
    var deadline = new Date(props.tournament.EntryDeadline);
    var today = new Date();
    useEffect(() => {
        if (props.tournament.tournamentType.trim().includes("NSA")) {
            setLeft("Please see NSA site");
            return;
        }

        if (today !== deadline && deadline < today) {
            setLeft("Deadline has Passed");
            return;
        }
        if (props.tournament.spots <= 0) {
            setLeft("0 (sold out)");
            return;
        }
        setLeft(String(props.tournament.spots));
    }, []);

    return <Typography variant="caption" gutterBottom>
        {`Spots Left: ${left}`}
    </Typography>
}
export default SpotsLeft;