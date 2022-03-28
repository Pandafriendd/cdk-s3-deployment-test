import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

import * as s3deploy from 'aws-cdk-lib/aws-s3-deployment'
import * as s3 from 'aws-cdk-lib/aws-s3'

export class CdkS3DeploymentStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const websiteBucket = new s3.Bucket(this, 'WebsiteBucket', {
        websiteIndexDocument: 'index.html',
        //publicReadAccess: true
    });

    new s3deploy.BucketDeployment(this, 'DeployWebsite', {
        sources: [s3deploy.Source.asset('./website-dist')],
        destinationBucket: websiteBucket,
        destinationKeyPrefix: 'web/static' // optional prefix in destination bucket
    })
    
  }
}
