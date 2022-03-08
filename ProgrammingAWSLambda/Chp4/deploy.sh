#!/bin/bash
sam deploy --s3-bucket $CF_BUCKET --stack-name chapter4-sam --capabilities CAPABILITY_IAM

