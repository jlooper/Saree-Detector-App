## Saree-Detecting ML-Powered Web App

> This app was inspired by sample code and a course published by the Academic Advocacy Team at AWS, authored by Stephen Howell, in which you build an app called AcadeML, a sample app for a university. You can find that workshop at AWS Workshop Studio [Building a Machine Learning-Enabled Web App](https://studio.us-east-1.prod.workshops.aws/workshops/b0b09da3-8c15-4c6a-aaf1-c265fe6e595d). 

## History and Demo

This app was built as a demo to show how image recognition capabilities can be used for artisan textiles, to enhance connoisseurship. Watch a [TEDx talk on the topic](https://youtu.be/y6qopiBGK-E), featuring this app. Here is a demo:


<video width="630" height="300" src="https://github.com/user-attachments/assets/509be81c-f124-47d1-8bad-cc5ed7240f30"></video>


### Technology and Services

The app stack:
* Node.js, Javascript, AWS SDK V3 (JavaScript) using Rekognition for image identification
* Vue.js, Vuetify.js, and Vite

### Prerequisites
The following software is required:
1. [Node.js](https://nodejs.org/en/download)
1. The app requires an AWS account to run, so you will need to supply your own AWS account: [Create](https://aws.amazon.com/resources/create-account/) a new account or [sign in](https://aws.amazon.com/console/) to your existing account. Store your keys privately in an env.local file.

> Warning: The repo calls AWS services, which incur a cost. While briefly running the app as a learning exercise would only incur a relatively small cost, care should be taken to monitor spend and delete AWS resources and associated services when no longer needed to ensure future charges do not accrue.  

### Installation

Clone this repo, add your credentials to an env.local file, and in the repo root folder run: `npm install`    

### AWS Credentials

To supply credentials using your own AWS account, do the following:

In the AWS Console:
1. Create an IAM user with policies **AmazonRekognitionFullAccess** attached.
1. Create an access key and secret access key (copy these before navigating away from the page)
1. Create a file in the **root** folder of the app called `.env.local` (note the `.` before the word `env`).
1. Add the following lines to `.env.local`:
* VITE_AWS_ACCESS_KEY_ID=AccessKey
* VITE_AWS_SECRET_ACCESS_KEY=SecretAccessKey
* VITE_AWS_REGION=us-east-1

### Running
1. In the repo root folder run  **npm run dev**
1. Open the localhost website (http://localhost:3000 is the default)

### Clean-up 
To clean up the app assets if you don't want to reuse it, delete the AWS IAM user that was created by the installation steps above when you no longer need this app.

## Security
See [CONTRIBUTING](CONTRIBUTING.md#security-issue-notifications) for more information.

## License
This library is licensed under the MIT-0 License. See the LICENSE file.
