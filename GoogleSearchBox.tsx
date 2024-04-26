import SearchIcon from "@mui/icons-material/Search"
import { Autocomplete, Box, IconButton, TextField } from "@mui/material"
import { useEffect, useRef, useState } from "react"

export const GoogleSearchBox = () => {
  const [suggests, setSuggests] = useState<string[]>([])
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const form = formRef.current
    if (!form) return
    const input = form.querySelector("input")
    if (!input) return
    input.focus()
  }, [formRef])

  const onChangeSearchBox = (value: string) => {
    const resolver = async () => {
      const val = encodeURIComponent(value)
      const url = `https://corsproxy.io/?https%3A%2F%2Fwww.google.com%2Fcomplete%2Fsearch%3Fhl%3Dja%26q%3D${val}%26output%3Dtoolbar`
      const res = await fetch(url)
      // parse as xml
      const xml = await res.text()
      const parser = new DOMParser()
      const doc = parser.parseFromString(xml, "application/xml")
      const suggestions = doc.getElementsByTagName("suggestion")
      const results = Array.from(suggestions).map((suggestion) => {
        return suggestion.getAttribute("data")
      })
      setSuggests(results as string[])
    }
    resolver()
  }

  const search = (value: string | null) => {
    if (!value) return
    const url = `https://www.google.com/search?q=${encodeURIComponent(value)}`
    location.href = url
  }

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const formData = new FormData(form)
    const value = formData.get("q") as string
    search(value)
  }

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
            left: 0
          }}
          filterOptions={(options, state) => options}
          clearOnEscape
          clearIcon={null}
          onHighlightChange={(event, option) => {
            if (option === null || !event?.target) return
            const input = event.target as HTMLInputElement
            input.value = option
          }}
          onChange={(event, value) => {
            search(value)
          }}
          onInputChange={(event, value) => {
            onChangeSearchBox(value)
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
            aspectRatio: 1
          }}
          type="submit">
          <SearchIcon />
        </IconButton>
      </Box>
    </form>
  )
}
