# HelloWorldLambdaJava

Creates and deploys a "Hello World" AWS Lambda function, implemented in Java.

## Prerequisites

* Created: An AWS account, and an S3 bucket for storing temporary deployment artifacts (referred to as $CF_BUCKET below)
* Installed: AWS CLI, Maven, SAM CLI
* Configured: AWS credentials in your terminal

## Usage

To build:

```
$ mvn package
```

To deploy:

```
$ ./deploy.sh
```

To test:

```
$ ./invoke-cognito-sync-trigger.sh
```

## More Information

Please see https://github.com/symphoniacloud/sam-init-HelloWorldLambdaJava for more information.
