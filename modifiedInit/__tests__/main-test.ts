import "cdktf/lib/testing/adapters/jest"; // Load types for expect matchers
import { Testing } from "cdktf";

import MyStack from "../main"
//import { ssm } from "@cdktf/provider-aws"

describe("My CDKTF Application", () => {
  // The tests below are example tests, you can find more information at
  // https://cdk.tf/testing
  // it.todo("should be tested");

  // // All Unit testst test the synthesised terraform code, it does not create real-world resources
  describe("Unit testing using assertions", () => {
    it("should plan successfully", () => {
      const app = Testing.app()
      const stack = new MyStack(app, "test")

      expect(
        Testing.fullSynth(stack)
      ).toPlanSuccessfully();
    });
  });
});
