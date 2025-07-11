import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

  const alertTopic = new sns.Topic(this, 'EyePatchAlerts');
 
  const alertEmail = this.node.tryGetContext("alertEmail");

  alertTopic.addSubscription(
    new subs.EmailSubscription(alertEmail)
  );


   const lambdaFunction = new lambda.Function(this, 'EyePatchFunction', {
    runtime: lambda.Runtime.NODEJS_18_X,
    code: lambda.Code.fromAsset('../lambda'),
    handler: 'index.handler',
    environment: {
        TOPIC_ARN: alertTopic.topicArn, 
      },

    });

  alertTopic.grantPublish(lambdaFunction);

  }
}
