#!/bin/bash
sam deploy --s3-bucket $CF_BUCKET --stack-name chapter5-sam --capabilities CAPABILITY_IAM

