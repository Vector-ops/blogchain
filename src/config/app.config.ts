import { registerAs } from '@nestjs/config';

export default registerAs('appConfig', () => ({
  environment: process.env.NODE_ENV || 'development',
  apiVersion: process.env.API_VERSION,
  awsBucketName: process.env.AWS_PUBLIC_BUCKET_NAME,
  awsRegion: process.env.AWS_PUBLIC_BUCKET_NAME,
  awsCloudfrontUrl: process.env.AWS_PUBLIC_BUCKET_NAME,
  awsAccessKey: process.env.AWS_PUBLIC_BUCKET_NAME,
  awsSecretAccessKey: process.env.AWS_PUBLIC_BUCKET_NAME,
  mailHost: process.env.MAIL_HOST,
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
}));
