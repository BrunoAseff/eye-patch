# Eye Patch

Eye Patch is a personal security and uptime watchdog for all my public-facing projects.

Every 15 minutes, a Lambda function runs to check if each service is responding as expected. If something is down, the system sends an email alert.

---

| Name                                   | Type        | Status                                                                                                                                        | Endpoint                        |
| :------------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| [Flaira API](https://api.flaira.net)   | API Service | ![status](https://img.shields.io/endpoint?url=https://infrastack-eyepatchstatus71821403-lxzepwy2kjx2.s3.amazonaws.com/badges/flaira-api.json) | `https://api.flaira.net/status` |
| [Flaira](https://flaira.net)           | Web Service | ![status](https://img.shields.io/endpoint?url=https://infrastack-eyepatchstatus71821403-lxzepwy2kjx2.s3.amazonaws.com/badges/flaira-web.json) | `https://flaira.net`            |
| [Portfólio](https://brunoaseff.com.br) | Web Service | ![status](https://img.shields.io/endpoint?url=https://infrastack-eyepatchstatus71821403-lxzepwy2kjx2.s3.amazonaws.com/badges/portfolio.json)  | `https://brunoaseff.com.br`     |
| [Nova](https://novaspaces.io)          | Web Service | ![status](https://img.shields.io/endpoint?url=https://infrastack-eyepatchstatus71821403-lxzepwy2kjx2.s3.amazonaws.com/badges/nova.json)       | `https://novaspaces.io`         |

---

## Architecture

The entire infrastructure is managed using **AWS CDK**.

### Services used

- **Lambda**: runs the monitoring logic and updates the status JSON files in S3 used by the shields.io badges
- **SNS (Simple Notification Service)**: sends email alerts
- **EventBridge**: triggers the Lambda on a fixed schedule (every 15 minutes)
- **S3 (Simple Storage Service)**: stores the JSON files consumed by the status badges
- **CDK (Cloud Development Kit)**: provisions everything as code

<img width="652" height="672" alt="eyepatch" src="https://github.com/user-attachments/assets/61139bf3-1771-45b5-946b-6aaac219ceea" />
