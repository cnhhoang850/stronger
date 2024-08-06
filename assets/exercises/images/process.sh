find "./" -name '*.png' -exec sh -c '
  for FILE; do
    BASENAME=$(basename "$FILE")
    DEST="../images2/$BASENAME"
    convert "$FILE" -fuzz 5% -fill magenta -draw "color 0,0 floodfill" "$DEST"
  done
' sh {} +

