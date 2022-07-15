#
# Client
#
build-client:
	cd client && npm run build

watch-client:
	cd client && npm run watch

run-client:
	cd client && npm run start

#
# Server
#
build-server:
	cd server && npm run build

watch-server:
	cd server && npm run watch

run-server:
	cd server && npm run start

#
# Watcher
#
watch:
	nodemon dist/server/main.js
