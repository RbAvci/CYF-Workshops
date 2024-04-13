const express = require("express");
const albumsData = require("./albums.json");
const app = express();

app.use(express.json()); // before our routes definition

app.get("/albums", (req, res) => {
  res.send(albumsData);
});

app.get("/albums/:albumId", (req, res) => {
  const albumId = req.params.albumId;
  const album = albumsData.find((album) => album.albumId === albumId);

  if (!album) {
    return res.status(404).send("Album not found");
  }
  res.status(200).send(album);

  // now find the given album from the `albumsData` using the `albumId`
  // finally send the album you found back to the client
});

app.post("/albums", function (req, res) {
  const newAlbum = req.body;
  albumsData.push(newAlbum);
  res.send("Album added successfully!");
});

app.delete("/albums/:albumID", function (req, res) {
  const albumID = req.params.albumID;

  console.log(albumID);

  // Find the index of the album with the given ID
  const albumIndex = albumsData.findIndex((album) => album.albumId === albumID);
  console.log(albumsData);

  console.log(albumIndex);

  if (albumIndex !== -1) {
    // Album found, delete it
    albumsData.splice(albumIndex, 1);
    res.status(200).json({ success: true, message: `Album with ID ${albumID} deleted` });
  } else {
    // Album not found
    res.status(404).json({ success: false, message: `Album with ID ${albumID} not found` });
  }
  console.log("DELETE /albums route");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
