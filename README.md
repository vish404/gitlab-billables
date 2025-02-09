
# Gitlab billing assist

A nextjs app to list issues closed last month with specific specific billing labels.


## Setup gitlab

Create application with `<yoururl>/api/auth/callback/gitlab`

## Deployment using .env file


 Create .env file with below env values
```bash
docker run -d --name gitbiller -p 3000:3000 --env-file ./envfile vish404/gitlab-billables:latest
```
    
## Environment variables


| variable |     Description                |
| :-------- | :------------------------- |
| `AUTH_SECRET` | **Required**. may be with `openssl rand -base64 32` |
| `AUTH_URL` | **Required**. Full address of your app |
| `GITLAB_URL` | **Required**. Full address of your gitlab |
| `GITLAB_CLIENT_ID` | **Required**. From your gitlab |
| `GITLAB_CLIENT_SECRET` | **Required**.  From your gitlab|
| `GITLAB_PROJECTS` | **Required**. Project ids. CSV |
| `GITLAB_LABELS` | **Required**.  Project labels. CSV  |
| `PORT` | **Optional**.  Default to  3000 |
| `NEXT_TELEMETRY_DISABLED` | **Optional**.  Set 1 to disable |
