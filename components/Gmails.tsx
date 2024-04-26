import { Box, Typography } from "@mui/material";
import { useState } from "react";

type Account = {
  name: string;
  email?: string;
  url: string;
};

const MailButton = ({ account }: { account: Account }) => {
  return (
    <a
      href={account.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
    >
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        color="#000"
        p={0.5}
        sx={{ "&:hover": { textDecoration: "underline" } }}
      >
        <Typography color="inherit">{account.name}</Typography>
        {account.email && (
          <Typography variant="caption" color="#444">
            {`(${account.email})`}
          </Typography>
        )}
      </Box>
    </a>
  );
};

export const Gmails = () => {
  const defaultAccounts: Account[] = [
    {
      name: "Gmail (メイン)",
      url: "https://mail.google.com/mail/u/0/#inbox",
    },
    {
      name: "Gmail (サブ)",
      url: "https://mail.google.com/mail/u/1/#inbox",
    },
  ];
  const [accounts, setAccounts] = useState<Account[]>(defaultAccounts);

  chrome.storage.local.get("gmailAccounts", (result) => {
    const accounts: Account[] = result.gmailAccounts || defaultAccounts;
    setAccounts(accounts);
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 0,
        width: 220,
      }}
    >
      {accounts?.map((account) => (
        <MailButton key={account.email} account={account} />
      ))}
    </Box>
  );
};
