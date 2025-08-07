import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subs from 'aws-cdk-lib/aws-sns-subscriptions';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as iam from 'aws-cdk-lib/aws-iam';

export class InfraStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const alertTopic = new sns.Topic(this, 'EyePatchAlerts');

    const alertEmail = this.node.tryGetContext('alertEmail');

    alertTopic.addSubscription(new subs.EmailSubscription(alertEmail));

    const lambdaFunction = new lambda.Function(this, 'EyePatchFunction', {
      runtime: lambda.Runtime.NODEJS_20_X,
      code: lambda.Code.fromAsset('../dist'),
      handler: 'index.handler',
      environment: {
        TOPIC_ARN: alertTopic.topicArn,
      },
      timeout: cdk.Duration.seconds(10),
    });

    alertTopic.grantPublish(lambdaFunction);

    const rule = new events.Rule(this, 'EyePatchSchedule', {
      schedule: events.Schedule.rate(cdk.Duration.minutes(15)),
    });

    rule.addTarget(new targets.LambdaFunction(lambdaFunction));

    const badgeBucket = new s3.Bucket(this, 'EyePatchStatus', {
      publicReadAccess: true,
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
      websiteIndexDocument: 'index.html',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    badgeBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        actions: ['s3:GetObject'],
        resources: [`${badgeBucket.bucketArn}/badges/*`],
        principals: [new iam.AnyPrincipal()],
        effect: iam.Effect.ALLOW,
      }),
    );

    badgeBucket.grantPut(lambdaFunction);
    badgeBucket.grantRead(lambdaFunction);

    lambdaFunction.addEnvironment('BADGE_BUCKET', badgeBucket.bucketName);
  }
}
