import SearchIcon from "@mui/icons-material/Search";
import { Autocomplete, Box, IconButton, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export const GoogleSearchBox = () => {
  const [suggests, setSuggests] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const input = form.querySelector("input");
    if (!input) return;
    input.focus();
  }, [formRef]);

  const onChangeSearchBox = (value: string) => {
    const resolver = async () => {
      const val = encodeURIComponent(value);
      // eslint-disable-next-line max-len
      const url = `https://www.google.com/complete/search?client=chrome&q=${val}`;
      const res = await fetch(url);
      const json = await res.json();
      const results = json[1];
      console.log(json);
      setSuggests([...new Set(results)] as string[]);
    };
    resolver();
  };

  const search = (value: string | null) => {
    if (!value) return;
    chrome.search.query({
      text: value,
      disposition: "CURRENT_TAB",
    });
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const value = formData.get("q") as string;
    search(value);
  };

  return (
    <form onSubmit={onSearch} ref={formRef}>
      <Box position="relative" height={56}>
        <Autocomplete
          disablePortal
          freeSolo
          options={suggests}
          sx={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
          filterOptions={(options, _state) => options}
          clearOnEscape
          clearIcon={null}
          onHighlightChange={(event, option) => {
            if (option === null || !event?.target) return;
            const input = event.target as HTMLInputElement;
            input.value = option;
          }}
          onChange={(event, value) => {
            search(value);
          }}
          onInputChange={(event, value) => {
            onChangeSearchBox(value);
          }}
          renderInput={(params) => (
            <TextField name="q" {...params} placeholder="Google" />
          )}
        />

        <IconButton
          sx={{
            position: "absolute",
            top: 3,
            right: 3,
            height: 50,
            aspectRatio: 1,
          }}
          type="submit"
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </form>
  );
};
