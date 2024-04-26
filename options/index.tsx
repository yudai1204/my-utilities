import { Box, Button, Typography, TextField } from "@mui/material";
import { useState } from "react";

const OptionsIndex = () => {
  const [seimei, setSeimei] = useState("");
  const [timesID1, setTimesID1] = useState("");
  const [timesID2, setTimesID2] = useState("");
  const [gmailsJson, setGmailsJson] = useState("");

  const save = () => {
    chrome.storage.local.set(
      {
        data: {
          seimei,
          timesID1,
          timesID2,
        },
        gmailAccounts: JSON.parse(gmailsJson),
      },
      () => {
        alert("保存しました");
      },
    );
  };

  return (
    <Box p={2}>
      <Typography variant="h4">Option</Typography>
      <Box display="flex" flexDirection="column" gap={1} p={1}>
        <Box>
          <Typography variant="body2">姓名</Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="山田太郎"
            sx={{ width: 300 }}
            value={seimei}
            onChange={(e) => setSeimei(e.target.value)}
          />
        </Box>
        <Box>
          <Typography variant="body2">Times ID</Typography>
          <Box display="flex" gap={1}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="XXXX"
              sx={{ width: 100 }}
              value={timesID1}
              onChange={(e) => setTimesID1(e.target.value)}
            />
            <Typography fontSize={18} pt={0.5}>
              -
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              placeholder="XXXXXX"
              sx={{ width: 300 }}
              value={timesID2}
              onChange={(e) => setTimesID2(e.target.value)}
            />
          </Box>
        </Box>
        <Box>
          <Typography variant="body2">Gmails (JSON)</Typography>
          <TextField
            variant="outlined"
            multiline
            rows={5}
            size="small"
            placeholder='[{"name":"メイン","email":"sample@gmail.com"...'
            sx={{ width: 500 }}
            value={gmailsJson}
            onChange={(e) => setGmailsJson(e.target.value)}
          />
        </Box>
      </Box>

      <Box m={1}>
        <Button variant="contained" onClick={save} sx={{ width: 120 }}>
          保存
        </Button>
      </Box>
    </Box>
  );
};

export default OptionsIndex;
