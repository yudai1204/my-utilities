import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const openOptions = () => {
  chrome.runtime.openOptionsPage();
};

const includeCode = (bodies) => {
  for (const body of bodies) {
    if (body.body.includes("コード")) {
      return true;
    }
  }
  return false;
};

const getCode = (bodies) => {
  const body = bodies
    .map((body) => `<${body.mimeType}>\n${body.body}\n</${body.mimeType}>`)
    .join("\n\n");
  return body;
};

const IndexPopup = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    getGmails();
  }, []);

  const getGmails = () => {
    chrome.runtime.sendMessage({ message: "fetchLatestEmails" }, (response) => {
      console.log(response);
      setItems(response);
    });
  };

  const onClickItem = (item, items) => {
    if (item.code) {
      navigator.clipboard.writeText(item.code);
      return;
    }
    setItems(
      items.map((i) => {
        if (i === item) {
          i.code = "取得中...";
        }
        return i;
      }),
    );
    // バックグラウンドのGeminiにコードを渡す
    const query = getCode(item.bodies);
    chrome.runtime.sendMessage(
      { message: "fetchGemini", query },
      (response) => {
        console.log(response);
        if (response.error) {
          item.code = JSON.stringify(response.error);
          setItems([...items]);
          return;
        }
        const code = response?.candidates?.[0]?.content?.parts?.[0]?.text;
        console.log("code", code);
        item.code = code.trim();
        setItems([...items]);
        navigator.clipboard.writeText(code);
      },
    );
  };

  return (
    <Box width={300} textAlign="center" m={2}>
      <Typography variant="h5">My Utilities</Typography>
      <Box my={1}>
        <Button variant="contained" onClick={openOptions}>
          {" "}
          Options
        </Button>
        <Button variant="contained" onClick={getGmails}>
          gmails
        </Button>
        <Box
          mt={2}
          sx={{
            boxShadow: "0 0 4px 2px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            display: "flex",
            overflowX: "hidden",
            flexDirection: "column",
          }}
        >
          {items.map((item, index) => {
            const from = item.headers.find(
              (header) => header.name === "From",
            ).value;
            const subject = item.headers.find(
              (header) => header.name === "Subject",
            ).value;
            const isLikeCode = includeCode(item.bodies);
            return (
              <Box
                key={index}
                sx={{
                  borderBottom: "1px solid #aaa",
                  userSelect: "none",
                  py: "4px",
                  px: "4px",
                  cursor: "pointer",
                  position: "relative",
                  "&:hover": {
                    backgroundColor: "#eee",
                  },
                  "&:active": {
                    backgroundColor: "#ddd",
                  },
                  "&:last-child": {
                    borderBottom: "none",
                  },
                }}
                onClick={() => onClickItem(item, items)}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    backgroundColor: isLikeCode ? "green" : "gray",
                    opacity: "0.8",
                    color: "white",
                    padding: "2px",
                    borderRadius: "4px",
                    fontSize: ".6rem",
                  }}
                >
                  {isLikeCode ? "Code" : "No Code"}
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    fontSize: ".8rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {subject}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: ".6rem",
                    color: "gray",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {from}
                </Typography>
                {item.code && (
                  <>
                    <Typography
                      variant="body2"
                      sx={{
                        fontSize: ".8rem",
                        color: item.code === "該当なし" ? "red" : "green",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.code}
                    </Typography>
                  </>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default IndexPopup;
