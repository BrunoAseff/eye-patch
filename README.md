# Eye Patch

Eye Patch is a personal security and uptime watchdog for all my public-facing projects.

Every 15 minutes, a Lambda function runs to check if each service is responding as expected. If something is down, the system sends an email alert.

---

| Name                                   | Type        | Status                                                                                                                                        | Endpoint                        |
| :------------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------ |
| [Bolhas na Mão](https://bolhas.org)   | Web Service | ![status](https://img.shields.io/endpoint?url=https://infrastack-eyepatchstatus71821403-lxzepwy2kjx2.s3.amazonaws.com/badges/bolhas.json) | `https://bolhas.org` |
| [Simulador de Ecossistema](https://ecosystem.bolhas.org) | Web Service | ![status](https://img.shields.io/endpoint?url=https://infrastack-eyepatchstatus71821403-lxzepwy2kjx2.s3.amazonaws.com/badges/ecosystem.json) | `https://ecosystem.bolhas.org` |
| [Jogo da Vida](https://gameoflife.bolhas.org) | Web Service | ![status](https://img.shields.io/endpoint?url=https://infrastack-eyepatchstatus71821403-lxzepwy2kjx2.s3.amazonaws.com/badges/game-of-life.json) | `https://gameoflife.bolhas.org` |
| [Portfólio](https://brunoaseff.com.br) | Web Service | ![status](https://img.shields.io/endpoint?url=https://infrastack-eyepatchstatus71821403-lxzepwy2kjx2.s3.amazonaws.com/badges/portfolio.json)  | `https://brunoaseff.com.br`     |
| [Nova](https://nova-pied-omega.vercel.app)          | Web Service | ![status](https://img.shields.io/endpoint?url=https://infrastack-eyepatchstatus71821403-lxzepwy2kjx2.s3.amazonaws.com/badges/nova.json)       | `https://nova-pied-omega.vercel.app`         |

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
