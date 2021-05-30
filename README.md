# AWS VPC + EFS for Lambda

This repository contains Cloudformation templates for a Public-Private VPC and Elastic Filesystem for use with AWS Lambda. Follow the steps below to implement. They _must_ but done in the order indicated since the file system is dependent on the VPC.

1. Using Cloudformation Console, create a new stack and upload the VCP template (cloudformation/vpc.yml)
2. Using Cloudformation Console, create a new stack and upload the EFS template (cloudformation/efs.yml)
3. Create a new lamba via the Lamdba Console, and copy/paste the code from ./lambda.js in the code tab.
4. From the Lambda's configuration tab, attach the newly created VPC, using the private subnet and default security group.
5. From the Lambda's configuration tab, attach the newly created file system and make note of the mount path you use.
6. Once you create the lambda, add a new test from the Test tab and add the following test data:
   ```
   {"mountPath" : "your mount path" } // Enter the mount path you specified for the file system
   ```
7. Click "Test"

You should see a message indicating that you have Internet access and a console message indicating the test was able to successfully write to and read from your file system.
