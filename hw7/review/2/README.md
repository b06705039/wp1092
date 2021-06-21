# Overview
## Basic
All basic features are implemented, except that you can't talk to yourself (makes no sense to me)
## Advanced
All advanced features are implemented
## Others
* Unread message is shown in the message box
* Add pop-up notification when receiving a new message

# Installation
## front end
```bash
cd frontend
yarn
```
## back end
```bash
cd backend
yarn
```

# Start
## Start front end server
```bash
yarn start
```
## Start back end server
change the `MONGO_URL` in `backend/.env` to a proper mongodb url. Then, type
```bash
yarn server
```
