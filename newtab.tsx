import { Box } from "@mui/material";

import { Bookmarks } from "./components/Bookmarks";
import { Gmails } from "./components/Gmails";
import { GoogleMenu } from "./components/GoogleMenu";
import { GoogleSearchBox } from "./components/GoogleSearchBox";

export default function Home() {
  return (
    <Box position="relative">
      <head>
        <title>新しいタブ</title>
      </head>
      <Box p={1} zIndex={1}>
        <Box display="flex" justifyContent="flex-end">
          <Gmails />
          <GoogleMenu />
        </Box>
      </Box>
      <Box width="100%" textAlign="center" position="absolute" top={80}>
        <a href="https://www.google.com">
          <img
            src={chrome.runtime.getURL("assets/google.png")}
            alt="Google"
            style={{ width: 200 }}
          />
        </a>
        <Box width="85%" margin="0 auto" maxWidth="980px">
          <GoogleSearchBox />
        </Box>
        <Box maxWidth="980px" margin="0 auto">
          <Box mt={3}>
            <Bookmarks />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
