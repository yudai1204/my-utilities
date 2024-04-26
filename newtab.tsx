import { Box } from "@mui/material"

import { Bookmarks } from "./Bookmarks"
import { Gmails } from "./Gmails"
import { GoogleMenu } from "./GoogleMenu"
import { GoogleSearchBox } from "./GoogleSearchBox"

export default function Home() {
  return (
    <>
      <head>
        <title>New Tab Page</title>
      </head>
      <Box p={1}>
        <Box display="flex" justifyContent="flex-end">
          <Gmails />
          <GoogleMenu />
        </Box>
        <Box maxWidth="980px" margin="0 auto">
          <Box width="100%" textAlign="center">
            <a href="https://www.google.com">
              <img
                src={chrome.runtime.getURL("assets/google.png")}
                alt="Google"
                style={{ width: 200 }}
              />
            </a>
            <GoogleSearchBox />
          </Box>
          <Box mt={3}>
            <Bookmarks />
          </Box>
        </Box>
      </Box>
    </>
  )
}
