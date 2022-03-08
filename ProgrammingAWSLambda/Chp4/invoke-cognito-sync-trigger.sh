#!/bin/bash
PAYLOAD=$(cat <<EOF
{
  "version": 2,
  "eventType": "SyncTrigger",
  "region": "us-east-1",
  "identityPoolId": "identityPoolId",
  "identityId": "identityId",
  "datasetName": "datasetName",
  "datasetRecords": {
    "SampleKey1": {
      "oldValue": "oldValue1",
      "newValue": "newValue1",
      "op": "replace"
    },
    "SampleKey2": {
      "oldValue": "oldValue2",
      "newValue": "newValue2",
      "op": "replace"
    }
  }
}
EOF
)
aws lambda invoke --invocation-type RequestResponse --function-name HelloWorld --payload "$PAYLOAD" outputfile.txt --cli-binary-format raw-in-base64-out

