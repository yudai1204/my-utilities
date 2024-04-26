import { Box, Button, Typography } from "@mui/material";

type Bookmark = {
  title: string;
  imageUrl: string;
  url: string;
};

export const Bookmarks = () => {
  const bookmarks: Bookmark[] = [
    {
      title: "Twitter",
      imageUrl: "twitter.png",
      url: "https://twitter.com",
    },
    {
      title: "Google",
      imageUrl: "google.png",
      url: "https://www.google.com",
    },
    {
      title: "GitHub",
      imageUrl: "github.png",
      url: "https://github.com/yudai1204?tab=repositories",
    },
    {
      title: "ChatGPT",
      imageUrl: "gpt.png",
      url: "https://chat.openai.com",
    },
    {
      title: "Claude",
      imageUrl: "claude.png",
      url: "https://claude.ai/chats",
    },
    {
      title: "Chatwork",
      imageUrl: "chatwork.png",
      url: "https://www.chatwork.com/",
    },
    {
      title: "ScombZ",
      imageUrl: "scombz.png",
      url: "https://scombz.shibaura-it.ac.jp",
    },
    {
      title: "YouTube",
      imageUrl: "youtube.png",
      url: "https://www.youtube.com",
    },
    {
      title: "Amazon",
      imageUrl: "amazon.png",
      url: "https://www.amazon.co.jp",
    },
    {
      title: "なろう",
      imageUrl: "narou.jpeg",
      url: "https://syosetu.com/favnovelmain/list/",
    },
  ];
  return (
    <Box
      display="grid"
      gap={3}
      width="100%"
      height="100%"
      borderRadius={4}
      padding={0}
      gridTemplateColumns="repeat(5, 1fr)"
    >
      {bookmarks.map((bookmark) => (
        <a
          key={bookmark.title}
          href={bookmark.url}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Button
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 1,
              paddingTop: 1,
              width: "100%",
              color: "text.secondary",
              boxShadow: 2,
            }}
          >
            <img
              src={chrome.runtime.getURL(`assets/${bookmark.imageUrl}`)}
              alt={bookmark.title}
              style={{
                width: 70,
                height: 70,
                aspectRatio: 1,
              }}
            />
            <Typography variant="caption" fontSize={12}>
              {bookmark.title}
            </Typography>
          </Button>
        </a>
      ))}
    </Box>
  );
};
