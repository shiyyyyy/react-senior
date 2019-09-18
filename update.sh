#!/bin/sh
npm run build
rm -f dist.zip
zip -r dist.zip dist
curl ticket.tlink.cc:8009/update_web_ticket -F "file=@dist.zip" -v