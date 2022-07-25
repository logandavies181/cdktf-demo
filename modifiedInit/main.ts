import { Construct } from "constructs"
import { App, TerraformStack } from "cdktf"

/*
 * Use prebuilt providers with `npm install @cdktf/provider-aws`
 */
import {
  AwsProvider,
  ssm
} from "./.gen/providers/aws"

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name)

    new AwsProvider(this, "aws", {
      region: "ap-southeast-2",
    })
    const awsSsmParameterHello1 =  new ssm.SsmParameter(this, "hello_1", {
      name: "hello_1",
      type: "String",
      value: "Hello, world!",
    })
    const dataAwsSsmParameterHello1 = new ssm.DataAwsSsmParameter(
      this,
      "hello_1",
      {
        name: "hello_1",
      }
    )
    dataAwsSsmParameterHello1.dependsOn = [
      awsSsmParameterHello1.fqn
    ]

    new ssm.SsmParameter(this, "hello_2", {
      name: "hello_2",
      type: "String",
      value: `${dataAwsSsmParameterHello1.value}.. Again!`,
      value: `${dataAwsSsmParameterHello1.value}.. Again!`,
    })
  }
}

const app = new App()
new MyStack(app, "modifiedInit")
app.synth()
