import ImageKit from "@imagekit/nodejs";

const imagekit = new ImageKit({
  publicKey: process.env["IMAGEKIT_PUBLIC_KEY"],
  privateKey: process.env["IMAGEKIT_PRIVATE_KEY"], // This is the default and can be omitted
  uriendpoint: process.env["IMAGEKIT_URI_ENDPOINT"],
});

const response = await client.files.upload({
  file: fs.createReadStream("path/to/file"),
  fileName: "file-name.jpg",
});

console.log(response);
