import { Box, Button, IconButton, Typography } from "@mui/material"
import { useState } from "react"

type GoogleIconsProps = {
  iconUrl: string
  url: string
  title: string
}
const GoogleIcons = (props: GoogleIconsProps) => {
  const { iconUrl, url, title } = props
  return (
    <a href={url} style={{ color: "transparent", textDecoration: "none" }}>
      <Button
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: 80,
          height: 90,
          aspectRatio: 1,
          color: "text.primary",
          gap: 0.5
        }}>
        <img
          src={chrome.runtime.getURL(`assets/${iconUrl}`)}
          alt={title}
          style={{ width: "70%", display: "block" }}
        />
        <Typography sx={{ fontSize: 10, textWrap: "nowrap" }}>
          {title}
        </Typography>
      </Button>
    </a>
  )
}

export const GoogleMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        width: 50,
        position: "relative",
        zIndex: 1
      }}>
      <IconButton
        sx={{
          width: 45,
          height: 45,
          aspectRatio: 1
        }}
        onClick={toggle}>
        <img
          src={chrome.runtime.getURL("assets/apps.svg")}
          alt="apps"
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </IconButton>
      <Box
        sx={{
          position: "absolute",
          top: 45,
          right: 0,
          background: "#e9eef6",
          padding: 1.5,
          borderRadius: 6,
          boxShadow: "2px 4px 8px 0 #0004",
          display: isOpen ? "block" : "none"
        }}>
        <Box sx={{ background: "#f8fafd", padding: 2, borderRadius: 4 }}>
          <Box
            sx={{
              display: "grid",
              gap: 1,
              width: "100%",
              height: "100%",
              padding: 0,
              gridTemplateColumns: "repeat(3, 1fr)"
            }}>
            <GoogleIcons
              iconUrl="gmail.png"
              url="https://mail.google.com/"
              title="Gmail"
            />
            <GoogleIcons
              iconUrl="maps.png"
              url="https://maps.google.com/"
              title="マップ"
            />
            <GoogleIcons
              iconUrl="youtube.png"
              url="https://www.youtube.com/"
              title="YouTube"
            />
            <GoogleIcons
              iconUrl="translate.png"
              url="https://translate.google.com/"
              title="翻訳"
            />
            <GoogleIcons
              iconUrl="drive.png"
              url="https://drive.google.com/"
              title="ドライブ"
            />
            <GoogleIcons
              iconUrl="spreadsheet.png"
              url="https://docs.google.com/spreadsheets/"
              title="スプレッドシート"
            />
            <GoogleIcons
              iconUrl="slide.png"
              url="https://docs.google.com/presentation/"
              title="スライド"
            />
            <GoogleIcons
              iconUrl="document.png"
              url="https://docs.google.com/document/"
              title="ドキュメント"
            />
            <GoogleIcons
              iconUrl="analytics.png"
              url="https://analytics.google.com/"
              title="アナリティクス"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
